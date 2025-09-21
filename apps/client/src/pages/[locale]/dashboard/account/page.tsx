import {
  addToast,
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@heroui/react";
import { useIntlayer } from "react-intlayer";

import useAuth from "~/hooks/use-auth";
import { api, resolveApiError } from "~/lib/api";

import UpdateAvatar from "./update-avatar";

export default function Account() {
  const content = useIntlayer("dashboard.account");
  const { user } = useAuth();

  if (!user) return null;

  const onUserUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.patch("/account", data);
      addToast({
        color: "success",
        description: content.toasts.success.value,
      });
    } catch (error) {
      const apiError = resolveApiError(error);
      addToast({
        color: "danger",
        description: content.toasts.error.value,
        title: apiError.message,
      });
    }
  };

  const onProfileUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.patch("/account/profile", data);
      addToast({
        color: "success",
        description: content.toasts.success.value,
      });
    } catch (error) {
      const apiError = resolveApiError(error);
      addToast({
        color: "danger",
        description: content.toasts.error.value,
        title: apiError.message,
      });
    }
  };

  return (
    <div>
      <Card>
        <CardHeader className="items-center gap-4">
          <Avatar
            {...(user.profile?.avatarUrl
              ? { src: user.profile.avatarUrl }
              : { name: user.profile?.displayName })}
          />
          <div>
            <h3 className="text-lg leading-6 font-medium">{content.title}</h3>
            <p className="text-muted mt-1 text-sm">{content.subtitle}</p>
          </div>
          <div className="ml-auto">
            <UpdateAvatar />
          </div>
        </CardHeader>
        <CardBody>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <form className="grid gap-4" onSubmit={onUserUpdate}>
              <Input
                defaultValue={user.username}
                label={content.userForm.username}
                name="username"
              />
              <Input
                defaultValue={user.email}
                label={content.userForm.email}
                name="email"
              />
              <Button type="submit">{content.userForm.submit}</Button>
            </form>
            <form className="grid gap-4" onSubmit={onProfileUpdate}>
              <Input
                defaultValue={user.profile?.displayName || ""}
                label={content.userForm.profileForm.displayName}
                name="displayName"
              />
              <Textarea
                defaultValue={user.profile?.bio || ""}
                label={content.userForm.profileForm.bio}
                name="bio"
              />
              <Button type="submit">
                {content.userForm.profileForm.submit}
              </Button>
            </form>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
