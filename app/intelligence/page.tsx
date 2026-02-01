import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { IntelligenceClient } from "./IntelligenceClient";

export default async function IntelligencePage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/login?callbackUrl=/intelligence");
  }

  return <IntelligenceClient />;
}
