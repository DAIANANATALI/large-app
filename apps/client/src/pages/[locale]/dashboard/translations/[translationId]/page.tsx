import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Select,
  SelectItem,
  Textarea,
} from "@heroui/react";
import { getLocaleName } from "intlayer";
import React from "react";
import { useIntlayer, useLocale } from "react-intlayer";
import { useLoaderData } from "react-router";
import useSWR from "swr";

import type { Post } from "~/types";

import useLocaleNavigate from "~/hooks/useLocaleNavigate";
import { api, resolveApiError } from "~/lib/api";
import { type PostTranslation } from "~/types";

import type { Route } from "./+types/page";

import TranslationModal from "./translate";

export const clientLoader = async ({ params }: Route.ClientLoaderArgs) => {
  const { translationId } = params;

  if (!translationId) {
    throw new Error("Translation ID is required");
  }

  if (translationId === "create") {
    return { translation: null };
  }

  const { data: translation } = await api.get<PostTranslation>(
    `/translations/${translationId}`
  );

  return { translation };
};

export default function Page() {
  const { data: posts } = useSWR<Post[]>("/posts");
  const { translation } = useLoaderData<typeof clientLoader>();
  const { availableLocales } = useLocale();

  const navigate = useLocaleNavigate();

  const content = useIntlayer("dashboard.translations.edit");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: Record<string, unknown> = Object.fromEntries(
      formData.entries()
    );

    data.keywords = data.keywords
      ? (data.keywords as string).split(",").map((kw) => kw.trim())
      : [];

    try {
      if (translation) {
        await api.patch(`/translations/${translation.id}`, data);
      } else {
        await api.post("/translations", data);
      }

      addToast({ color: "success", title: content.success });
      navigate("/dashboard/translations");
    } catch (error) {
      addToast({ color: "danger", title: resolveApiError(error).message });
    }
  };

  const onDelete = async () => {
    if (!translation) return;

    if (!confirm(content.onDelete.confirm.toString())) return;

    try {
      await api.delete(`/translations/${translation.id}`);
      addToast({ color: "success", title: content.onDelete.success });
      navigate("/dashboard/translations");
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
              {translation ? content.editTitle : content.createTitle}
            </h2>
            <p className="text-muted text-sm">
              {translation ? content.editSubtitle : content.createSubtitle}
            </p>
          </div>
          {translation && (
            <div className="flex gap-2">
              <Button color="danger" onPress={onDelete}>
                {content.onDelete.label}
              </Button>
              <TranslationModal translation={translation} />
            </div>
          )}
        </CardHeader>
        <CardBody>
          <form action="" className="grid gap-3" onSubmit={onSubmit}>
            <Input
              defaultValue={translation?.title ?? ""}
              isRequired
              label={content.inputs.title}
              name="title"
            />
            <Select
              defaultSelectedKeys={[translation?.locale ?? ""]}
              isRequired
              label={content.inputs.locale}
              name="locale"
            >
              {availableLocales.map((locale) => (
                <SelectItem key={locale}>{getLocaleName(locale)}</SelectItem>
              ))}
            </Select>
            <Select
              defaultSelectedKeys={[translation?.postId ?? ""]}
              isRequired
              items={posts ?? []}
              label={content.inputs.post}
              name="postId"
            >
              {(item) => <SelectItem key={item.id}>{item.title}</SelectItem>}
            </Select>
            <Textarea
              defaultValue={translation?.description ?? ""}
              isRequired
              label={content.inputs.description}
              name="description"
            />
            <Textarea
              defaultValue={translation?.content ?? ""}
              isRequired
              label={content.inputs.content}
              minRows={10}
              name="content"
            />
            <Textarea
              defaultValue={translation?.keywords.join(", ") ?? ""}
              label={content.inputs.keywords}
              name="keywords"
              placeholder="keyword1, keyword2, keyword3"
            />
            <Button type="submit">{content.inputs.submit}</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}
