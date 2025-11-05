"use client";

import React, { useState, useEffect } from "react";
import AppointmentCard from "@/app/components/patients/AppointmentCard";
import AppointmentInfoCard from "@/app/components/patients/AppointmentInfoCard";
import { Appointment } from "@/app/components/types/Appointment";

interface AppointmentCardProps {
    appointment: Appointment;
    onClick?: (appointment: Appointment) => void;
}

export default function PatientsPage() {
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const appointments: Appointment[] = [
    {
      id: "1",
      title: "Cita de Laboratorio",
      doctorName: "Dr. Juan Pérez",
      patientName: "María González",
      clinic: "Clínica Central",
      date: "17/09/2025",
      time: "08:00 A.M"
    },
    {
      id: "2",
      title: "Consulta General",
      doctorName: "Dra. Ana Martínez",
      patientName: "María González",
      clinic: "Hospital San José",
      date: "20/09/2025",
      time: "10:30 A.M"
    },
    {
      id: "3",
      title: "Control Cardiológico",
      doctorName: "Dr. Carlos Rodríguez",
      patientName: "María González",
      clinic: "Centro Médico Norte",
      date: "25/09/2025",
      time: "02:00 P.M"
    },
    {
      id: "4",
      title: "Examen de Radiología",
      doctorName: "Dra. Laura Sánchez",
      patientName: "María González",
      clinic: "Centro de Imágenes Médicas",
      date: "28/09/2025",
      time: "09:15 A.M"
    },
    {
      id: "5",
      title: "Control Nutricional",
      doctorName: "Dr. Roberto Silva",
      patientName: "María González",
      clinic: "Centro de Nutrición Integral",
      date: "30/09/2025",
      time: "11:45 A.M"
    }
  ];

  const handleAppointmentClick = (appointment: Appointment): void => {
    setSelectedAppointment(appointment);
  };

  const handleConfirm = (appointment: Appointment): void => {
    console.log("Confirmed:", appointment);
    alert(`Cita confirmada: ${appointment.title}`);
  };

  const handleCancel = (appointment: Appointment): void => {
    console.log("Cancelled:", appointment);
    alert(`Cita cancelada: ${appointment.title}`);
  };

  const handleCloseModal = (): void => {
    setSelectedAppointment(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
      <h1 className="text-3xl font-bold text-blue-900 w-full border-b-2 border-b-neutral-200 pb-4 mb-6">
        Citas Pendientes
      </h1>

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
        <div className="hidden lg:block sticky top-30 h-fit">
            <AppointmentInfoCard
                appointment={selectedAppointment}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </div>
      </div>

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
  );
}