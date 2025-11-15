"use client";

import React, { useState, useEffect } from "react";
import AppointmentCard from "@/app/components/patients/AppointmentCard";
import AppointmentInfoCard from "@/app/components/patients/AppointmentInfoCard";
import { Appointment } from "@/app/components/types/Appointment";
import { Toaster, toast } from "react-hot-toast";

interface AppointmentCardProps {
    appointment: Appointment;
    onClick?: (appointment: Appointment) => void;
}

export default function PatientsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userCedula, setUserCedula] = useState<number | null>(null);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Get user data from sessionStorage
    const userDataStr = sessionStorage.getItem('user');
    if (!userDataStr) {
      toast.error('No se encontró información de usuario. Por favor inicie sesión.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return;
    }

    const userData = JSON.parse(userDataStr);
    setUserCedula(userData.idUsuario);
    
    // Fetch appointments for this patient
    fetchAppointments(userData.idUsuario);
  }, []);

  const fetchAppointments = async (cedula: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8082/api/appointment/patient/${cedula}/details`);
      if (!response.ok) {
        if (response.status === 404) {
          // No appointments found
          setAppointments([]);
          return;
        }
        throw new Error('Error al cargar las citas');
      }

      const data = await response.json();
      setAppointments(data);
      
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Error al cargar las citas');
      setAppointments([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppointmentClick = (appointment: Appointment): void => {
    setSelectedAppointment(appointment);
  };

  const handleConfirm = (appointment: Appointment): void => {
    toast.success(`Asistencia confirmada para: ${appointment.appointmentTypeName}`);
    // Here you can add API call to confirm the appointment if needed
  };

  const handleCancel = async (appointment: Appointment): Promise<void> => {
    // Check if appointment is less than 24 hours ahead
    const appointmentDate = new Date(appointment.date);
    const now = new Date();
    const hoursDiff = (appointmentDate.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (hoursDiff < 24 && hoursDiff > 0) {
      toast.error('No se puede cancelar la cita con menos de 24 horas de anticipación');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8082/api/appointment/${appointment.id}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        throw new Error('Error al cancelar la cita');
      }

      toast.success(`Cita cancelada: ${appointment.appointmentTypeName}`);
      
      // Refresh appointments list
      if (userCedula) {
        fetchAppointments(userCedula);
      }
      
      // Clear selected appointment
      setSelectedAppointment(null);
      
    } catch (error) {
      console.error('Error canceling appointment:', error);
      toast.error('Error al cancelar la cita');
    }
  };

  const handleCloseModal = (): void => {
    setSelectedAppointment(null);
  };

  if (isLoading) {
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="min-h-screen bg-slate-50 p-6 lg:p-10 flex items-center justify-center">
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
      <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-blue-900 border-b-2 border-b-neutral-200 pb-4">
            Citas Pendientes
          </h1>
          <a
            href="/patients/appointment"
            className="bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg font-semibold"
          >
            + Agendar Nueva Cita
          </a>
        </div>

        {appointments.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              No tienes citas pendientes
            </h2>
            <p className="text-slate-600 mb-6 text-lg">
              Agenda tu primera cita médica para comenzar
            </p>
            <a
              href="/patients/appointment"
              className="inline-block bg-blue-900 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg font-semibold text-lg"
            >
              Agendar Cita
            </a>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Appointments List */}
            <div className="space-y-4">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                  onClick={handleAppointmentClick}
                />
              ))}
            </div>

            {/* Right Column - Appointment Info (Desktop only) */}
            <div className="hidden lg:block sticky top-32 h-fit">
              <AppointmentInfoCard
                appointment={selectedAppointment}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
              />
            </div>
          </div>
        )}

        {/* Mobile Modal */}
        {isMobile && selectedAppointment && (
          <AppointmentInfoCard
            appointment={selectedAppointment}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            onClose={handleCloseModal}
            isMobile={true}
          />
        )}
      </div>
    </>
  );
}