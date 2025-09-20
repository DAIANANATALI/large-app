import React, { useEffect } from "react";
import { NavLink } from "react-router";

import { useMarkdownHeadings } from "~/hooks/use-md-headings";

export default function TableOfContents() {
  const headings = useMarkdownHeadings();
  const [activeId, setActiveId] = React.useState<null | string>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const getMarginLeft = (level: number) => {
    switch (level) {
      case 1:
        return "ml-0";
      case 2:
        return "ml-4";
      case 3:
        return "ml-8";
      default:
        return "ml-0";
    }
  };

  return (
    <nav aria-label="Table of contents" className="sticky top-20">
      <ul className="flex flex-col gap-2">
        {headings.map((heading) => (
          <li className={getMarginLeft(heading.level)} key={heading.id}>
            <NavLink
              aria-disabled={activeId === heading.id}
              to={{ hash: `#${heading.id}` }}
            >
              {heading.text}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
