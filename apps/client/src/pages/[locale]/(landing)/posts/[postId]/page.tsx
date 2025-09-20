import type { PaginatedResult, PostTranslation } from "types";

import { addToast, Button, Chip, Divider, Spacer, User } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useParams } from "react-router";

import { api } from "~/lib/api";
import { useBooksmarksStore } from "~/store/booksmarks-store";
import generateSeoMeta from "~/utils/seo";

import type { Route } from "./+types/page";

import PostContent from "./content";
import TableOfContents from "./toc";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const { locale, postId } = params;

  const { data: translations } = await api.get<
    PaginatedResult<PostTranslation>
  >("/translations", {
    params: {
      include: "post,post.author,post.author.profile",
      locale,
      postId,
    },
  });

  return {
    post: translations.items[0].post || null,
    translation: translations.items[0] || null,
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

export default function Page({ loaderData }: Route.ComponentProps) {
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
          <div className="prose dark:prose-invert max-w-none">
            <PostContent content={translation.content} />
          </div>
        </div>
        <div className="col-span-12 md:col-span-3">
          <TableOfContents />
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
