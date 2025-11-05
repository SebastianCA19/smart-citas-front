import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import IndexHeader from "../components/index/IndexHeader";

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
  description: "Un manejador de citass.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <link rel="icon" href="/favicon.ico" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <IndexHeader />
        {children}
        <footer className="w-full h-fit flex flex-row justify-center items-center px-15 py-10 bg-white mt-20">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Smart Citas. Todos los derechos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}
