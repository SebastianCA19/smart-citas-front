"use client";

import React from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function DoctorsSidebar() {
    const [isOpen, setIsOpen] = React.useState(false);
    const [userName, setUserName] = React.useState<string>("");
    const [email, setEmail] = React.useState<string>("");
    const pathname = usePathname();

    const toggleSidebar = () => {
        setIsOpen((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        const sidebar = document.getElementById("sidebar-container");
        const button = document.getElementById("menu-toggle-button");
        
        if (sidebar && !sidebar.contains(event.target as Node) && 
            button && !button.contains(event.target as Node)) {
            setIsOpen(false);
        }
    };

    React.useEffect(() => {
        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    React.useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const userDataStr = sessionStorage.getItem('user');

        if (userDataStr) {
            const userData = JSON.parse(userDataStr);
            const fullName = `${userData.nombre} ${userData.primerApellido}`;
            setEmail(userData.email);
            setUserName(fullName);
        }
    }, []);

    const getInitials = (name: string) => {
        if (!name) return "U";
        const names = name.trim().split(" ");
        if (names.length >= 2) {
            return `${names[0][0]}${names[1][0]}`.toUpperCase();
        }
        return name[0].toUpperCase();
    };

    const handleLinkClick = () => {
        setIsOpen(false);
    };

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <>
            {/* Overlay for mobile */}
            {isOpen && (
                <div 
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile Toggle Button */}
            <button
                id="menu-toggle-button"
                className="lg:hidden fixed p-3 text-blue-600 top-7 right-6 z-50 bg-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={toggleSidebar}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Sidebar */}
            <aside
                id="sidebar-container"
                className={`fixed lg:sticky top-0 left-0 h-screen w-72 lg:w-full bg-white transition-transform duration-300 z-40 lg:z-0 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                } lg:translate-x-0 shadow-2xl lg:shadow-none flex flex-col`}
            >
                {/* Header */}
                <div className="p-6 pb-4">
                    <h1 
                        className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent hover:cursor-pointer transition-all hover:scale-105" 
                        onClick={() => window.location.href = '/doctors'}
                    >
                        Smart Citas
                    </h1>
                </div>

                {/* Division */}
                <div className="w-full border-b-2 border-gray-200 px-6"/>

                {/* Navigation */}
                <nav className="flex-1 p-4 overflow-y-auto">
                    <Link
                        href="/doctors/appointments"
                        className={`group border-l-4 flex flex-row items-center gap-4 px-4 py-3 rounded-r-lg mb-2 transition-all duration-200 ${
                            isActive('/doctors/appointments')
                                ? 'border-l-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                                : 'border-l-transparent text-gray-700 hover:border-l-blue-500 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                        onClick={handleLinkClick}
                    >
                        <div className={`flex shrink-0 w-10 h-10 items-center justify-center rounded-lg transition-colors duration-200 ${
                            isActive('/doctors/appointments')
                                ? 'bg-blue-100'
                                : 'bg-gray-100 group-hover:bg-blue-100'
                        }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="fill-current w-6 h-6">
                                <path d="M416 64C433.7 64 448 78.3 448 96L448 128L480 128C515.3 128 544 156.7 544 192L544 480C544 515.3 515.3 544 480 544L160 544C124.7 544 96 515.3 96 480L96 192C96 156.7 124.7 128 160 128L192 128L192 96C192 78.3 206.3 64 224 64C241.7 64 256 78.3 256 96L256 128L384 128L384 96C384 78.3 398.3 64 416 64zM438 225.7C427.3 217.9 412.3 220.3 404.5 231L285.1 395.2L233 343.1C223.6 333.7 208.4 333.7 199.1 343.1C189.8 352.5 189.7 367.7 199.1 377L271.1 449C276.1 454 283 456.5 289.9 456C296.8 455.5 303.3 451.9 307.4 446.2L443.3 259.2C451.1 248.5 448.7 233.5 438 225.7z"/>
                            </svg>
                        </div>
                        <span className={`font-medium text-sm lg:text-base ${
                            isActive('/doctors/appointments') ? 'font-semibold' : ''
                        }`}>
                            Ver Citas Pendientes
                        </span>
                    </Link>
                    
                    <Link
                        href="/doctors/medical-records"
                        className={`group border-l-4 flex flex-row items-center gap-4 px-4 py-3 rounded-r-lg mb-2 transition-all duration-200 ${
                            isActive('/doctors/medical-records')
                                ? 'border-l-blue-600 bg-blue-50 text-blue-700 shadow-sm'
                                : 'border-l-transparent text-gray-700 hover:border-l-blue-500 hover:bg-blue-50 hover:text-blue-700'
                        }`}
                        onClick={handleLinkClick}
                    >
                        <div className={`flex shrink-0 w-10 h-10 items-center justify-center rounded-lg transition-colors duration-200 ${
                            isActive('/doctors/medical-records')
                                ? 'bg-blue-100'
                                : 'bg-gray-100 group-hover:bg-blue-100'
                        }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640" className="fill-current w-6 h-6">
                                <path d="M128.1 64C92.8 64 64.1 92.7 64.1 128L64.1 512C64.1 547.3 92.8 576 128.1 576L274.3 576L285.2 521.5C289.5 499.8 300.2 479.9 315.8 464.3L448 332.1L448 234.6C448 217.6 441.3 201.3 429.3 189.3L322.8 82.7C310.8 70.7 294.5 64 277.6 64L128.1 64zM389.6 240L296.1 240C282.8 240 272.1 229.3 272.1 216L272.1 122.5L389.6 240zM332.3 530.9L320.4 590.5C320.2 591.4 320.1 592.4 320.1 593.4C320.1 601.4 326.6 608 334.7 608C335.7 608 336.6 607.9 337.6 607.7L397.2 595.8C409.6 593.3 421 587.2 429.9 578.3L548.8 459.4L468.8 379.4L349.9 498.3C341 507.2 334.9 518.6 332.4 531zM600.1 407.9C622.2 385.8 622.2 350 600.1 327.9C578 305.8 542.2 305.8 520.1 327.9L491.3 356.7L571.3 436.7L600.1 407.9z"/>
                            </svg>
                        </div>
                        <span className={`font-medium text-sm lg:text-base ${
                            isActive('/doctors/medical-records') ? 'font-semibold' : ''
                        }`}>
                            Ver Historias Clínicas
                        </span>
                    </Link>
                </nav>

                {/* Profile Section */}
                <div className="border-t border-gray-200 p-4">
                    <div className="flex items-center gap-3 p-3 mb-3 bg-gray-50 rounded-lg">
                        <div className="shrink-0 w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {getInitials(userName)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate">
                                {userName || "Usuario"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {email || "email@ejemplo.com"}
                            </p>
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            sessionStorage.removeItem("user");
                            window.location.href = "/";
                        }}
                        className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 font-medium transition-all duration-200 hover:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
                        </svg>
                        Cerrar Sesión
                    </button>
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
                    <div className="text-xs text-gray-500 text-center">
                        © {new Date().getFullYear()} Itinietravel
                    </div>
                </div>
            </aside>
        </>
    );
}