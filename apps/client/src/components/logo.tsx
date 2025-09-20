import { Image, type ImageProps } from "@heroui/react";

export default function Logo(props: ImageProps) {
  return <Image alt="Logo" src="/logo.png" {...props} />;
}
