import { expoClient } from "@better-auth/expo/client";
import { createAuthClient } from "better-auth/react";
import * as SecureStore from "expo-secure-store";

import { ENV } from "@/src/lib/env";

export const auth = createAuthClient({
  baseURL: `${ENV.API_BASE}/api/auth`,
  plugins: [
    expoClient({
      scheme: "exposhadcnstarter",
      storagePrefix: "exposhadcnstarter",
      storage: SecureStore,
    }),
  ],
});

