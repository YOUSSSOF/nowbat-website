import { redirect } from "next/navigation";

export default async function DocsIndexPage() {
  redirect("/docs/getting-started/installation");
}
