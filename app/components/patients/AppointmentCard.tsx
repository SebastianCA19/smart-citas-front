"use client";
import { Appointment } from "@/app/components/types/Appointment";

interface AppointmentCardProps {
  appointment: Appointment;
  onClick?: (appointment: Appointment) => void;
  isSelected?: boolean;
}

export default function AppointmentCard({ appointment, onClick, isSelected }: AppointmentCardProps) {
  return (
    <div
      onClick={() => onClick && onClick(appointment)}
      className={`bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border-2 ${
        isSelected ? 'border-blue-500' : 'border-slate-200 hover:bg-blue-50'
      }`}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {appointment.title}
          </h3>
          <p className="text-slate-600 text-sm mb-1">
            {appointment.doctorName}
          </p>
          <p className="text-slate-500 text-sm">
            {appointment.clinic}
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-900 font-semibold text-sm">
            {appointment.date}
          </p>
          <p className="text-slate-600 text-sm">
            {appointment.time}
          </p>
        </div>
      </div>
    </div>
  );
}