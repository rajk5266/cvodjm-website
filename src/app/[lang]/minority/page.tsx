import { MinorityCertificate } from "./components/MinorityCertificate";

type PageProps = {
  params: Promise<{ lang: string }>;
};

export default async function MyPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Minority Certificate</h1>
      <MinorityCertificate lang={lang} />
    </main>
  );
}
