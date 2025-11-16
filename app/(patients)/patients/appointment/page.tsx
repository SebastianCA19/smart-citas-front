"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

interface AppointmentType {
  id: number;
  nombre: string;
}

interface Place {
  id: number;
  nombre: string;
}

interface Procedure {
  id: number;
  procedimiento: string;
}

interface Doctor {
  cedula: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  estado: number;
}

interface Catalogs {
  appointmentTypes: AppointmentType[];
  places: Place[];
  procedures: Procedure[];
}

export default function AppointmentPage() {
  const [idTipoCita, setIdTipoCita] = useState<number>(0);
  const [idMedico, setIdMedico] = useState<number>(0);
  const [idLugar, setIdLugar] = useState<number>(0);
  const [idProcedimiento, setIdProcedimiento] = useState<number>(0);
  const [fecha, setFecha] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<string>("");
  
  const [catalogs, setCatalogs] = useState<Catalogs>({
    appointmentTypes: [],
    places: [],
    procedures: []
  });
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userCedula, setUserCedula] = useState<number | null>(null);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);

  const procedureByAppointmentType: Record<number, number> = {
    1: 1,
    2: 3,
    3: 2,
    4: 4
  };


  // Generate time slots from 7 AM to 5 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 17; hour++) {
      slots.push(`${hour.toString().padStart(2, '0')}:00`);
      if (hour < 17) {
        slots.push(`${hour.toString().padStart(2, '0')}:30`);
      }
    }
    return slots;
  };

  // Fetch appointments for selected doctor and date
  const fetchDoctorAppointments = async (doctorCedula: number, date: string) => {
    try {
      const response = await fetch(
        `http://localhost:8082/api/appointment/doctor/${doctorCedula}/details?date=${date}`
      );

      if (!response.ok) return [];

      const data = await response.json();

      return data.map((apt: any) => apt.date.substring(11, 16)); // HH:mm

    } catch {
      return [];
    }
  };


  useEffect(() => {}, [userCedula]);

  useEffect(() => {
    // Get user data from sessionStorage
    const userDataStr = sessionStorage.getItem('user');
    console.log('User data from sessionStorage:', userDataStr);
    if (!userDataStr) {
      toast.error('No se encontró información de usuario. Por favor inicie sesión.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return;
    }

    const userData = JSON.parse(userDataStr);
    setUserCedula(userData.idUsuario);
    
    // Fetch catalogs and doctors
    fetchCatalogs();
    fetchDoctors();
  }, []);

  const fetchCatalogs = async () => {
    try {
      const response = await fetch('http://localhost:8082/api/appointment/catalogs');
      
      if (!response.ok) {
        throw new Error('Error al cargar los catálogos');
      }

      const data = await response.json();
      setCatalogs(data);
      
    } catch (error) {
      console.error('Error fetching catalogs:', error);
      toast.error('Error al cargar los catálogos');
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:8081/api/doctors/');
      
      if (!response.ok) {
        throw new Error('Error al cargar los doctores');
      }

      const data = await response.json();
      setDoctors(data.filter((doc: Doctor) => doc.estado === 1)); // Only active doctors
      
    } catch (error) {
      console.error('Error fetching doctors:', error);
      toast.error('Error al cargar los doctores');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppointmentTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = parseInt(e.target.value);
    setIdTipoCita(typeId);

    const procedureId = procedureByAppointmentType[typeId] || 0;
    setIdProcedimiento(procedureId);
  }

  const handleDateChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const date = e.target.value;
    setFecha(date);
    setSelectedTime("");
    
    if (date && idMedico) {
      // Fetch booked times for this doctor on this date
      const booked = await fetchDoctorAppointments(idMedico, date);
      setBookedTimes(booked);
      
      // Generate all time slots and filter out booked ones
      const allSlots = generateTimeSlots();
      const available = allSlots.filter(slot => !booked.includes(slot));
      setAvailableTimes(available);
    } else {
      setAvailableTimes([]);
      setBookedTimes([]);
    }
  };

  const handleDoctorChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const doctorCedula = parseInt(e.target.value);
    setIdMedico(doctorCedula);
    setSelectedTime("");
    
    if (doctorCedula && fecha) {
      // Fetch booked times for this doctor on the selected date
      const booked = await fetchDoctorAppointments(doctorCedula, fecha);
      setBookedTimes(booked);
      
      // Generate all time slots and filter out booked ones
      const allSlots = generateTimeSlots();
      const available = allSlots.filter(slot => !booked.includes(slot));
      setAvailableTimes(available);
    } else {
      setAvailableTimes([]);
      setBookedTimes([]);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!idTipoCita) {
      toast.error("Por favor seleccione el tipo de cita");
      return;
    }
    if (!idProcedimiento) {
      toast.error("Por favor seleccione un procedimiento");
      return;
    }
    if (!idLugar) {
      toast.error("Por favor seleccione un lugar");
      return;
    }
    if (!idMedico) {
      toast.error("Por favor seleccione un médico");
      return;
    }
    if (!fecha) {
      toast.error("Por favor seleccione una fecha");
      return;
    }
    if (!selectedTime) {
      toast.error("Por favor seleccione una hora");
      return;
    }

    // Create timestamp in format YYYY-MM-DDTHH:mm:ss
    const appointmentTimestamp = `${fecha}T${selectedTime}:00`;
    const appointmentDateTime = new Date(appointmentTimestamp);
    
    // Check if date is in the past
    if (appointmentDateTime < new Date()) {
      toast.error("La fecha y hora no pueden ser en el pasado");
      return;
    }

    if (!userCedula) {
      toast.error("No se encontró la información del usuario");
      return;
    }

    setIsSubmitting(true);

    try {
      const appointmentData = {
        idAppointmentType: idTipoCita,
        idPlace: idLugar,
        idProcedure: idProcedimiento,
        idDoctor: idMedico,
        idNurse: null, // Keeping it null for now
        idPatient: userCedula,
        date: appointmentTimestamp
      };

      const response = await fetch('http://localhost:8082/api/appointment/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData)
      });

      if (!response.ok) {
        throw new Error('Error al agendar la cita');
      }

      const result = await response.json();
      toast.success("¡Cita agendada exitosamente!");
      
      // Reset form
      setIdTipoCita(0);
      setIdMedico(0);
      setIdLugar(0);
      setIdProcedimiento(0);
      setFecha("");
      setSelectedTime("");
      setAvailableTimes([]);
      
      // Redirect to appointments page after 1.5 seconds
      setTimeout(() => {
        window.location.href = '/patients';
      }, 1500);
      
    } catch (error) {
      console.error('Error creating appointment:', error);
      toast.error('Error al agendar la cita. Por favor, intente de nuevo.');
    } finally {
      setIsSubmitting(false);
    }
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
            <p className="text-slate-600 text-lg">Cargando información...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="px-4 py-2 rounded-xl w-fit z-50 fixed top-24 left-6 lg:left-20 hidden md:flex items-center gap-2 text-blue-900 font-medium mb-6 bg-white transition-all duration-200 transform hover:scale-105 hover:bg-linear-to-r hover:from-blue-600 hover:to-blue-800 hover:text-white hover:shadow-lg hover:shadow-blue-300 hover:ring-2 hover:ring-blue-200/70 focus:outline-none focus:ring-4 focus:ring-blue-200/40 cursor-pointer">
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
                <label htmlFor="idTipoCita" className="block text-sm font-semibold text-slate-700 mb-2">
                  Tipo de Cita <span className="text-red-500">*</span>
                </label>
                <select
                  id="idTipoCita"
                  value={idTipoCita}
                  onChange={handleAppointmentTypeChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="0">Seleccione el tipo de cita</option>
                  {catalogs.appointmentTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Procedure */}
              <div>
                <label htmlFor="idProcedimiento" className="block text-sm font-semibold text-slate-700 mb-2">
                  Procedimiento <span className="text-red-500">*</span>
                </label>
                <select
                  id="idProcedimiento"
                  value={idProcedimiento}
                  disabled
                  className="w-full px-4 py-3 border-2 bg-gray-100/75 cursor-not-allowed border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="0">Seleccione un procedimiento</option>
                  {catalogs.procedures.map(proc => (
                    <option key={proc.id} value={proc.id}>{proc.procedimiento}</option>
                  ))}
                </select>
              </div>

              {/* Place */}
              <div>
                <label htmlFor="idLugar" className="block text-sm font-semibold text-slate-700 mb-2">
                  Lugar <span className="text-red-500">*</span>
                </label>
                <select
                  id="idLugar"
                  value={idLugar}
                  onChange={(e) => setIdLugar(parseInt(e.target.value))}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="0">Seleccione un lugar</option>
                  {catalogs.places.map(place => (
                    <option key={place.id} value={place.id}>{place.nombre}</option>
                  ))}
                </select>
              </div>

              {/* Doctor Selection */}
              <div>
                <label htmlFor="idMedico" className="block text-sm font-semibold text-slate-700 mb-2">
                  Médico <span className="text-red-500">*</span>
                </label>
                <select
                  id="idMedico"
                  value={idMedico}
                  onChange={handleDoctorChange}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
                >
                  <option value="0">Seleccione un médico</option>
                  {doctors.map(doctor => (
                    <option key={doctor.cedula} value={doctor.cedula}>
                      Dr. {doctor.nombre} {doctor.primerApellido} {doctor.segundoApellido}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div>
                <label htmlFor="fecha" className="block text-sm font-semibold text-slate-700 mb-2">
                  Fecha <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  id="fecha"
                  value={fecha}
                  onChange={handleDateChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors"
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
                  onChange={(e) => setSelectedTime(e.target.value)}
                  disabled={!fecha || availableTimes.length === 0}
                  className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:bg-slate-100 disabled:cursor-not-allowed"
                >
                  <option value="">
                    {!fecha ? "Primero seleccione una fecha" : 
                     availableTimes.length === 0 ? "No hay horarios disponibles" : 
                     "Seleccione una hora"}
                  </option>
                  {availableTimes.map(time => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
                <p className="text-xs text-slate-500 mt-2">
                  Horario disponible: 7:00 AM - 5:00 PM
                </p>
              </div>

              {/* Info Box */}
              {fecha && idMedico > 0 && (
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mt-0.5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="text-sm font-semibold text-blue-900 mb-1">Horarios disponibles</h4>
                      <p className="text-sm text-blue-700">
                        {availableTimes.length > 0 
                          ? `Hay ${availableTimes.length} horarios disponibles para la fecha seleccionada`
                          : 'No hay horarios disponibles. El médico tiene todas las horas ocupadas este día.'}
                      </p>
                      {bookedTimes.length > 0 && (
                        <p className="text-xs text-blue-600 mt-1">
                          ({bookedTimes.length} horarios ya están reservados)
                        </p>
                      )}
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