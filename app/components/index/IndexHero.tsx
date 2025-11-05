"use client";

import React, { useState, useEffect } from 'react';

export default function IndexHeader() {
  const [displayedText, setDisplayedText] = useState('');
  const [boldDisplayedText, setBoldDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [boldIndex, setBoldIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [counters, setCounters] = useState({ patients: 0, doctors: 0, satisfaction: 0 });
  
  const fullText = 'Gestiona tus citas médicas de forma ';
  const boldText = 'inteligente';
  
  useEffect(() => {
    setIsVisible(true);
  }, []);
  
  // Typewriter effect for main text
  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    } else if (currentIndex === fullText.length) {
      const timeout = setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);
  
  // Typewriter effect for bold text
  useEffect(() => {
    if (currentIndex > fullText.length && boldIndex < boldText.length) {
      const timeout = setTimeout(() => {
        setBoldDisplayedText(prev => prev + boldText[boldIndex]);
        setBoldIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, boldIndex]);
  
  // Counter animation
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = duration / steps;
    
    const targets = { patients: 10000, doctors: 500, satisfaction: 98 };
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      
      setCounters({
        patients: Math.floor(targets.patients * progress),
        doctors: Math.floor(targets.doctors * progress),
        satisfaction: Math.floor(targets.satisfaction * progress)
      });
      
      if (step >= steps) {
        clearInterval(timer);
        setCounters(targets);
      }
    }, increment);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="relative min-h-screen bg-white py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-20 grid lg:grid-cols-2 gap-12 items-center">
        {/* Content */}
        <div className="h-full flex flex-col justify-start md:justify-center">
          <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight min-h-60">
            {displayedText}
            {currentIndex < fullText.length && <span className="animate-pulse">|</span>}
            {currentIndex > fullText.length && (
              <span className="bg-linear-to-r from-blue-600 to-blue-900 bg-clip-text text-transparent">
                {boldDisplayedText}
                {boldIndex < boldText.length && <span className="animate-pulse">|</span>}
              </span>
            )}
          </h2>
          
          <p 
            className={`text-xl text-slate-600 leading-relaxed max-w-xl transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '100ms' }}
          >
            Simplifica la programación y el seguimiento de tus citas médicas con nuestra plataforma intuitiva y profesional.
          </p>
          
          <div 
            className={`pt-4 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '200ms' }}
          >
            <button className="bg-blue-900 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition-all duration-200 hover:shadow-blue-900/40 font-semibold text-lg hover:cursor-pointer" onClick={() => window.location.href = '/register'}>
              Regístrate Gratis
            </button>
          </div>

          {/* Trust Indicators */}
          <div 
            className={`flex items-center gap-8 pt-8 border-t mt-3 border-slate-200 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: '1200ms' }}
          >
            <div>
              <div className="text-3xl font-bold text-slate-900">
                {counters.patients >= 1000 ? `${(counters.patients / 1000).toFixed(0)}K+` : counters.patients}
              </div>
              <div className="text-sm text-slate-600">Pacientes</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{counters.doctors}+</div>
              <div className="text-sm text-slate-600">Médicos</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-slate-900">{counters.satisfaction}%</div>
              <div className="text-sm text-slate-600">Satisfacción</div>
            </div>
          </div>
        </div>

        {/* Image */}
        <div 
          className={`hidden lg:block relative transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-10 scale-95'
          }`}
          style={{ transitionDelay: '600ms' }}
        >
          <div className="absolute inset-0 bg-linear-to-tr from-blue-600/20 to-transparent rounded-3xl"></div>
          <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=900&fit=crop" 
              alt="Consulta médica profesional"
              className="w-full h-[600px] object-cover"
            />
            
            {/* Floating Card */}
            <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-slate-900">Cita confirmada</div>
                  <div className="text-sm text-slate-600">Próxima cita: 15 Nov, 10:00 AM</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}