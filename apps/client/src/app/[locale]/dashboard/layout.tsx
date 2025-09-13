import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { type IntlayerNode, useIntlayer } from "react-intlayer";
import { Outlet } from "react-router";

import LocaleLink from "~/components/locale-link";
import LocaleSwitcher from "~/components/locale-switcher";
import { SidebarToggler } from "~/components/sidebar-toggler";
import ThemeSwitcher from "~/components/theme-switcher";
import useAuth from "~/hooks/use-auth";
import { useSidebarStore } from "~/store/sidebar-store";

const SIDEBAR_WIDTH = 280;

export interface SidebarItem {
  href: string;
  icon: string;
  label: IntlayerNode;
}

export default function DashboardLayout() {
  const content = useIntlayer("dashboard");
  const isSidebarOpen = useSidebarStore((s) => s.isSidebarOpen);
  const { user } = useAuth();

  const menuItems: SidebarItem[] = [
    {
      href: "/dashboard",
      icon: "mdi:view-dashboard-outline",
      label: content.items.dashboard,
    },
    {
      href: "/dashboard/posts",
      icon: "mdi:file-document-outline",
      label: content.items.posts,
    },
    {
      href: "/dashboard/translations",
      icon: "mdi:translate",
      label: content.items.translations,
    },
  ];

  return (
    <div className="flex h-screen overflow-hidden">
      <Card
        className="h-full transition-all"
        radius="none"
        shadow="none"
        style={{
          width: isSidebarOpen ? SIDEBAR_WIDTH : 0,
        }}
      >
        <CardHeader className="gap-2">
          <Icon className="h-10 w-10" icon="mdi:blog" />
          <div>
            <h1 className="text-lg font-bold">Blogger</h1>
            <p className="text-muted text-sm">Dashboard</p>
          </div>
          <SidebarToggler className="ms-auto md:hidden" />
        </CardHeader>
        <CardBody>
          <div className="grid gap-1">
            {menuItems.map((item, i) => (
              <SidebarItem key={i} {...item} />
            ))}
          </div>
        </CardBody>
        <CardFooter>
          <Dropdown>
            <DropdownTrigger>
              <User
                description={user?.email}
                name={user?.profile?.displayName}
              />
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownItem key={"profile"}>
                <LocaleLink to="/dashboard/profile">Profile</LocaleLink>
              </DropdownItem>
              <DropdownItem key={"logout"}>
                <LocaleLink to="/logout">Logout</LocaleLink>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </CardFooter>
      </Card>
      <div className="h-screen flex-1 overflow-auto">
        <Navbar className="bg-content1" maxWidth="full" position="sticky">
          <NavbarContent>
            <SidebarToggler />
            <NavbarBrand as={LocaleLink} to="/dashboard">
              <Icon className="h-8 w-8" icon="mdi:blog" />
            </NavbarBrand>
          </NavbarContent>
          <NavbarContent justify="end">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </NavbarContent>
        </Navbar>
        <main className="container mx-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

function SidebarItem(props: SidebarItem) {
  return (
    <Button
      as={LocaleLink}
      className="justify-start"
      fullWidth
      to={props.href}
      variant="light"
    >
      <Icon className="h-5 w-5" icon={props.icon} />
      {props.label}
    </Button>
  );
}
