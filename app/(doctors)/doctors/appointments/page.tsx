"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import AppointmentCard from "@/app/components/doctors/AppointmentCard";
import { AppointmentDoc } from "@/app/components/types/AppointmentDoc";
import MedicalRecordModal from "@/app/components/doctors/MedicalRecordModal";

export default function DocAppointmentPage() {
  const [appointments, setAppointments] = useState<AppointmentDoc[]>([]);
  const [filteredAppointments, setFilteredAppointments] = useState<AppointmentDoc[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchCedula, setSearchCedula] = useState("");
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDoc | null>(null);

  useEffect(() => {
    const userDataStr = sessionStorage.getItem('user');
    if (!userDataStr) {
      toast.error('No se encontró información de usuario. Por favor inicie sesión.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return;
    }

    const userData = JSON.parse(userDataStr);
    fetchAppointments(userData.idUsuario);
  }, []);

  useEffect(() => {
    // Filter appointments by patient cedula
    if (searchCedula.trim() === "") {
      setFilteredAppointments(appointments);
    } else {
      const filtered = appointments.filter(apt => 
        apt.idPatient.toString().includes(searchCedula)
      );
      setFilteredAppointments(filtered);
    }
  }, [searchCedula, appointments]);

  const fetchAppointments = async (doctorCedula: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8082/api/appointment/doctor/${doctorCedula}/details`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setAppointments([]);
          setFilteredAppointments([]);
          setIsLoading(false);
          return;
        }
        throw new Error('Error al cargar las citas');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const parsedAppointments = data.map((apt: any) => {
          let patientName = apt.patientName;

          if (typeof patientName === 'string' && patientName.startsWith('{')) {
            try {
              const patientObj = JSON.parse(patientName);
              patientName = `${patientObj.nombre} ${patientObj.primerApellido}${patientObj.segundoApellido ? ' ' + patientObj.segundoApellido : ''}`.trim();
            } catch (e) {
              console.error('Error parsing patient name:', e);
            }
          }

          return { ...apt, patientName };
        });

        // Sort by date (most recent first)
        parsedAppointments.sort((a: AppointmentDoc, b: AppointmentDoc) => {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

        setAppointments(parsedAppointments);
        setFilteredAppointments(parsedAppointments);
      } else {
        setAppointments([]);
        setFilteredAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error al cargar las citas');
      setAppointments([]);
      setFilteredAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-900 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-600 text-lg">Cargando citas...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Mis Citas Médicas
          </h1>
          <p className="text-slate-600">
            Gestiona las citas de tus pacientes e historias clínicas
          </p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-xl shadow-md border-2 border-slate-200">
          <div className="flex items-center gap-3">
            <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={searchCedula}
              onChange={(e) => setSearchCedula(e.target.value)}
              placeholder="Buscar por cédula del paciente..."
              className="flex-1 outline-none text-slate-900"
            />
            {searchCedula && (
              <button
                onClick={() => setSearchCedula("")}
                className="text-slate-400 hover:text-slate-600"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Results Count */}
        {searchCedula && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <p className="text-blue-900 font-semibold">
              {filteredAppointments.length} cita{filteredAppointments.length !== 1 ? 's' : ''} encontrada{filteredAppointments.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Appointments List */}
        {filteredAppointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              {searchCedula ? 'No se encontraron citas' : 'No tienes citas programadas'}
            </h2>
            <p className="text-slate-600 text-lg">
              {searchCedula 
                ? 'No hay citas para el paciente con esa cédula' 
                : 'Las citas de tus pacientes aparecerán aquí'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredAppointments.map((appointment) => (
              <AppointmentCard
                key={appointment.id}
                appointment={appointment}
                onViewRecord={(apt) => setSelectedAppointment(apt)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Medical Record Modal */}
      {selectedAppointment && (
        <MedicalRecordModal
          appointment={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </>
  );
}