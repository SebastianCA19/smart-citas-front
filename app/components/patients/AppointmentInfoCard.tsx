import React from 'react';
import { Appointment } from '../types/Appointment';

interface AppointmentInfoCardProps {
  appointment: Appointment | null;
  onConfirm?: (appointment: Appointment) => void;
  onCancel?: (appointment: Appointment) => void;
  onClose?: () => void;
  isMobile?: boolean;
}

export default function AppointmentInfoCard({ 
  appointment, 
  onConfirm, 
  onCancel, 
  onClose, 
  isMobile = false 
}: AppointmentInfoCardProps) {
  const formatDate = (dateStr: string) => {
    const [year, month, day] = dateStr.split('-');
    return `${day}/${month}/${year}`;
  };

  if (!appointment) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-slate-200">
        <div className="text-center py-12">
          <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <p className="text-slate-500 text-lg">
            Selecciona una cita para ver los detalles
          </p>
        </div>
      </div>
    );
  }

  const content = (
    <div className={`bg-white rounded-2xl shadow-lg p-6 lg:p-8 border border-slate-200 ${isMobile ? 'max-h-[90vh] overflow-y-auto' : ''}`}>
      {isMobile && onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="mb-8 pb-6 border-b border-slate-200">
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Información de la Cita
        </h2>
        <h3 className="text-xl font-semibold text-blue-900 mb-1">
          {(appointment as any).appointmentTypeName ?? 'Tipo de cita'}
        </h3>
        <p className="text-slate-600">
          Dr. {appointment.doctorName}
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <div className="flex justify-between items-start">
          <span className="text-slate-600 font-medium">Procedimiento:</span>
          <span className="text-slate-900 font-semibold text-right">
            {(appointment as any).procedureName ?? 'N/A'}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-slate-600 font-medium">Lugar:</span>
          <span className="text-slate-900 font-semibold text-right">
            {(appointment as any).placeName ?? 'N/A'}
          </span>
        </div>

        <div className="flex justify-between items-start">
          <span className="text-slate-600 font-medium">Fecha:</span>
          <span className="text-slate-900 font-semibold text-right">
            {formatDate(appointment.date)}
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-3">
        <button
          onClick={() => onConfirm && onConfirm(appointment)}
          className="w-full bg-blue-900 text-white px-6 py-4 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 font-semibold text-lg hover:cursor-pointer"
        >
          Confirmar Asistencia
        </button>

        <button
          onClick={() => onCancel && onCancel(appointment)}
          className="w-full bg-slate-600 text-white px-6 py-4 rounded-xl hover:bg-slate-700 transition-all duration-200 shadow-lg font-semibold text-lg hover:cursor-pointer"
        >
          Cancelar Cita
        </button>
      </div>

      <p className="text-sm text-slate-500 text-center mt-6 italic">
        Las citas no se pueden cancelar 24 horas antes de la fecha estipulada
      </p>
    </div>
  );

  if (isMobile) {
    return (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 lg:hidden">
        <div className="w-full bg-white rounded-3xl relative">
          {content}
        </div>
      </div>
    );
  }

  return content;
}