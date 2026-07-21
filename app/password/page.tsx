import { cookies } from "next/headers";
import PasswordClient from "./password-client";

export default async function PasswordPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("password_route_access")?.value === "granted";

  return <PasswordClient isAuthenticated={isAuthenticated} />;
}
