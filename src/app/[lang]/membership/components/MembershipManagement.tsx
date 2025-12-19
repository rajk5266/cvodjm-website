'use client';

import React, { useEffect, useState } from 'react';
import { Member } from '@/types/membership';
import { MembersTable } from './MembersTable';
import { api } from '@/lib/api';
import { useRouter } from 'next/navigation';

interface MembershipManagementProps {
  lang: string;
}

export const MembershipManagement: React.FC<MembershipManagementProps> = ({ lang }) => {
  const router = useRouter();
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (lang) fetchMembers();
  }, [lang]);

  const fetchMembers = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await api.get(`/membership/members`);
      if (response?.data) {
        // Map API response to Member type
        const mappedMembers: Member[] = (response.data.draft || []).map((m: any) => ({
          ...m,
          status: m.status as Member['status'], // ensure status matches MemberStatus
        }));
        setMembers(mappedMembers);
      }
    } catch (err) {
      console.error('Error fetching members:', err);
      setError('Failed to load members');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (member: Member) => {
    if (!lang) return;
    router.push(`/${lang}/membership/member/${member.id}`);
  };

  const handleDelete = async (memberId: string) => {
    if (!confirm('Are you sure you want to delete this member?')) return;
    try {
      await api.delete(`/membership/member/${memberId}`);
      await fetchMembers();
    } catch (err) {
      console.error('Error deleting member:', err);
      setError('Failed to delete member');
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-semibold">Members List</h2>
          <p className="text-gray-600">Manage your members</p>
        </div>
        <button
          onClick={() => router.push(`/${lang}/membership/member/new`)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Add New Member
        </button>
      </div>

      <MembersTable
        members={members}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onRefresh={fetchMembers}
        lang={lang}
      />
    </div>
  );
};
