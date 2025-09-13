// @ts-check

import { reactConfig } from "@repo/eslint-config";
import { defineConfig } from "eslint/config";

export default defineConfig(
  reactConfig,
  { ignores: [".react-router", ".intlayer"] },
  {
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              importNames: ["Link", "useNavigate"],
              name: "react-router",
            },
            {
              importNames: ["Link"],
              name: "@heroui/react",
            },
          ],
        },
      ],
    },
  }
);
