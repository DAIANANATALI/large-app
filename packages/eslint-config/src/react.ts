import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

import base from "./base";

export default defineConfig(
  base,
  pluginReact.configs.flat.recommended,
  pluginReactHooks.configs["recommended-latest"],
  {
    rules: {
      "react/react-in-jsx-scope": "off",
    },
    settings: { react: { version: "detect" } },
  }
);
