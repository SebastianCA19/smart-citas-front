"use client";

import React, { useState } from "react";
import {Toaster, toast} from "react-hot-toast";

// Types
interface Doctor {
  id: string;
  name: string;
  schedule: string[];
}

interface AppointmentType {
  id: string;
  name: string;
}

interface Clinic {
  id: string;
  name: string;
}

type DoctorsByType = {
  [key: string]: Doctor[];
}

// Simulated data structures
const appointmentTypes: AppointmentType[] = [
  { id: "general", name: "Consulta General" },
  { id: "cardiology", name: "Cardiología" },
  { id: "dermatology", name: "Dermatología" },
  { id: "laboratory", name: "Laboratorio" },
  { id: "radiology", name: "Radiología" }
];

const doctorsByType: DoctorsByType = {
  general: [
    { id: "dr1", name: "Dr. Juan Pérez", schedule: ["09:00", "10:00", "11:00", "14:00", "15:00"] },
    { id: "dr2", name: "Dra. Ana Martínez", schedule: ["08:00", "09:00", "10:00", "16:00", "17:00"] }
  ],
  cardiology: [
    { id: "dr3", name: "Dr. Carlos Rodríguez", schedule: ["09:00", "11:00", "14:00", "16:00"] },
    { id: "dr4", name: "Dra. María González", schedule: ["10:00", "12:00", "15:00", "17:00"] }
  ],
  dermatology: [
    { id: "dr5", name: "Dr. Roberto Silva", schedule: ["08:00", "09:00", "10:00", "11:00"] },
    { id: "dr6", name: "Dra. Laura Sánchez", schedule: ["14:00", "15:00", "16:00", "17:00"] }
  ],
  laboratory: [
    { id: "dr7", name: "Dr. Pedro Ramírez", schedule: ["07:00", "08:00", "09:00", "10:00"] }
  ],
  radiology: [
    { id: "dr8", name: "Dra. Carmen López", schedule: ["08:00", "10:00", "12:00", "14:00"] }
  ]
};

const clinics: Clinic[] = [
  { id: "clinic_a", name: "Clínica Central" },
  { id: "clinic_b", name: "Hospital San José" },
  { id: "clinic_c", name: "Centro Médico Norte" }
];

