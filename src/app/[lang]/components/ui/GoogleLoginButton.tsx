'use client';

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/auth-store";
import { api } from "@/lib/api";

export default function GoogleLoginButton() {
  const setAuth = useAuthStore((state) => state.setAuth);
  const router = useRouter();

  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: google.accounts.id.CredentialResponse) => {
          try {
            const res = await api.post("/auth/google", {
              id_token: response.credential,
            });

            const data = res.data;

            if (res.status === 200) {
              // Our auth store currently only expects the user object
              setAuth(data.user);
              router.push("/");
            } else {
              console.error(data.message || "Google login failed");
            }
          } catch (error) {
            console.error("Login error:", error);
          }
        },
      });

      window.google.accounts.id.renderButton(
        document.getElementById("google-button")!,
        { theme: "outline", size: "large" }
      );
    }
  }, [setAuth, router]);

  return <div id="google-button" />;
}
