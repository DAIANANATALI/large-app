import type { IntlayerNode } from "react-intlayer";

import { Icon } from "@iconify/react/dist/iconify.js";

import LocaleLink from "./locale-link";

interface HeaderProps {
  actions: { create: IntlayerNode };
  createUrl: string;
  subtitle: IntlayerNode;
  title: IntlayerNode;
}

export default function Header(content: HeaderProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      <div>
        <h1 className="text-2xl font-bold">{content.title}</h1>
        <p className="text-muted text-sm">{content.subtitle}</p>
      </div>
      <div className="flex items-end justify-end gap-2">
        <LocaleLink to={content.createUrl}>
          <Icon className="h-5 w-5" icon="mdi:plus" />
          <span>{content.actions.create}</span>
        </LocaleLink>
      </div>
    </div>
  );
}
