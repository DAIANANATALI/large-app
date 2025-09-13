import { addToast, Button, type ButtonProps } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { useIntlayer } from "react-intlayer";

import { api } from "~/lib/api";

export default function GoogleButton(props: ButtonProps) {
  const content = useIntlayer("google-button");

  const loginWithGoogle = useGoogleLogin({
    flow: "auth-code",
    onError: () => addToast({ color: "danger", title: content.error }),
    onSuccess: async (codeResponse) => {
      try {
        const { data } = await api.post("/auth/google", {
          code: codeResponse.code,
        });
        localStorage.setItem("token", data.token);
        window.location.href = "/";
      } catch {
        addToast({ color: "danger", title: content.error });
      }
    },
  });

  return (
    <Button onPress={loginWithGoogle} variant="bordered" {...props}>
      <Icon className="mr-2 h-5 w-5" icon="flat-color-icons:google" />
      {content.label}
    </Button>
  );
}
