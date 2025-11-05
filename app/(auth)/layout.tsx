import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { Metadata } from "next";
import { Toaster, toast } from "react-hot-toast";

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

export default function AuthLayout({
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
            <div className="w-full h-screen flex flex-row overflow-hidden">
                {/* Go back button */}
                <a
                    href="/"
                    className="absolute top-4 left-3 text-white bg-linear-to-r from-blue-900 to-blue-700 hover:scale-110 p-2 rounded-2xl transition-all duration-200 z-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="w-4 h-4 fill-current"><path d="M41.4 342.6C28.9 330.1 28.9 309.8 41.4 297.3L169.4 169.3C178.6 160.1 192.3 157.4 204.3 162.4C216.3 167.4 224 179.1 224 192L224 256L560 256C586.5 256 608 277.5 608 304L608 336C608 362.5 586.5 384 560 384L224 384L224 448C224 460.9 216.2 472.6 204.2 477.6C192.2 482.6 178.5 479.8 169.3 470.7L41.3 342.7z"/></svg>
                </a>

                {/* Right side */}
                <div id="right-side" className="w-full md:w-2/5 h-screen overflow-y-auto bg-white">
                {children}
                </div>

                {/* Left side */}
                <div className="hidden md:flex w-3/5 h-screen flex-col justify-center items-center overflow-hidden">
                <img
                    src="/auth-img.jpg"
                    alt="Imagen de autorización que acompaña"
                    className="max-w-full h-full object-cover"
                />
                </div>
            </div>
        </body>
    </html>
    );
}