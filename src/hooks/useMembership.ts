'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';

export const useMembership = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null); // null = loading state

  // Check if user is logged in
  const checkLoginStatus = async () => {
    try {
      const res = await api.get('/auth/me', { withCredentials: true });
      setIsLoggedIn(!!res.data.user);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const savePartial = async (userId: string, stepIndex: number, data: any) => {
    await api.post(
      '/membership/partial',
      {
        govtIdNo: data.govtIdNo,
        formData: data,
        currentStep: stepIndex,
      },
      { withCredentials: true }
    );
  };

  return { isLoggedIn, savePartial };
};
