import type { PostTranslation } from "@repo/db";

import {
  addToast,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  type Selection,
  SelectItem,
  useDisclosure,
} from "@heroui/react";
import { useState } from "react";
import { useIntlayer, useLocale } from "react-intlayer";

import useLocaleNavigate from "~/hooks/useLocaleNavigate";
import { api, resolveApiError } from "~/lib/api";

interface TranslationModalProps {
  translation: PostTranslation;
}
export default function TranslationModal({
  translation,
}: TranslationModalProps) {
  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();
  const content = useIntlayer("dashboard.translations.translate");
  const { availableLocales } = useLocale();
  const [selectedLocales, setSelectedLocales] = useState<Selection>();
  const navigate = useLocaleNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsLoading(true);
    try {
      await api.post(`/translations/${translation.id}/translate`, {
        to: Array.from(selectedLocales || []),
      });
      addToast({ color: "success", title: content.toast.success });
      navigate(`/dashboard/translations`);
      onClose();
    } catch (error) {
      const apiError = resolveApiError(error);
      addToast({
        color: "danger",
        description: apiError.message,
        title: content.toast.error,
      });
    }
    setIsLoading(false);
  };

  return (
    <>
      <Button onPress={onOpen}>{content.trigger}</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">
            <h3 className="text-lg font-semibold">{content.modal.title}</h3>
            <p className="text-muted text-sm">{content.modal.subtitle}</p>
          </ModalHeader>
          <ModalBody>
            <form className="grid gap-3" onSubmit={onSubmit}>
              <Select
                disabledKeys={[translation.locale]}
                label={content.form.to}
                name="to"
                onSelectionChange={setSelectedLocales}
                selectedKeys={selectedLocales}
                selectionMode="multiple"
              >
                {availableLocales.map((locale) => (
                  <SelectItem key={locale}>{locale.toUpperCase()}</SelectItem>
                ))}
              </Select>
              <Button isLoading={isLoading} type="submit">
                {content.form.submit}
              </Button>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" onPress={onClose} variant="light">
              {content.modal.close}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