export default function AppointmentPage() {
  const [appointmentType, setAppointmentType] = useState<string>("");
  const [selectedDoctor, setSelectedDoctor] = useState<string>("");
  const [selectedClinic, setSelectedClinic] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [availableDoctors, setAvailableDoctors] = useState<Doctor[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value;
    setAppointmentType(type);
    setSelectedDoctor("");
    setSelectedTime("");
    setAvailableTimes([]);
    
    if (type) {
      setAvailableDoctors(doctorsByType[type] || []);
      toast.success("Tipo de cita seleccionado");
    } else {
      setAvailableDoctors([]);
    }
  };

  const handleDoctorChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorId = e.target.value;
    setSelectedDoctor(doctorId);
    setSelectedTime("");
    
    if (doctorId && selectedDate) {
      const doctor = availableDoctors.find(d => d.id === doctorId);
      setAvailableTimes(doctor?.schedule || []);
    }
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setSelectedDate(date);
    setSelectedTime("");
    
    if (selectedDoctor && date) {
      const doctor = availableDoctors.find(d => d.id === selectedDoctor);
      setAvailableTimes(doctor?.schedule || []);
    }
  };

  const handleSubmit = () => {
    // Validation
    if (!appointmentType) {
      toast.error("Por favor seleccione el tipo de cita");
      return;
    }
    if (!selectedDoctor) {
      toast.error("Por favor seleccione un doctor");
      return;
    }
    if (!selectedClinic) {
      toast.error("Por favor seleccione una clínica");
      return;
    }
    if (!selectedDate) {
      toast.error("Por favor seleccione una fecha");
      return;
    }
    if (!selectedTime) {
      toast.error("Por favor seleccione una hora");
      return;
    }

    // Check if date is in the past
    const appointmentDate = new Date(`${selectedDate}T${selectedTime}`);
    if (appointmentDate < new Date()) {
      toast.error("La fecha y hora no pueden ser en el pasado");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("¡Cita agendada exitosamente!");
      
      // Reset 
      setAppointmentType("");
      setSelectedDoctor("");
      setSelectedClinic("");
      setSelectedDate("");
      setSelectedTime("");
      setAvailableDoctors([]);
      setAvailableTimes([]);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
      />
    <div className="px-4 py-2 rounded-xl w-fit z-40 fixed top-24 left-6 lg:left-20 hidden md:flex items-center gap-2 text-blue-900 font-medium mb-6 bg-white transition-all duration-200 transform hover:scale-105 hover:bg-linear-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white hover:shadow-lg hover:shadow-blue-300 hover:ring-2 hover:ring-blue-200/70 focus:outline-none focus:ring-4 focus:ring-blue-200/40 cursor-pointer">
        {/* Back Button */}
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
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">
              Agendar Nueva Cita
            </h1>
            <p className="text-slate-600">
              Complete el formulario para programar su cita médica
            </p>
          </div>

          {/* Card */}
          <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
            <div className="space-y-6">
              {/* Appointment Type */}
              <div>
                <label htmlFor="appointmentType" className="block text-sm font-semibold text-slate-700 mb-2">
                  Tipo de Cita <span className="text-red-500">*</span>
                </label>
                <select
                  id="appointmentType"
                  value={appointmentType}
                  onChange={handleTypeChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Seleccione el tipo de cita</option>
                  {appointmentTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>

              {/* Doctor Selection */}
              <div>
                <label htmlFor="doctor" className="block text-sm font-semibold text-slate-700 mb-2">
                  Doctor <span className="text-red-500">*</span>
                </label>
                <select
                  id="doctor"
                  value={selectedDoctor}
                  onChange={handleDoctorChange}
                  disabled={!appointmentType}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {appointmentType ? "Seleccione un doctor" : "Primero seleccione el tipo de cita"}
                  </option>
                  {availableDoctors.map(doctor => (
                    <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                  ))}
                </select>
              </div>

              {/* Clinic Selection */}
              <div>
                <label htmlFor="clinic" className="block text-sm font-semibold text-slate-700 mb-2">
                  Clínica <span className="text-red-500">*</span>
                </label>
                <select
                  id="clinic"
                  value={selectedClinic}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedClinic(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="">Seleccione una clínica</option>
                  {clinics.map(clinic => (
                    <option key={clinic.id} value={clinic.id}>{clinic.name}</option>
                  ))}
                </select>
              </div>

              {/* Date and Time Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Date */}
                <div>
                  <label htmlFor="date" className="block text-sm font-semibold text-slate-700 mb-2">
                    Fecha <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={selectedDate}
                    onChange={handleDateChange}
                    min={new Date().toISOString().split('T')[0]}
                    disabled={!selectedDoctor}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                </div>

                {/* Time */}
                <div>
                  <label htmlFor="time" className="block text-sm font-semibold text-slate-700 mb-2">
                    Hora <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="time"
                    value={selectedTime}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedTime(e.target.value)}
                    disabled={!selectedDate || availableTimes.length === 0}
                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                  >
                    <option value="">
                      {!selectedDate ? "Primero seleccione una fecha" : 
                       availableTimes.length === 0 ? "No hay horarios disponibles" : 
                       "Seleccione una hora"}
                    </option>
                    {availableTimes.map(time => (
                      <option key={time} value={time}>{time}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Info Box */}
              {selectedDoctor && selectedDate && availableTimes.length > 0 && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">Horarios disponibles</h4>
                      <p className="text-sm text-blue-700">
                        El doctor tiene {availableTimes.length} horarios disponibles para la fecha seleccionada
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-blue-900 text-white px-6 py-4 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Agendando...
                    </span>
                  ) : (
                    "Agendar Cita"
                  )}
                </button>
              </div>

              {/* Helper Text */}
              <p className="text-sm text-slate-500 text-center italic">
                Las citas no se pueden cancelar 24 horas antes de la fecha estipulada
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}