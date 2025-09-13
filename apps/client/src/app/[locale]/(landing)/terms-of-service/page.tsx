import Markdown from "react-markdown";

import type { Route } from "./+types/page";

const content = import.meta.glob("./*.md", {
  eager: true,
  import: "default",
  query: "?raw",
});

export default function Page({ params }: Route.ComponentProps) {
  console.log(params);
  const localeContent = content[`./${params.locale}.md`];

  return (
    <div className="prose dark:prose-invert mx-auto my-10 max-w-3xl px-4">
      <Markdown>{localeContent as string}</Markdown>
    </div>
  );
}
