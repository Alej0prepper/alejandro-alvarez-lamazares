import { createHash, timingSafeEqual } from "node:crypto";
import { NextResponse } from "next/server";

const demoPasswordHash =
  process.env.PASSWORD_ROUTE_HASH ??
  "937e8d5fbb48bd4949536cd65b8d35c426b80d2f830c5c308e2cdec422ae2244";

function hashPassword(password: string): string {
  return createHash("sha256").update(password, "utf8").digest("hex");
}

function matchesPassword(password: unknown): boolean {
  if (typeof password !== "string") return false;

  const receivedHash = Buffer.from(hashPassword(password), "utf8");
  const expectedHash = Buffer.from(demoPasswordHash, "utf8");

  return receivedHash.length === expectedHash.length && timingSafeEqual(receivedHash, expectedHash);
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { password?: unknown } | null;

  if (!matchesPassword(body?.password)) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  return NextResponse.json({ ok: true });
}
