import type { Post } from "~/types";

import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Pagination,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useIntlayer } from "react-intlayer";
import { useLoaderData } from "react-router";

import Header from "~/components/header";
import LocaleLink from "~/components/locale-link";
import { api } from "~/lib/api";

export const clientLoader = async () => {
  const { data: posts } = await api.get<Post[]>("/posts");

  return {
    posts,
  };
};

export default function Posts() {
  const content = useIntlayer("dashboard.posts");
  const { posts } = useLoaderData<typeof clientLoader>();

  return (
    <div className="grid gap-6">
      <Header {...content} createUrl="/dashboard/posts/create" />
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
      {posts.length === 0 && (
        <p className="text-muted text-center">{content.noData}</p>
      )}
      <div className="flex justify-center">
        <Pagination total={10} />
      </div>
    </div>
  );
}

function PostCard(props: Post) {
  const content = useIntlayer("dashboard.posts");

  return (
    <Card>
      <CardHeader className="justify-center">
        <div className="bg-success/20 rounded-full p-3">
          <Icon className="h-20 w-20" icon="mdi:blog" />
        </div>
      </CardHeader>
      <CardBody>
        <div className="grid gap-2">
          <h2 className="text-lg font-bold">{props.title}</h2>
          <p className="text-muted line-clamp-3 text-sm">{props.description}</p>
        </div>
      </CardBody>
      <CardFooter className="justify-end gap-5">
        <LocaleLink to={`/posts/${props.id}`}>
          <Icon className="mr-1 h-5 w-5" icon="mdi:eye" />
          {content.actions.view}
        </LocaleLink>
        <LocaleLink to={`/dashboard/posts/${props.id}`}>
          <Icon className="mr-1 h-5 w-5" icon="mdi:pencil" />
          {content.actions.edit}
        </LocaleLink>
      </CardFooter>
    </Card>
  );
}
