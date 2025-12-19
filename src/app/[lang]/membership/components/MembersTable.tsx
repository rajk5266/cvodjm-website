'use client';
// src/components/MembersTable.tsx
import React from "react";
import { Member, MemberStatus } from '@/types/membership';

interface MembersTableProps {
  members: Member[];
  loading: boolean;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
  onRefresh: () => void;
   lang: string;
}

const StatusBadge: React.FC<{ status: MemberStatus }> = ({ status }) => {
  const statusColors: Record<MemberStatus, string> = {
    draft: "bg-gray-100 text-gray-800",
    submitted: "bg-yellow-100 text-yellow-800",
    approved: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export const MembersTable: React.FC<MembersTableProps> = ({
  members,
  loading,
  onEdit,
  onDelete,
  onRefresh,
  lang
}) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-indigo-600">Loading members...</span>
      </div>
    );
  }

  console.log(members, "MENBERS");

  if (members.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500">No members found</p>
        <button
          onClick={onRefresh}
          className="mt-3 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white">
        <thead>
          <tr className="bg-gray-100 text-left text-sm font-medium text-gray-700">
            {/* <th className="px-6 py-3">Govt ID</th> */}
            <th className="px-6 py-3">Name</th>
            {/* <th className="px-6 py-3">Email</th> */}
            <th className="px-6 py-3">Whatsapp No.</th>
            <th className="px-6 py-3">Status</th>
            <th className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              className="border-b hover:bg-gray-50 transition-colors"
            >
              {/* <td className="px-6 py-4 text-sm text-gray-700">
                {member.govtIdNo}
              </td> */}
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                {member.firstName} {member.lastName}
              </td>
              {/* <td className="px-6 py-4 text-sm text-gray-700">
                {member.email}
              </td> */}
              <td className="px-6 py-4 text-sm text-gray-700">
                {member.phone}
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={member.status} />
              </td>
              <td className="px-6 py-4 text-sm space-x-3">
                {member.status.toLowerCase() === "approved" ? (
                  <button
                    onClick={() =>  window.location.href = `/${lang}/membership/certificate/${member.id}`}
                    className="text-green-600 hover:text-green-900 transition-colors"
                    aria-label={`View member ${member.firstName} ${member.lastName}`}
                  >
                    View
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => onEdit(member)}
                      className="text-blue-600 hover:text-blue-900 transition-colors"
                      aria-label={`Edit member ${member.firstName} ${member.lastName}`}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(member.id)}
                      className="text-red-600 hover:text-red-900 transition-colors"
                      aria-label={`Delete member ${member.firstName} ${member.lastName}`}
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>



            </tr>
          ))}
        </tbody>
      </table>

      <div className="px-6 py-3 bg-gray-50 text-sm text-gray-600">
        Total members: {members.length}
      </div>
    </div>
  );
};
