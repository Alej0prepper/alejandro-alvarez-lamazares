import { readFile } from "node:fs/promises";
import path from "node:path";

const cvFilePath = path.join(process.cwd(), "CV", "Alejandro Alvarez Lamazares.pdf");

export async function GET() {
  const pdf = await readFile(cvFilePath);

  return new Response(new Uint8Array(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": 'inline; filename="Alejandro-Alvarez-Lamazares.pdf"',
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}
