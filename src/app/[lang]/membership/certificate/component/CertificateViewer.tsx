// src/components/CertificateViewer.tsx
"use client"; 
import { api } from "@/lib/api";

import { useEffect, useState } from "react";

interface CertificateData {
  firstName: string;
  lastName: string;
  govtIdNo: string;
  id: string;
  issueDate: string;
}

interface Props {
  certificateId: string;
}

export const CertificateViewer: React.FC<Props> = ({ certificateId }) => {
  const [data, setData] = useState<CertificateData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await api.get(`membership/member/certificate/${certificateId}`);
        if (!res) throw new Error("Certificate not found");
        const data = await res.data;
        setData(data);
      } catch (err: any) {
        setError(err.message || "Error fetching certificate");
      } finally {
        setLoading(false);
      }
    };

    fetchCertificate();
  }, [certificateId]);

  if (loading) return <p className="text-center">Loading certificate...</p>;
  if (error) return <p className="text-center text-red-600">{error}</p>;
  if (!data) return null;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Membership Certificate</h1>

      <div className="border p-6 rounded-lg bg-gray-50 space-y-4">
        <div><span className="font-semibold">Member Name:</span> {data.firstName} {data.lastName}</div>
        <div><span className="font-semibold">Govt ID No:</span> {data.govtIdNo}</div>
        <div><span className="font-semibold">Member ID:</span> {data.id}</div>
        <div><span className="font-semibold">Issue Date:</span> {data.issueDate || new Date().toLocaleDateString()}</div>
      </div>

      <div className="mt-6 text-center">
        <button
          onClick={() => window.print()}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Print Certificate
        </button>
      </div>
    </div>
  );
};
