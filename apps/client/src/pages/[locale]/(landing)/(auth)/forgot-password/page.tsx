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

import LocaleLink from "~/components/locale-link";
import useLocaleNavigate from "~/hooks/useLocaleNavigate";
import { api, resolveApiError } from "~/lib/api";

export default function ForgotPassword() {
  const content = useIntlayer("auth.forgot-password");
  const navigate = useLocaleNavigate();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await api.post("/password-reset/request", data);
      addToast({ color: "success", title: content.toasts.success });
      navigate("/");
    } catch (error) {
      console.error(error);
      addToast({
        color: "danger",
        description: resolveApiError(error).message,
        title: content.toasts.error,
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
            <Spacer />
            <Button color="secondary" type="submit">
              {content.inputs.submit}
            </Button>
          </form>
          <Divider />
          <div className="flex flex-col items-center gap-2 text-center">
            <LocaleLink to="/register">{content.back}</LocaleLink>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
