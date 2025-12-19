'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { api } from '@/lib/api';

import { useParams } from 'next/navigation';

export const dynamic = 'force-dynamic';

function VerifyEmailContent() {
  const { lang } = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token');
  const [status, setStatus] = useState('verifying');

  useEffect(() => {
    const verify = async () => {
      if (!token) {
        setStatus("invalid");
        toast.error("Invalid or missing token.");
        return;
      }

      try {
        await api.get("/auth/verify-email", {
          params: { token },
        });

        setStatus("success");
        toast.success("Your email has been verified successfully!");

        // Redirect after 2 seconds
        setTimeout(() => {
          router.push(`/${lang}/login`);
        }, 2000);
      } catch (err: any) {
        console.error(err);
        setStatus("failed");
        toast.error(err?.response?.data?.message || "Verification failed.");
      }
    };

    verify();
  }, [token, router, lang]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4 text-blue-700">
          Email Verification
        </h2>
        {status === 'verifying' && <p>Verifying your email...</p>}
        {status === 'success' && <p className="text-green-600">Email verified! Redirecting...</p>}
        {status === 'failed' && <p className="text-red-600">Verification failed. Please try again.</p>}
        {status === 'invalid' && <p className="text-red-500">Invalid or expired link.</p>}
      </div>
      <ToastContainer position="top-right" autoClose={5000} transition={Zoom} theme="colored" />
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md max-w-sm text-center">
          <p>Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  );
}