import { readFile } from "node:fs/promises";
import path from "node:path";
import PromptViewer from "../implement-class/prompt-viewer";

export default async function AddDailyClassPromptPage() {
  const promptPath = path.join(process.cwd(), "docs", "prompts", "add-daily-class.md");
  const prompt = await readFile(promptPath, "utf8");

  return <PromptViewer
    prompt={prompt}
    title="Añadir una clase diaria"
    description="Guía para publicar la siguiente clase del curso respetando la secuencia, los registros y el estándar editorial vigente."
  />;
}
