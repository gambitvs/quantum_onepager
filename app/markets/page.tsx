import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { MarketsClient } from "./MarketsClient";

export default async function MarketsPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/markets");
  }

  return <MarketsClient />;
}
