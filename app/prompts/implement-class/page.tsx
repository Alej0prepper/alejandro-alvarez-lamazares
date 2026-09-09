import { readFile } from "node:fs/promises";
import path from "node:path";
import PromptViewer from "./prompt-viewer";

export default async function ImplementClassPromptPage() {
  const promptPath = path.join(process.cwd(), "docs", "prompts", "implement-class.md");
  const prompt = await readFile(promptPath, "utf8");

  return <PromptViewer prompt={prompt} />;
}
