import {
  addToast,
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

import { api, resolveApiError } from "~/lib/api";
import cdnSource from "~/utils/cdn-source";

export default function UpdateAvatar() {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    try {
      const files = await api.post("/files/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      await api.patch("/account/profile", {
        avatarUrl: cdnSource(files.data[0]),
      });

      addToast({
        color: "success",
        description: "Avatar updated",
        title: "Success",
      });

      onClose();
    } catch (error) {
      const apiError = resolveApiError(error);
      addToast({
        color: "danger",
        description: "An error occurred while updating the avatar",
        title: apiError.message,
      });
    }
  };

  return (
    <>
      <Button onPress={onOpen}>Update Avatar</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
          <ModalBody>
            <form className="grid gap-3" onSubmit={onSubmit}>
              <Input accept="image/*" isRequired name="files" type="file" />
              <Button type="submit">Upload</Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={onClose} variant="light">
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
