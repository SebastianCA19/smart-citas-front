"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

interface Appointment {
  id: number;
  idAppointmentType: number;
  appointmentTypeName: string;
  idPlace: number;
  placeName: string;
  idProcedure: number;
  procedureName: string;
  idDoctor: number;
  doctorName: string;
  idNurse: number;
  idPatient: number;
  date: string;
}

interface AppointmentCardProps {
  appointment: Appointment;
  onClick?: (appointment: Appointment) => void;
}

export default function AppointmentCard({ appointment, onClick }: AppointmentCardProps) {
  // Format date from YYYY-MM-DD to DD/MM/YYYY
  const formatDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split("T");
    const [year, month, day] = datePart.split("-");

    if (!timePart) return `${day}/${month}/${year}`;

    let [hour, minute] = timePart.split(":");
    let h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";

    h = h % 12;
    if (h === 0) h = 12;

    return `${day}/${month}/${year} ${h}:${minute} ${ampm}`;
  };

  return (
    <div
      onClick={() => onClick && onClick(appointment)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 cursor-pointer border-2 border-slate-200 hover:bg-blue-50"
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {appointment.appointmentTypeName}
          </h3>
          <p className="text-slate-600 text-sm mb-1">
            Dr. {appointment.doctorName}
          </p>
          <p className="text-slate-500 text-sm">
            {appointment.placeName}
          </p>
          <p className="text-slate-500 text-sm mt-1">
            {appointment.procedureName}
          </p>
        </div>
        <div className="text-right">
          <p className="text-slate-900 font-semibold text-sm">
            {formatDate(appointment.date)}
          </p>
        </div>
      </div>
    </div>
  );
}