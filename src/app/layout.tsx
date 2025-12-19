// app/root-layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
// import Navbar from "./[lang]/components/Global/Navbar";
// import Footer from "./[lang]/components/Global/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
import ClientProviders from "./clientProviders";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50`}>
        <Script src="https://accounts.google.com/gsi/client" strategy="beforeInteractive" />

        <ClientProviders>

          {/* <Navbar /> */}
          <main className="pt-16 min-h-screen">{children}</main>
          <ToastContainer position="top-right" autoClose={5000} theme="colored" />
          {/* <Footer /> */}
        </ClientProviders>
      </body>
    </html>
  );
}
