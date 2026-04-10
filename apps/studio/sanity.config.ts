import { defineConfig } from "sanity";
import { deskTool as structureTool } from "sanity/desk";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./schemaTypes";
import { deskStructure } from "./deskStructure";

export default defineConfig({
  name: "default",
  title: "inculva Knowledge Base",
  projectId: "0w6yrm5e",
  dataset: "production",
  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
    codeInput(),
  ],
  schema: {
    types: schemaTypes,
  },
});
