import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getPackageName(id: string): string | null {
  const marker = "node_modules/";
  const idx = id.lastIndexOf(marker);
  if (idx === -1) return null;
  const sub = id.slice(idx + marker.length);
  const parts = sub.split("/");
  if (!parts[0]) return null;
  if (parts[0].startsWith("@") && parts.length > 1) {
    return `${parts[0]}/${parts[1]}`;
  }
  return parts[0];
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            const pkg = getPackageName(id);
            if (
              pkg === "react" ||
              pkg === "react-dom" ||
              pkg === "react-router-dom" ||
              pkg === "scheduler" ||
              pkg === "history"
            ) {
              return "vendor-react";
            }
            if (pkg === "leaflet" || pkg === "react-leaflet" || pkg === "@react-leaflet/core") {
              return "vendor-map";
            }
            return "vendor-rest";
          }

          // Domain/model split to keep entry chunk lean.
          if (id.includes("/src/registry/flowRegistry.ts")) return "registry-chunk";
          if (id.includes("/src/domain/flows/flow_")) return "flows-chunk";
          if (
            id.includes("/src/domain/model/v2/composeModelV2.ts") ||
            id.includes("/src/domain/model/loadModel.ts") ||
            id.includes("/src/domain/model/normalizeModel.ts") ||
            id.includes("/src/domain/model/validateModel.ts")
          ) {
            return "model-chunk";
          }

          if (
            id.includes("/src/domain/flows/runtimeV2.ts") ||
            id.includes("/src/domain/flows/toLegacyUI.ts")
          ) {
            return "runtime-chunk";
          }

          // Shared UI layer split for better browser cache reuse across routes.
          if (id.includes("/src/components/ui/")) return "ui-chunk";
          return undefined;
        },
      },
    },
  },
});
