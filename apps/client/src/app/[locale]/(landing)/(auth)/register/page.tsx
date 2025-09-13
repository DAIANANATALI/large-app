import {
  addToast,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Spacer,
} from "@heroui/react";
import { useIntlayer } from "react-intlayer";

import { GoogleButton } from "~/components/google-button";
import LocaleLink from "~/components/locale-link";
import PasswordInput from "~/components/password-input";
import useLocaleNavigate from "~/hooks/useLocaleNavigate";
import { api, resolveApiError } from "~/lib/api";

export default function Register() {
  const content = useIntlayer("register-page");
  const navigate = useLocaleNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (data.password !== data.confirmPassword) {
      addToast({
        color: "danger",
        description: content.passwordsDoNotMatch,
        title: content.error,
      });
      return;
    }

    try {
      await api.post("/auth/register", data);
      addToast({ color: "success", title: content.success });
      navigate("/login");
    } catch (error) {
      console.error(error);
      addToast({
        color: "danger",
        description: resolveApiError(error).message,
        title: content.error,
      });
    }
  };

  return (
    <div className="container grid min-h-screen place-items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-col items-start gap-1">
          <h2 className="text-2xl font-bold">{content.title}</h2>
          <p className="text-muted text-sm">{content.subtitle}</p>
        </CardHeader>
        <CardBody className="grid gap-5">
          <form className="grid gap-3" onSubmit={onSubmit}>
            <Input
              isRequired
              label={content.inputs.email}
              name="email"
              type="email"
            />
            <Input
              isRequired
              label={content.inputs.username}
              name="username"
              type="text"
            />
            <Input
              isRequired
              label={content.inputs.displayName}
              name="displayName"
              type="text"
            />
            <PasswordInput
              isRequired
              label={content.inputs.password}
              name="password"
            />
            <PasswordInput
              isRequired
              label={content.inputs.confirmPassword}
              name="confirmPassword"
            />
            <Spacer />
            <Button color="secondary" type="submit">
              {content.inputs.submit}
            </Button>
          </form>
          <Divider />
          <GoogleButton />
          <Divider />
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-muted text-center text-sm">
              {content.haveAccount}
            </p>
            <LocaleLink to="/login">{content.login}</LocaleLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
