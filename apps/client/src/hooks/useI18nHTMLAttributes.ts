import { getHTMLTextDir } from "intlayer";
import { useEffect } from "react";

export const useI18nHTMLAttributes = (locale: string) => {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = getHTMLTextDir(locale);
  }, [locale]);
};
