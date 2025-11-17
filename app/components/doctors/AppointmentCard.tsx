import { AppointmentDoc } from "../types/AppointmentDoc";

export default function AppointmentCard({ 
  appointment, 
  onViewRecord 
}: { 
  appointment: AppointmentDoc;
  onViewRecord: (appointment: AppointmentDoc) => void;
}) {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    
    return {
      date: `${day}/${month}/${year}`,
      time: `${hours}:${minutes}`
    };
  };

  const { date: formattedDate, time } = formatDate(appointment.date);

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-slate-200">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            {appointment.appointmentTypeName}
          </h3>
          <div className="space-y-1">
            <p className="text-slate-600 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Paciente: {appointment.patientName}
            </p>
            <p className="text-slate-600 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {appointment.placeName}
            </p>
            <p className="text-slate-600 text-sm flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              {appointment.procedureName}
            </p>
          </div>
        </div>
        <div className="flex flex-col items-end justify-between">
          <div className="text-right mb-4">
            <p className="text-slate-900 font-semibold text-sm">
              {formattedDate}
            </p>
            <p className="text-slate-600 text-sm">
              {time}
            </p>
          </div>
          <button
            onClick={() => onViewRecord(appointment)}
            className="bg-blue-900 text-white px-6 py-2 rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-md font-medium text-sm hover:cursor-pointer"
          >
            Ver Historia Clínica
          </button>
        </div>
      </div>
    </div>
  );
}