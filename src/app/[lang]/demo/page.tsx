import Link from "next/link";
import { getStaticContent } from "@/lib/getStaticContent";
import { getDynamicContent } from "./api";

type Props = {
  params: Promise<{ lang: string }>;
};

export default async function DemoPage({ params }: Props) {
  const { lang } = await params;

  // Static JSON content
  const staticData = getStaticContent(lang, "common");

  // Dynamic API content
  const dynamicData = await getDynamicContent(lang);

  return (
    <div style={{ padding: "1rem" }}>
      <section style={{ background: "#def", padding: "1rem", marginBottom: "1rem" }}>
        <h3>Static Section</h3>
        <h4>{staticData.title}</h4>
        <p>{staticData.description}</p>
      </section>

      <section style={{ background: "#fed", padding: "1rem" }}>
        <h3>Dynamic Section</h3>
        <p>{dynamicData.message}</p>
      </section>

      <div style={{ marginTop: "1rem" }}>
        <Link href="/en/demo" style={{ marginRight: "1rem" }}>
          English
        </Link>
        <Link href="/gu/demo">
          Gujarati
        </Link>
      </div>
    </div>
  );
}
