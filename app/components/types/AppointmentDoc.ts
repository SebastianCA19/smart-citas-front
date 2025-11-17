export interface AppointmentDoc {
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
  patientName: string;
  date: string;
}