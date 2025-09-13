import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
// eslint-disable-next-line no-restricted-imports
import { type NavigateOptions, useNavigate } from "react-router";

import { isExternalURL } from "~/utils/is-external-url";

export default function useLocaleNavigate() {
  const navigate = useNavigate();
  const { locale } = useLocale();

  return (to: string, options?: NavigateOptions) => {
    const url = isExternalURL(to) ? to : getLocalizedUrl(to, locale);
    navigate(url, options);
  };
}
