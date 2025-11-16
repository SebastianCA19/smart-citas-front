"use client";

import AppointmentCard from "@/app/components/patients/AppointmentCard";
import { Appointment } from "@/app/components/types/Appointment";
import React, { useEffect, useState } from "react";
import { Toaster, toast } from "react-hot-toast";

export default function AppointmentHistoryPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Get user data from sessionStorage
    const userDataStr = sessionStorage.getItem("user");
    if (!userDataStr) {
      toast.error("No se encontró información de usuario. Por favor inicie sesión.");
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return;
    }

    const userData = JSON.parse(userDataStr);
    fetchAppointments(userData.idUsuario);
  }, []);

  const fetchAppointments = async (cedula: number) => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:8082/api/appointment/patient/${cedula}/details`);

      if (!response.ok) {
        if (response.status === 404) {
          setAppointments([]);
          setIsLoading(false);
          return;
        }
        throw new Error("Error al cargar las citas");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const parsedAppointments = data.map((apt: any) => {
          let doctorName = apt.doctorName;

          // Check if doctorName is a JSON string and parse it
          if (typeof doctorName === "string" && doctorName.startsWith("{")) {
            try {
              const doctorObj = JSON.parse(doctorName);
              doctorName = `${doctorObj.nombre} ${doctorObj.primerApellido}${doctorObj.segundoApellido ? " " + doctorObj.segundoApellido : ""}`.trim();
            } catch (e) {
              console.error('Error parsing doctor name:', e);
            }
          }

          return { ...apt, doctorName };
        });

        // Sort appointments by date (most recent first)
        parsedAppointments.sort((a: Appointment, b: Appointment) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setAppointments(parsedAppointments);
      } else {
        setAppointments([]);
      }
    } catch (err) {
      toast.error("Error al obtener las citas.");
      console.error(err);
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="h-screen w-full flex justify-center items-center bg-slate-50">
          <div className="text-center">
            <div className="flex flex-row gap-2 justify-center mb-4">
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.0s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.3s]"></div>
              <div className="w-4 h-4 rounded-full bg-blue-700 animate-bounce [animation-delay:.6s]"></div>
            </div>
            <p className="text-blue-900 font-medium">
              Cargando historial de citas...
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="px-4 py-2 rounded-xl w-fit z-50 fixed top-24 left-6 lg:left-20 hidden md:flex items-center gap-2 text-blue-900 font-medium mb-6 bg-white transition-all duration-200 transform hover:bg-linear-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white hover:shadow-lg hover:shadow-blue-300 hover:ring-2 hover:ring-blue-200/70 focus:outline-none focus:ring-4 focus:ring-blue-200/40 cursor-pointer">
        <a 
          href="/patients"
          className="flex flex-row items-center gap-2 justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Volver
        </a>
      </div>
      <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">
              Historial de Citas
            </h1>
            <p className="text-slate-600">
              Revisa todas tus citas médicas pasadas y futuras
            </p>
          </div>

          {appointments.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <svg className="w-24 h-24 text-slate-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                No tienes citas registradas
              </h2>
              <p className="text-slate-600 mb-6 text-lg">
                Agenda tu primera cita médica para verla aquí
              </p>
              <a
                href="/patients/appointment"
                className="inline-block bg-blue-900 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg font-semibold text-lg"
              >
                Agendar Cita
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl mb-6">
                <p className="text-blue-900 font-semibold">
                  Total de citas: {appointments.length}
                </p>
              </div>
              
              {appointments.map((appointment) => (
                <AppointmentCard 
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}