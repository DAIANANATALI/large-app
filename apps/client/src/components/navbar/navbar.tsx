import {
  Button,
  Divider,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";
import { useIntlayer } from "react-intlayer";
import { useLocation } from "react-router";

import LocaleLink from "~/components/locale-link";
import LocaleSwitcher from "~/components/locale-switcher";
import ThemeSwitcher from "~/components/theme-switcher";
import useAuth from "~/hooks/use-auth";

export function NavbarComponent() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const { pathname } = useLocation();

  const content = useIntlayer("navbar");

  const { user } = useAuth();

  const menuItems = [
    { href: "/", label: content.items.home },
    { href: "/posts", label: content.items.posts },
  ];

  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  return (
    <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand className="mr-4">
          <LocaleLink
            className="flex items-center space-x-2 text-3xl font-extrabold"
            to="/"
          >
            LARGE
          </LocaleLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden gap-3 sm:flex" justify="center">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <LocaleLink to={item.href}>{item.label}</LocaleLink>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
        <NavbarItem>
          <LocaleSwitcher />
        </NavbarItem>
        <Divider className="h-5" orientation="vertical" />
        {user ? (
          <NavbarItem className="hidden md:block">
            <Button as={LocaleLink} to="/dashboard" variant="bordered">
              <Icon className="h-5 w-5" icon="mdi:account" />
              Account
            </Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem className="hidden md:block">
              <Button as={LocaleLink} color="secondary" to="/login">
                {content.items.login}
              </Button>
            </NavbarItem>
            <NavbarItem>
              <Button as={LocaleLink} to="/register" variant="bordered">
                {content.items.register}
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={index}>
            <LocaleLink to={item.href}>{item.label}</LocaleLink>
          </NavbarMenuItem>
        ))}
        <Divider />
        {user ? (
          <NavbarMenuItem>
            <Button
              as={LocaleLink}
              fullWidth
              to="/dashboard"
              variant="bordered"
            >
              <Icon className="h-5 w-5" icon="mdi:account" />
              Account
            </Button>
          </NavbarMenuItem>
        ) : (
          <>
            <NavbarMenuItem>
              <Button as={LocaleLink} color="secondary" fullWidth to="/login">
                {content.items.login}
              </Button>
            </NavbarMenuItem>
            <NavbarMenuItem>
              <Button
                as={LocaleLink}
                fullWidth
                to="/register"
                variant="bordered"
              >
                {content.items.register}
              </Button>
            </NavbarMenuItem>
          </>
        )}
      </NavbarMenu>
    </Navbar>
  );
}
