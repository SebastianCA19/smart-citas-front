"use client";
import { useState, useEffect, useRef } from "react";

export default function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false);
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

  const steps = [
    {
      number: "01",
      title: "Regístrate",
      description: "Crea tu cuenta en minutos con tu información básica. Es completamente gratis y seguro.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      number: "02",
      title: "Programa tu Cita",
      description: "Busca médicos disponibles, selecciona la fecha y hora que mejor te convenga, y confirma tu cita.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      number: "03",
      title: "Asiste a tu Consulta",
      description: "Recibe recordatorios automáticos y accede a toda la información de tu cita desde cualquier lugar.",
      icon: (
        <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-linear-to-b from-slate-50 to-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-20">
        {/* Header */}
        <div className={`text-center mb-20 transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            ¿Cómo funciona?
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Tres simples pasos para comenzar a gestionar tus citas médicas de manera eficiente
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-12 lg:gap-16">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex flex-col items-center text-center transition-all duration-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${200 + index * 200}ms` }}
            >
              {/* Number Badge */}
              <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg mb-6">
                {step.number}
              </div>

              {/* Icon */}
              <div className="text-blue-900 mb-6">
                {step.icon}
              </div>

              {/* Title */}
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {step.title}
              </h3>

              {/* Description */}
              <p className="text-slate-600 leading-relaxed max-w-sm">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}