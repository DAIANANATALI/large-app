import {
  BreadcrumbItem,
  Breadcrumbs,
  Navbar,
  NavbarContent,
} from "@heroui/react";
import { type IntlayerNode } from "react-intlayer";
import { Outlet } from "react-router";

import LocaleSwitcher from "~/components/locale-switcher";
import { SidebarToggler } from "~/components/sidebar-toggler";
import ThemeSwitcher from "~/components/theme-switcher";

import Sidebar from "./sidebar";

export interface SidebarItem {
  href: string;
  icon: string;
  label: IntlayerNode;
}

export default function DashboardLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="h-screen flex-1 overflow-auto">
        <Navbar maxWidth="full" position="sticky">
          <NavbarContent>
            <SidebarToggler />
            <Breadcrumbs>
              <BreadcrumbItem>Home</BreadcrumbItem>
              <BreadcrumbItem>Dashboard</BreadcrumbItem>
            </Breadcrumbs>
          </NavbarContent>
          <NavbarContent justify="end">
            <ThemeSwitcher />
            <LocaleSwitcher />
          </NavbarContent>
        </Navbar>
        <main className="container mx-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
