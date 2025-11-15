export interface Appointment {
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