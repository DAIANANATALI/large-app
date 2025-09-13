import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  getHTMLTextDir,
  getLocaleLang,
  getLocaleName,
  getLocalizedUrl,
} from "intlayer";
import { useLocale } from "react-intlayer";
import { useLocation } from "react-router";

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
          variant="bordered"
        >
          <Icon className="h-4 w-4" icon="mdi:globe" />
        </Button>
      </DropdownTrigger>
      <DropdownMenu disabledKeys={[locale]}>
        {availableLocales.map((loc) => (
          <DropdownItem
            description={getLocaleLang(loc)}
            dir={getHTMLTextDir(loc)}
            endContent={getLocaleLang(loc)}
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
