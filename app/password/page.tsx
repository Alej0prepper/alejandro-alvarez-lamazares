import PasswordClient from "./password-client";

export default async function PasswordPage() {
  return <PasswordClient isAuthenticated={false} />;
}
