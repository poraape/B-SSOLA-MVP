import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const flowsDir = path.resolve(__dirname, "../domain/flows");
const outputFile = path.resolve(__dirname, "../registry/flowRegistry.ts");

const files = fs
  .readdirSync(flowsDir)
  .filter(f => f.startsWith("flow_") && f.endsWith(".ts"))
  .sort();

const imports = files.map(f => {
  const name = f.replace(".ts", "");
  return `import { ${name} } from "../domain/flows/${name}";`;
});

const registryEntries = files
  .map(f => f.replace(".ts", ""))
  .join(",\n  ");

const content = `
/**
 * AUTO-GENERATED FILE
 * DO NOT EDIT MANUALLY
 */

${imports.join("\n")}

export const flowRegistry = {
  ${registryEntries}
};
`;

fs.writeFileSync(outputFile, content);
console.log("Flow registry generated.");
