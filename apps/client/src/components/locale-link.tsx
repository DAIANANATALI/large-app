/* eslint-disable no-restricted-imports */
import { getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { Link, type LinkProps } from "react-router";

import { isExternalURL } from "~/utils/is-external-url";

interface LocaleLinkProps extends LinkProps {
  to: string;
}

export default function LocaleLink(props: LocaleLinkProps) {
  const { locale } = useLocale();

  const { to, ...rest } = props;

  if (isExternalURL(to.toString())) {
    return <Link {...props} />;
  }

  return (
    <Link
      className="inline-flex items-center gap-1 font-medium transition-colors hover:underline"
      to={getLocalizedUrl(to.toString(), locale)}
      {...rest}
    />
  );
}
