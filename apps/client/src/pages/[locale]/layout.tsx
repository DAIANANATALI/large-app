import { IntlayerProvider } from "react-intlayer";
import { Outlet } from "react-router";

import { useI18nHTMLAttributes } from "~/hooks/useI18nHTMLAttributes";

import type { Route } from "./+types/layout";

export default function LocaleLayout({ params }: Route.ComponentProps) {
  const { locale } = params;
  useI18nHTMLAttributes(locale);

  return (
    <IntlayerProvider locale={locale}>
      <Outlet />
    </IntlayerProvider>
  );
}
