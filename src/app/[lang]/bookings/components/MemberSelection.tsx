"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Member } from "@/types/bookings";
import { api } from "@/lib/api";

interface MemberSelectionProps {
  onMemberSelect: (member: Member | null) => void;
  onUseMemberData: (useMemberData: boolean) => void;
  selectedMember: Member | null;
}

const MemberSelection: React.FC<MemberSelectionProps> = ({
  onMemberSelect,
  onUseMemberData,
  selectedMember,
}) => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMembers, setShowMembers] = useState(false);
  const [useMemberData, setUseMemberData] = useState(false);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await api.get("/members");

      if (!response) {
        throw new Error("Failed to fetch members");
      }

      const data = response.data;
      setMembers(data.data || []);
      setShowMembers(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Error fetching members:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMemberSelect = (member: Member) => {
    onMemberSelect(member);
    setShowMembers(false);
    setSearchQuery("");
  };

  const handleUseMemberDataChange = (checked: boolean) => {
    setUseMemberData(checked);
    onUseMemberData(checked);
  };

  const filteredMembers = members.filter((member) => {
    const fullName = `${member.firstName} ${member.middleName} ${member.surname}`.toLowerCase();
    const query = searchQuery.toLowerCase();

    return (
      fullName.includes(query) ||
      member.mobileNo.includes(query) ||
      member.emailId.toLowerCase().includes(query) ||
      member.villageName.toLowerCase().includes(query)
    );
  });

  return (
    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        <svg
          className="w-6 h-6 mr-2 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        Member Selection
      </h3>

      {!selectedMember ? (
        <>
          <p className="text-gray-600 mb-4">Select existing member profile.</p>

          <button
            onClick={fetchMembers}
            disabled={loading}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-700 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-purple-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
          >
            {loading ? "Loading Members..." : "Select from Existing Members"}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
              {error}
            </div>
          )}

          {showMembers && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden flex flex-col">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-gray-800">
                      Select Member
                    </h3>
                    <button
                      onClick={() => setShowMembers(false)}
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                      ×
                    </button>
                  </div>

                  <input
                    type="text"
                    placeholder="Search by name, mobile, email, or village..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="overflow-y-auto flex-1 p-6">
                  {filteredMembers.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {filteredMembers.map((member) => (
                        <div
                          key={member.id}
                          onClick={() => handleMemberSelect(member)}
                          className="p-4 border-2 rounded-lg cursor-pointer hover:border-blue-500 hover:bg-blue-50 transition-all"
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
                              {member.photoUrl ? (
                                <Image
                                  src={member.photoUrl}
                                  alt={member.firstName}
                                  width={48}
                                  height={48}
                                  className="rounded-full object-cover"
                                />
                              ) : (
                                `${member.firstName[0]}${member.surname[0]}`
                              )}
                            </div>

                            <div>
                              <h4 className="font-semibold text-gray-800">
                                {member.firstName} {member.middleName}{" "}
                                {member.surname}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {member.villageName}
                              </p>
                              <p className="text-sm text-gray-500">
                                {member.mobileNo}
                              </p>
                              <p className="text-sm text-gray-500 truncate">
                                {member.emailId}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      No members found.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        <div className="space-y-4">
          <div className="bg-white rounded-lg p-4 border-2 border-blue-500">
            <div className="flex justify-between">
              <div className="flex space-x-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl">
                  {selectedMember.photoUrl ? (
                    <Image
                      src={selectedMember.photoUrl}
                      alt={selectedMember.firstName}
                      width={64}
                      height={64}
                      className="rounded-full object-cover"
                    />
                  ) : (
                    `${selectedMember.firstName[0]}${selectedMember.surname[0]}`
                  )}
                </div>

                <div>
                  <h4 className="text-lg font-semibold text-gray-800">
                    {selectedMember.firstName} {selectedMember.middleName}{" "}
                    {selectedMember.surname}
                  </h4>
                  <p className="text-gray-600">
                    {selectedMember.villageName}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {selectedMember.mobileNo}
                  </p>
                  <p className="text-gray-500 text-sm">
                    {selectedMember.emailId}
                  </p>
                </div>
              </div>

              <button
                onClick={() => {
                  onMemberSelect(null);
                  setUseMemberData(false);
                  onUseMemberData(false);
                }}
                className="text-red-600 hover:text-red-800 font-semibold"
              >
                Remove
              </button>
            </div>
          </div>

          <label className="flex p-4 bg-white rounded-lg border-2 cursor-pointer">
            <input
              type="checkbox"
              checked={useMemberData}
              onChange={(e) => handleUseMemberDataChange(e.target.checked)}
              className="w-5 h-5 text-blue-600"
            />
            <div className="ml-3">
              <div className="font-semibold text-gray-800">
                Use member&apos;s existing data
              </div>
              <div className="text-sm text-gray-600">
                Auto-fill personal and residential details from member profile
              </div>
            </div>
          </label>
        </div>
      )}
    </div>
  );
};

export default MemberSelection;
