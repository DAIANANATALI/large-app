import type React from "react";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "react-router";

import "./app.css";
import "@fontsource/roboto";

export default function App() {
  return <Outlet />;
}

export function Layout({ children }: React.PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}
