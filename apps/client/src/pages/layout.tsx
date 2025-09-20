import { HeroUIProvider, Progress, ToastProvider } from "@heroui/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { motion } from "framer-motion";
import { ThemeProvider } from "next-themes";
import { type MetaFunction, Outlet, useNavigation } from "react-router";
import { SWRConfig } from "swr";

import useLocaleNavigate from "~/hooks/useLocaleNavigate";
import { fetcher } from "~/lib/api";
import { composeProviders } from "~/utils/compose-providers";
import generateSeoMeta from "~/utils/seo";

const Providers = composeProviders(
  ({ children }) => <ThemeProvider attribute="class">{children}</ThemeProvider>,
  ({ children }) => {
    const navigate = useLocaleNavigate();
    return <HeroUIProvider navigate={navigate}>{children}</HeroUIProvider>;
  },
  ({ children }) => (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      {children}
    </GoogleOAuthProvider>
  ),
  ({ children }) => <SWRConfig value={{ fetcher }}>{children}</SWRConfig>
);

export const meta: MetaFunction = () => {
  return generateSeoMeta({
    description: "A blog application built with a monorepo architecture",
    keywords: ["blog", "monorepo", "react", "typescript", "prisma", "tailwind"],
    title: "Large App",
  });
};

export default function RootLayout() {
  return (
    <Providers>
      <motion.div
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        initial={{ opacity: 0 }}
      >
        <LoadingIndicator />
        <Outlet />
      </motion.div>
      <ToastProvider />
    </Providers>
  );
}

function LoadingIndicator() {
  const navigaton = useNavigation();
  const isLoading = navigaton.state === "loading";

  if (!isLoading) return null;

  return (
    <Progress
      className="fixed top-0 left-0 z-50 w-full"
      color="secondary"
      isIndeterminate
      radius="none"
      size="sm"
    />
  );
}
