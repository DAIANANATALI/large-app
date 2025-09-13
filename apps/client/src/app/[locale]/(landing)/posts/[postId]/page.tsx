import { addToast, Button, Chip, Divider, Spacer, User } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import Markdown from "react-markdown";
import { useParams } from "react-router";

import { prisma } from "~/lib/db";
import { useBooksmarksStore } from "~/store/booksmarks-store";
import generateSeoMeta from "~/utils/seo";

import type { Route } from "./+types/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { locale, postId } = params;

  const translation = await prisma.postTranslation.findFirst({
    include: { post: { include: { author: { include: { profile: true } } } } },
    where: { locale, postId },
  });

  return {
    post: translation?.post,
    translation: translation,
  };
};

export const meta: Route.MetaFunction = ({ loaderData }) => {
  if (!loaderData.translation) return [{ title: "Translation not found" }];
  return generateSeoMeta({
    description: loaderData.translation.description ?? "",
    keywords: loaderData.translation.keywords,
    title: loaderData.translation.title,
  });
};

export default function Page({ loaderData, params }: Route.ComponentProps) {
  const { post, translation } = loaderData;

  if (!translation) {
    return <div>Translation not found</div>;
  }

  const randomNumber = () => Math.floor(Math.random() * 1000);

  return (
    <div className="container my-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-3">
          <div>
            <h1 className="mb-3 text-xl font-bold">{translation.title}</h1>
            <p className="text-muted text-sm">{translation.description}</p>
          </div>
          <Spacer y={4} />
          <div className="flex flex-wrap gap-1">
            {translation.keywords.map((keyword, i) => (
              <Chip key={i} size="sm">
                {keyword}
              </Chip>
            ))}
          </div>
          <Divider className="my-4" />
          <div className="flex items-center gap-2">
            <User
              avatarProps={{
                src: "https://i.pravatar.cc/150?u=" + randomNumber(),
              }}
              description={post?.author?.username}
              name={post?.author?.profile?.displayName}
            />
          </div>
          <Spacer y={4} />
          <div className="flex justify-between gap-3">
            <div className="flex gap-1">
              <Button variant="bordered">
                <Icon className="h-5 w-5" icon="mdi:like" />
                <strong className="text-sm">100</strong>
              </Button>
              <Button variant="bordered">
                <Icon className="h-5 w-5" icon="mdi:dislike-outline" />
                <strong className="text-sm">200</strong>
              </Button>
            </div>
            <div className="flex gap-2">
              <BookmarkButton />
              <ShareButton />
            </div>
          </div>
        </div>
        <div className="col-span-12 md:col-span-6">
          <p className="prose dark:prose-invert max-w-none">
            <Markdown>{translation.content}</Markdown>
          </p>
        </div>
        <div className="col-span-12 md:col-span-3">
          <p className="text-muted text-end">
            {new Date(post?.createdAt ?? "").toLocaleDateString(params.locale, {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

function BookmarkButton() {
  const { postId } = useParams();

  const bookmarks = useBooksmarksStore((s) => s.bookmarks);
  const addBookmark = useBooksmarksStore((s) => s.addBookmark);
  const removeBookmark = useBooksmarksStore((s) => s.removeBookmark);

  if (!postId) return;

  const isBookmarked = bookmarks.includes(postId);
  const icon = isBookmarked ? "mdi:bookmark" : "mdi:bookmark-outline";

  const toggleBookmark = () => {
    if (isBookmarked) {
      removeBookmark(postId);
    } else {
      addBookmark(postId);
    }
  };

  return (
    <Button isIconOnly onPress={toggleBookmark} variant="light">
      <Icon height="20" icon={icon} width="20" />
    </Button>
  );
}

function ShareButton() {
  const handleCopy = async () => {
    await navigator.clipboard.writeText(window.location.href);
    addToast({ title: "Copied to clipboard!" });
  };

  return (
    <Button isIconOnly onPress={handleCopy} variant="light">
      <Icon height="20" icon="mdi:share-variant" width="20" />
    </Button>
  );
}
