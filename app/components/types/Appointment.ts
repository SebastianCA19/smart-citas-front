export interface Appointment {
    id: string;
    title: string;
    doctorName: string;
    patientName: string;
    clinic: string;
    date: string; // format: DD/MM/YYYY
    time: string; // format: HH:MM A.M/P.M
}