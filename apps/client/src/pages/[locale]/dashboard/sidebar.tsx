import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  cn,
  Input,
  User,
} from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useState } from "react";
import { useIntlayer } from "react-intlayer";

import LocaleLink from "~/components/locale-link";
import Logo from "~/components/logo";
import { SidebarToggler } from "~/components/sidebar-toggler";
import useAuth from "~/hooks/use-auth";
import { logout } from "~/lib/auth";
import { useSidebarStore } from "~/store/sidebar-store";

interface SidebarItem {
  href: string;
  icon: string;
  label: string;
}

export default function Sidebar() {
  const isSidebarOpen = useSidebarStore((s) => s.isSidebarOpen);
  const content = useIntlayer("dashboard");
  const { user } = useAuth();
  const [filterText, setFilterText] = useState("");

  const menuItems: SidebarItem[] = [
    {
      href: "/dashboard",
      icon: "mdi:view-dashboard-outline",
      label: content.items.dashboard.value,
    },
    {
      href: "/dashboard/posts",
      icon: "mdi:file-document-outline",
      label: content.items.posts.value,
    },
    {
      href: "/dashboard/translations",
      icon: "mdi:translate",
      label: content.items.translations.value,
    },
    {
      href: "/dashboard/account",
      icon: "mdi:account-cog-outline",
      label: content.items.account.value,
    },
  ];

  return (
    <Card
      as={"aside"}
      className={cn(isSidebarOpen ? "w-72" : "w-0", "transition-all")}
      radius="none"
      shadow="none"
    >
      <CardHeader className="justify-between">
        <div className="flex items-center justify-center">
          <Logo className="mr-2 size-8" />
          <div>
            <h1 className="text-2xl font-extrabold">LARGE</h1>
            <p className="text-muted-foreground text-sm">Blog</p>
          </div>
        </div>
        <SidebarToggler className="md:hidden" />
      </CardHeader>
      <CardBody>
        <Input
          className="mb-2"
          onValueChange={setFilterText}
          placeholder={content.search.value}
          startContent={<Icon className="size-4" icon="mdi:magnify" />}
          value={filterText}
          variant="faded"
        />
        <div className="grid gap-1">
          {menuItems
            .filter((item) =>
              item.label
                .toString()
                .toLowerCase()
                .includes(filterText.toLowerCase())
            )
            .map((item, i) => (
              <SidebarItem key={i} {...item} />
            ))}
        </div>
      </CardBody>
      <CardFooter className="justify-between">
        <User
          avatarProps={{
            name: user?.profile?.displayName,
            src: user?.profile?.avatarUrl || undefined,
          }}
          description={user?.username}
          name={user?.profile?.displayName}
        />
        <Button isIconOnly onPress={logout} variant="light">
          <Icon className="size-5" icon="mdi:logout" />
        </Button>
      </CardFooter>
    </Card>
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
      <Icon className="size-5" icon={props.icon} />
      {props.label}
    </Button>
  );
}
