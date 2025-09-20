import type { Post } from "~/types";

import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Textarea,
} from "@heroui/react";
import React from "react";
import { useIntlayer } from "react-intlayer";
import { useLoaderData } from "react-router";

import useLocaleNavigate from "~/hooks/useLocaleNavigate";
import { api, resolveApiError } from "~/lib/api";

import type { Route } from "./+types/page";

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const { postId } = params;

  if (!postId) {
    throw new Error("Post ID is required");
  }

  if (postId === "create") {
    return { post: null };
  }

  const { data: post } = await api.get<Post>(`/posts/${postId}`);

  return { post };
};

export default function Page() {
  const { post } = useLoaderData<typeof clientLoader>();
  const navigate = useLocaleNavigate();

  const content = useIntlayer("dashboard.posts.postId");
  const [isPublished, setIsPublished] = React.useState(post?.isPublished);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(
      formData.entries()
    );
    data.isPublished = isPublished;

    try {
      if (post) {
        await api.patch(`/posts/${post.id}`, data);
      } else {
        await api.post("/posts", data);
      }

      addToast({ color: "success", title: content.success });
      navigate("/dashboard/posts");
    } catch (error) {
      addToast({ color: "danger", title: resolveApiError(error).message });
    }
  };

  const onDelete = async () => {
    if (!post) return;

    if (!confirm(content.deleteButton.confirm.toString())) return;

    try {
      await api.delete(`/posts/${post.id}`);
      addToast({ color: "success", title: content.deleteButton.success });
      navigate("/dashboard/posts");
    } catch (error) {
      addToast({ color: "danger", title: resolveApiError(error).message });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="justify-between">
          <div>
            <h2 className="text-2xl font-bold">
              {post ? content.editTitle : content.createTitle}
            </h2>
            <p className="text-muted text-sm">
              {post ? content.editSubtitle : content.createSubtitle}
            </p>
          </div>
          {post && (
            <div>
              <Button color="danger" onPress={onDelete}>
                {content.deleteButton.label}
              </Button>
            </div>
          )}
        </CardHeader>
        <CardBody>
          <form action="" className="grid gap-3" onSubmit={onSubmit}>
            <Input
              defaultValue={post?.title ?? ""}
              isRequired
              label={content.inputs.title}
              name="title"
            />
            <Textarea
              defaultValue={post?.description ?? ""}
              isRequired
              label={content.inputs.description}
              name="description"
            />
            <Checkbox
              isSelected={isPublished}
              name="isPublished"
              onValueChange={setIsPublished}
            >
              {content.inputs.isPublished}
            </Checkbox>
            <Button color="secondary" type="submit">
              {content.inputs.submit}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
