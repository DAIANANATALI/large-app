import Markdown from "react-markdown";
import rehypeSlug from "rehype-slug";

interface PostContentProps {
  content: string;
}
export default function PostContent({ content }: PostContentProps) {
  return (
    <p className="prose dark:prose-invert max-w-none" id="content">
      <Markdown rehypePlugins={[rehypeSlug]}>{content}</Markdown>
    </p>
  );
}
