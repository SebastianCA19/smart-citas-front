"use client";
import { useState, useEffect, useRef } from "react";

export default function ForPatientsDocsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("patients");
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const patientsBenefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Ahorra Tiempo",
      description: "Programa tus citas en segundos sin necesidad de llamar o esperar en línea."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
      ),
      title: "Organización Total",
      description: "Mantén un registro completo de todas tus citas médicas en un solo lugar."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
      title: "Recordatorios",
      description: "Recibe notificaciones automáticas antes de cada cita para no olvidar ninguna consulta."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Acceso Móvil",
      description: "Gestiona tus citas desde cualquier dispositivo, en cualquier momento y lugar."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Seguridad",
      description: "Tu información médica está protegida con los más altos estándares de seguridad."
    },
  ];

  const doctorsBenefits = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      title: "Gestión de Agenda",
      description: "Controla tu calendario médico con herramientas intuitivas y eficientes."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Base de Pacientes",
      description: "Accede fácilmente al historial y datos de tus pacientes de forma organizada."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Reducción de Ausencias",
      description: "Los recordatorios automáticos ayudan a disminuir las citas perdidas."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Documentación Digital",
      description: "Mantén todos los registros médicos digitalizados y siempre accesibles."
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Mayor Eficiencia",
      description: "Optimiza tu tiempo y dedícalo a lo que realmente importa: tus pacientes."
    }
  ];

  const currentBenefits = activeTab === "patients" ? patientsBenefits : doctorsBenefits;

  return (
    <section ref={sectionRef} className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className={`text-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Beneficios para todos
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Descubre cómo Smart Citas facilita la gestión médica para pacientes y profesionales
          </p>
        </div>

        {/* Tabs */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '200ms' }}>
          <div className="inline-flex bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setActiveTab("patients")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "patients"
                  ? "bg-blue-900 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Para Pacientes
            </button>
            <button
              onClick={() => setActiveTab("doctors")}
              className={`px-8 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === "doctors"
                  ? "bg-blue-900 text-white shadow-lg"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Para Médicos
            </button>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentBenefits.map((benefit, index) => (
            <div
              key={`${activeTab}-${index}`}
              className={`bg-slate-50 p-6 rounded-xl transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${400 + index * 100}ms` }}
            >
              <div className="w-14 h-14 bg-blue-100 rounded-lg flex items-center justify-center text-blue-900 mb-4">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>

        <div className={`w-full h-fit flex flex-row items-center mt-30 justify-center transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        style={{ transitionDelay: '600ms' }}>
            <div className="flex flex-col items-center">
                <h3 className="bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent text-2xl lg:text-3xl font-bold mb-4">
                    ¿Qué esperas para empezar a gestionar tus citas con nosotros?
                </h3>
                <p className="text-xl text-slate-600 mb-8">
                    ¡Empieza ya!    
                </p>
                <button className="bg-blue-900 text-white px-5 py-4 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-xl font-semibold text-lg hover:cursor-pointer" onClick={() => window.location.href = '/register'}>
                    Crear Cuenta Gratis
                </button>
            </div>
        </div>
      </div>
    </section>
  );
}