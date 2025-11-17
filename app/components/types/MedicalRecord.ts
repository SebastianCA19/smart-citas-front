export interface MedicalRecord {
  idRecord: number;
  idPatient: number;
  patientName: string;
  idDoctor: number;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}