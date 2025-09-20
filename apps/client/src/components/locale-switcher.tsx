import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { getHTMLTextDir, getLocaleName, getLocalizedUrl } from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation } from "react-router";

import getLocaleFlag from "~/utils/get-locale-flag";

export default function LocaleSwitcher() {
  const { pathname } = useLocation();

  const { availableLocales, locale, setLocale } = useLocale({
    onLocaleChange: (newLocale) => {
      const pathWithLocale = getLocalizedUrl(pathname, newLocale);
      location.replace(pathWithLocale);
    },
  });

  return (
    <Dropdown>
      <DropdownTrigger>
        <Button
          aria-label="Change Language"
          className="rounded-full"
          isIconOnly
          variant="light"
        >
          <Icon
            className="size-4"
            icon={locale ? getLocaleFlag(locale) : "mdi:globe"}
          />
        </Button>
      </DropdownTrigger>
      <DropdownMenu disabledKeys={[locale]}>
        {availableLocales.map((loc) => (
          <DropdownItem
            description={getLocaleName(loc, locale)}
            dir={getHTMLTextDir(loc)}
            endContent={<Icon className="size-8" icon={getLocaleFlag(loc)} />}
            key={loc}
            onPress={() => setLocale(loc)}
          >
            {getLocaleName(loc)}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
}
