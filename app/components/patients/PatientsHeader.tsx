"use client";
import { useEffect, useState } from "react";

export default function PatientsHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userName, setUserName] = useState("John Doe");

  const handleUserName = () =>{
    const userData = sessionStorage.getItem('user');
    if(userData){
      const user = JSON.parse(userData);
      setUserName(user.nombre + " " + user.primerApellido);
    }
  }

  const getUserInitials = () => {
    const names = userName.split(" ");
    const initials = names.map((n: string) => n.charAt(0).toUpperCase()).join("");
    return initials;
  }

  useEffect(() => {
    handleUserName();
  }, []);  

  return (
    <>
      <header className="w-full flex flex-row justify-between items-center px-6 lg:px-20 py-4 bg-white sticky top-0 z-50 shadow-md">
        {/* Logo */}
        <h1 className="text-2xl lg:text-3xl font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent hover:cursor-pointer" onClick= {() => window.location.href = '/patients'}>
          Smart Citas
        </h1>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <a
            href="/patients/appohistory"
            className="text-slate-700 hover:text-blue-900 font-medium transition-colors"
          >
            Ver Historial de Citas
          </a>
          <a
            href="/"
            className="text-slate-700 hover:text-blue-900 font-medium transition-colors"
          >
            Ver Historias Clínicas
          </a>
          <a
            href="/patients/appointment"
            className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 font-semibold"
          >
            Agendar Cita
          </a>
          
          {/* Profile */}
          <a href="/profile" className="ml-2">
            <div className="w-10 h-10 bg-linear-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all duration-200">
              {getUserInitials()}
            </div>
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden p-2 text-slate-700 hover:text-blue-900 transition-colors"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </header>

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsMenuOpen(false)}
      >
        <nav
          className={`fixed top-0 left-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Sidebar Header */}
          <div className="p-6 border-b border-slate-200">
            <h2 className="text-2xl font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
              Smart Citas
            </h2>
          </div>

          {/* Profile Section */}
          <div className="p-6 border-b border-slate-200">
            <a href="/profile" className="flex items-center gap-4 hover:bg-slate-50 p-3 rounded-lg transition-colors">
              <div className="w-12 h-12 bg-linear-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white font-semibold">
                {getUserInitials()}
              </div>
              <div>
                <p className="font-semibold text-slate-900">{userName}</p>
                <p className="text-sm text-slate-600">Ver perfil</p>
              </div>
            </a>
          </div>

          {/* Navigation Links */}
          <div className="p-6 space-y-2">
            <a
              href="/patients/appointment"
              className="flex items-center gap-3 px-4 py-3 bg-blue-900 text-white rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 font-semibold"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Agendar Cita
            </a>
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Ver Historial de Citas
            </a>
            <a
              href="/"
              className="flex items-center gap-3 px-4 py-3 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Ver Historias Clínicas
            </a>
          </div>

          {/* Logout Button */}
          <div className="absolute bottom-6 left-6 right-6">
            <a
              href="/"
              className="flex items-center justify-center gap-2 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Cerrar Sesión
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}