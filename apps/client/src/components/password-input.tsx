import { Button, Input, type InputProps } from "@heroui/react";
import { Icon } from "@iconify/react/dist/iconify.js";
import React from "react";

export default function PasswordInput(props: InputProps) {
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => {
    setIsVisible((prev) => !prev);
  };

  const togglerIcon = isVisible ? "mdi:eye-off" : "mdi:eye";
  const togglerButton = (
    <Button isIconOnly onPress={toggleVisibility} size="sm" variant="light">
      <Icon className="h-4 w-4" icon={togglerIcon} />
    </Button>
  );

  return (
    <Input
      {...props}
      endContent={togglerButton}
      type={isVisible ? "text" : "password"}
    />
  );
}
