import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Metadata } from "next";

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
    description: "Página para los doctores",
};

export default function DocLayout({ children } : {children: React.ReactNode}){
    return(
        <html lang="es">
            <link rel="icon" href="/favicon.ico" />
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                {children}
            </body>
        </html>
    );
}