import type { MetaDescriptor } from "react-router";

interface SeoProps {
  description: string;
  image?: string;
  keywords?: string[];
  title: string;
}

export default function generateSeoMeta(props: SeoProps): MetaDescriptor[] {
  const { description, image, keywords, title } = props;

  const meta: MetaDescriptor[] = [
    { title },
    { content: description, name: "description" },
    { content: title, property: "og:title" },
    { content: description, property: "og:description" },
    { content: title, name: "twitter:title" },
    { content: description, name: "twitter:description" },
  ];

  if (image) {
    meta.push(
      { content: image, property: "og:image" },
      { content: image, name: "twitter:image" },
      { content: "summary_large_image", name: "twitter:card" }
    );
  }

  if (keywords) {
    meta.push({ content: keywords.join(", "), name: "keywords" });
  }

  return meta;
}
