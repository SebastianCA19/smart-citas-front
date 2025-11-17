import { Geist, Geist_Mono } from "next/font/google";
import "../../globals.css";
import { Metadata } from "next";
import DoctorsSidebar from "@/app/components/doctors/DoctorsSidebar";

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
            <head>
                <link rel="icon" href="/favicon.ico" />
            </head>
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gray-100`}
            >
                <div className="flex flex-row min-h-screen md:space-x-2 space-x-0">
                    {/* Sidebar - Hidden on mobile, visible on desktop */}
                    <div className="hidden lg:block lg:w-2/12 bg-white shadow-md">
                        <DoctorsSidebar />
                    </div>

                    {/* Main Content */}
                    <div className="w-full lg:w-10/12 p-4 md:p-8 bg-white shadow-md min-h-screen">
                        {children}  
                    </div>
                </div>
                
                {/* Mobile Sidebar (rendered but positioned fixed) */}
                <div className="lg:hidden">
                    <DoctorsSidebar />
                </div>
            </body>
        </html>
    );
}