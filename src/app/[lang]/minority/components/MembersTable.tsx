'use client';
import React, { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { useRouter } from 'next/navigation';

type CertificateStatus = "PENDING" | "APPROVED" | "REJECTED" | null;

export interface Member {
  id: string;
  firstName: string;
  lastName: string;
  whatsappNo?: string;
  minorityCertificateStatus?: CertificateStatus;
  govtIdNo?: string;
  email?: string;
  phone?: string;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
  formData?: any;
}

interface MembersTableProps {
  lang: string;
  members?: Member[];
  onEdit?: (member: Member) => void;
  onDelete?: (memberId: string) => Promise<void>;
  onRefresh?: () => Promise<void>;
}

const StatusBadge: React.FC<{ status: CertificateStatus }> = ({ status }) => {


  if (!status) return null;

  const statusColors: Record<Exclude<CertificateStatus, null>, string> = {
    PENDING: "bg-yellow-100 text-yellow-800",
    APPROVED: "bg-green-100 text-green-800",
    REJECTED: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as Exclude<CertificateStatus, null>]
        }`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </span>
  );
};

const MembersTable: React.FC<MembersTableProps> = ({ 
  // lang, 
  members: externalMembers, 
  onEdit, 
  onDelete, 
  onRefresh 
}) => {
    const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await api.get("/minority/getStatus");
      setMembers(response.data);
    } catch (error) {
      console.error(error);
      alert("Error fetching members");
    } finally {
      setLoading(false);
    }
  };

  const handleApplyCertificate = async (memberId: string) => {
    try {
      await api.post("/minority/apply", { membershipId: memberId });
      alert("Certificate application submitted!");
      if (onRefresh) {
        await onRefresh();
      } else {
        fetchMembers(); // refresh table
      }
    } catch (error: any) {
      console.error(error);
      alert(error?.response?.data?.error || "Error applying certificate.");
    }
  };

  useEffect(() => {
    if (!externalMembers) {
      fetchMembers();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const displayMembers = externalMembers || members;

  if (!externalMembers && loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-indigo-600">Loading members...</span>
      </div>
    );
  }

  if (displayMembers.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No members found</p>
        {!externalMembers && (
          <button
            onClick={fetchMembers}
            className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
          >
            Refresh
          </button>
        )}
      </div>
    );
  }

  // If external members are provided (from MinorityCertificate), show different columns
  const isExternalMode = !!externalMembers;

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
            <th className="px-6 py-3">Name</th>
            {isExternalMode ? (
              <>
                <th className="px-6 py-3">Email</th>
                <th className="px-6 py-3">Phone</th>
                <th className="px-6 py-3">Status</th>
              </>
            ) : (
              <>
                <th className="px-6 py-3">Whatsapp No.</th>
                <th className="px-6 py-3">Certificate Status</th>
              </>
            )}
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {displayMembers.map((member) => (
            <tr
              key={member.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {member.firstName} {member.lastName}
              </td>
              {isExternalMode ? (
                <>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {member.email || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {member.phone || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {member.status || "-"}
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    {onEdit && (
                      <button
                        onClick={() => onEdit(member)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(member.id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </>
              ) : (
                <>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {member.whatsappNo || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={member.minorityCertificateStatus || null} />
                  </td>
                  <td className="px-6 py-4 text-sm space-x-3">
                    {!member.minorityCertificateStatus || 
                    member.minorityCertificateStatus === "REJECTED" ? (
                      <button
                        onClick={() => handleApplyCertificate(member.id)}
                        className="text-blue-600 hover:text-blue-900 transition-colors"
                      >
                        Apply for Certificate
                      </button>
                    ) : member.minorityCertificateStatus === "PENDING" ? (
                      <span className="text-yellow-600 font-medium">
                        {member.minorityCertificateStatus}
                      </span>
                    ) : (
                      <button
                        onClick={() => router.push(`/certificate/${member.id}`)}
                        className="text-green-600 hover:text-green-900 transition-colors font-medium"
                      >
                        View Certificate
                      </button>
                    )}
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
        Total members: {displayMembers.length}
      </div>
    </div>
  );

};

export { MembersTable };
