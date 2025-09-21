import {
  BreadcrumbItem,
  Breadcrumbs,
  Navbar,
  NavbarContent,
} from "@heroui/react";
import { type IntlayerNode } from "react-intlayer";
import { Navigate, Outlet } from "react-router";

import LocaleSwitcher from "~/components/locale-switcher";
import { SidebarToggler } from "~/components/sidebar-toggler";
import ThemeSwitcher from "~/components/theme-switcher";
import useAuth from "~/hooks/use-auth";

import Sidebar from "./sidebar";

export interface SidebarItem {
  href: string;
  icon: string;
  label: IntlayerNode;
}

export default function DashboardLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (!isAuthenticated && !isLoading) {
    return <Navigate replace to="/" />;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="h-screen flex-1 overflow-auto">
        <Navbar className="bg-content1" maxWidth="full">
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
