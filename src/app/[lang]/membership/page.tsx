import { MembershipManagement } from "./components/MembershipManagement";
// import { getStaticContent } from "@/lib/getStaticContent";

/* =========================
   Next.js 15 Page Props
========================= */
type PageProps = {
  params: Promise<{
    lang: string;
  }>;
};

export default async function MyPage({ params }: PageProps) {
  const { lang } = await params;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Membership Management
      </h1>

      <MembershipManagement lang={lang} />
    </main>
  );
}
