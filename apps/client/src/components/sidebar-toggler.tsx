import { Button } from "@heroui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

import { useSidebarStore } from "~/store/sidebar-store";

export function SidebarToggler({ className }: { className?: string }) {
  const toggleSidebar = useSidebarStore((s) => s.toggleSidebar);

  return (
    <Button
      className={className}
      isIconOnly
      onPress={toggleSidebar}
      variant="ghost"
    >
      <Icon className="h-5 w-5" icon="mdi:menu" />
    </Button>
  );
}
