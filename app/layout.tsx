import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { ToastContainer } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "INGRES AI Advanced - Groundwater Virtual Assistant for India",
  description:
    "An intelligent, simple, light, and accessible groundwater dashboard and AI virtual assistant for farmers, government officials, and researchers in India.",
  keywords: [
    "groundwater",
    "INGRES",
    "India water security",
    "aquifer telemetry",
    "Jal Shakti",
    "CGWB",
    "farmer advisory",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-background text-neutral-primary min-h-screen flex flex-col antialiased selection:bg-primary-light selection:text-primary-dark">
        {/* Toast Notification Container */}
        <ToastContainer />

        {/* Top Header */}
        <Header />

        {/* Main Body Shell */}
        <div className="flex-1 flex w-full max-w-[1600px] mx-auto">
          <Sidebar />
          <main className="flex-1 px-4 py-6 md:px-8 pb-20 md:pb-8 overflow-x-hidden min-w-0">
            {children}
          </main>
        </div>

        {/* Footer */}
        <Footer />

        {/* Mobile Navigation Drawer & Bottom Bar */}
        <MobileNav />
      </body>
    </html>
  );
}
