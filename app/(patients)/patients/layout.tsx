import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Metadata } from "next";
import PatientsHeader from "@/app/components/patients/PatientsHeader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Smart Citas",
    description: "Página de inicio de sesión y registro para Mi Aplicación.",
};

export default function PatientsLayout({ children }: { children: React.ReactNode }) {
  return(
    <html lang="es">
        <link rel="icon" href="/favicon.ico" />
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
            <PatientsHeader />
            {children}
        </body>
    </html>
  );
}