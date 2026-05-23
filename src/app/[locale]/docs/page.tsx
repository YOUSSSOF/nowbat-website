import { redirect } from "next/navigation";

type Props = { params: Promise<{ locale: string }> };

export default async function DocsIndexPage({ params }: Props) {
  const { locale } = await params;
  const prefix = locale === "fa" ? "" : "/en";
  redirect(`${prefix}/docs/getting-started/installation`);
}
