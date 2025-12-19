// src/app/[lang]/membership/certificate/[id]/page.tsx
import { CertificateViewer } from "../component/CertificateViewer";

type Props = {
  params: Promise<{ lang: string; id: string }>;
};

export default async function CertificatePage({ params }: Props) {
  const { id } = await params; // ✅ await params

  return <CertificateViewer certificateId={id} />;
}
