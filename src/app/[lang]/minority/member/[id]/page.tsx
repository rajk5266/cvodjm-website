"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
// import Cookies from "js-cookie";
import { api } from "@/lib/api";
import { MembershipForm } from "../../components/MembershipForm";

export default function MembershipFormPage() {
  const { id } = useParams<{ id: string }>();
  const [member, setMember] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      if (!id || id === "new") {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get(`/minority/member/${id}`);
        setMember(response.data);
      } catch (err) {
        console.error("Error loading member:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto p-6">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <MembershipForm
        editingMember={member}
      />
    </div>
  );
}
