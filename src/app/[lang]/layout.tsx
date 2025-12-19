import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
// import Script from "next/script";
import Navbar from "./components/Global/Navbar";
import Footer from "./components/Global/Footer";
// import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { getStaticContent } from "@/lib/getStaticContent";
import { ReactNode } from "react";

// const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
// const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Achalgach",
  description: "Community Website",
};

export default async function LocaleLayout({
  params,
  children,
}: {

  params: { lang: string };

  children: ReactNode;
}) {
  const { lang } =  await params; 
   const navbarContent = getStaticContent(lang, "global/navbar");
  return (
    <LanguageProvider defaultLocale={lang}>
<Navbar
  lang={lang}
  navItems={navbarContent.mainMenu}   // Use mainMenu here
  profileMenu={navbarContent.userMenu} // Use userMenu here
/>

      {children}
      <Footer />
    </LanguageProvider>
  );
}

