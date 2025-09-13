import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Chip,
  Pagination,
  Spacer,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getIntlayer } from "intlayer";
import { useIntlayer } from "react-intlayer";
import { useLoaderData } from "react-router";

import LocaleLink from "~/components/locale-link";
import { prisma } from "~/lib/db";
import generateSeoMeta from "~/utils/seo";

import type { Route } from "./+types/page";

export const loader = async ({ params }: Route.LoaderArgs) => {
  const posts = await prisma.postTranslation.findMany({
    include: {
      post: {
        include: {
          author: { select: { profile: true, username: true } },
        },
      },
    },
    orderBy: { createdAt: "desc" },
    where: { locale: params.locale },
  });

  return { posts };
};

export const meta: Route.MetaFunction = ({ params }) => {
  const { meta } = getIntlayer("landing.posts", params.locale);

  return generateSeoMeta({
    description: meta.description,
    keywords: meta.keywords.split(", "),
    title: meta.title,
  });
};

export default function Page({ params }: Route.ComponentProps) {
  const content = useIntlayer("landing.posts");
  const { posts } = useLoaderData<typeof loader>();

  return (
    <div className="container py-10">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        <div>
          <h1 className="text-2xl font-bold">{content.title}</h1>
          <p className="text-muted">{content.subtitle}</p>
        </div>
        <div className="flex items-end justify-end">
          <Button isIconOnly variant="bordered">
            <Icon icon="mdi:filter" />
          </Button>
        </div>
      </div>
      <Spacer y={10} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            as={LocaleLink}
            isHoverable
            isPressable
            key={post.id}
            to={`/posts/${post.postId}`}
          >
            <CardHeader className="h-40 justify-center bg-gradient-to-r from-gray-700 to-neutral-500">
              <Icon
                className="h-20 w-20 text-white"
                icon="mdi:file-document-outline"
              />
            </CardHeader>
            <CardBody>
              <h3 className="text-lg font-bold">{post.title}</h3>
              <h6 className="text-muted line-clamp-1 text-sm">
                {post.description}
              </h6>
              <Spacer y={5} />
              <div className="flex flex-nowrap gap-1 overflow-hidden">
                {post.keywords.map((keyword, i) => (
                  <Chip key={i}>{keyword}</Chip>
                ))}
              </div>
              <Spacer y={10} />
              <div className="flex items-center gap-2">
                <strong>Author:</strong>
                <span className="text-muted">
                  {post.post.author?.profile?.displayName}
                </span>
              </div>
            </CardBody>
            <CardFooter className="justify-end">
              <code className="text-muted text-sm">
                {new Date(post.createdAt).toLocaleDateString(params.locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </code>
            </CardFooter>
          </Card>
        ))}
      </div>
      <Spacer y={10} />
      <div className="flex justify-center">
        <Pagination total={10} />
      </div>
    </div>
  );
}
