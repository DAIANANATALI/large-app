import { useEffect, useState } from "react";

interface Heading {
  id: string;
  level: number;
  text: string;
}

export function useMarkdownHeadings() {
  const [headings, setHeadings] = useState<Heading[]>([]);

  useEffect(() => {
    const nodes = Array.from(
      document.getElementById("content")?.querySelectorAll("h1, h2, h3") || []
    );
    const newHeadings = nodes.map((node) => ({
      id: node.id,
      level: parseInt(node.tagName.split("")[1]),
      text: node.textContent || "",
    }));
    setHeadings(newHeadings);
  }, []);

  return headings;
}
