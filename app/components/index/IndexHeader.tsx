"use client";

import React from 'react';

export default function IndexHeader() {

  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const header = document.querySelector('header.sticky') as HTMLElement | null;

    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setScrolled(!atTop);
      if (header) {
        if (atTop) header.classList.remove('shadow-md');
        else header.classList.add('shadow-md');
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`w-full flex flex-row justify-between items-center px-6 lg:px-20 py-6 bg-white sticky top-0 z-50 ${scrolled ? 'shadow-md' : ''}`}>
      <h1 className="text-3xl font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent">
        Smart Citas
      </h1>
      <div className="flex flex-row gap-4 items-center justify-center">
        <a href="/login" className="text-slate-700 hover:text-blue-900 font-medium transition-colors hover:underline hover:underline-offset-2">
          Iniciar Sesión
        </a>
        <a href="/register" className="bg-blue-900 border-2 border-blue-900 text-white px-6 py-2.5 rounded-lg hover:bg-white hover:text-blue-900 transition-all duration-200 shadow-lg shadow-blue-900/20 font-medium">
          Registrarse
        </a>
      </div>
    </header>
  );
}