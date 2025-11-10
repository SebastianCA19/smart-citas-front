"use client";

import React from "react";
import {Toaster, toast} from "react-hot-toast";

//export interface Appointment {
//    id: string;
//    title: string;
//    doctorName: string;
//    patientName: string;
//    clinic: string;
//    date: string; // format: DD/MM/YYYY
//    time: string; // format: HH:MM A.M/P.M
//}

export default function AppointmentPage() {

    React.useEffect(() => {
        const form = document.querySelector('form') as HTMLFormElement | null;
        if (!form) return;

        const onSubmit = (e: Event) => {
            e.preventDefault();
            const target = e.target as HTMLFormElement;

            const title = (target.elements.namedItem('title') as HTMLInputElement | null)?.value.trim() ?? '';
            const doctor = (target.elements.namedItem('doctor') as HTMLSelectElement | null)?.value ?? '';
            const clinic = (target.elements.namedItem('clinic') as HTMLSelectElement | null)?.value ?? '';
            const date = (target.elements.namedItem('date') as HTMLInputElement | null)?.value ?? '';
            const time = (target.elements.namedItem('time') as HTMLInputElement | null)?.value ?? '';

            const errors: string[] = [];

            if (!title) errors.push('El título es requerido.');
            if (!doctor) errors.push('Seleccione un doctor.');
            if (!clinic) errors.push('Seleccione una clínica.');
            if (!date) errors.push('La fecha es requerida.');
            if (!time) errors.push('La hora es requerida.');

            if (date && time) {
                const appointmentDate = new Date(`${date}T${time}`);
                if (isNaN(appointmentDate.getTime())) {
                    errors.push('Fecha u hora inválida.');
                } else {
                    const now = new Date();
                    if (appointmentDate < now) errors.push('La fecha y hora no pueden ser en el pasado.');
                }
            }

            if (errors.length > 0) {
                // show all validation errors as toasts
                errors.forEach((err) => toast.error(err));
                return;
            }

            // build simulated appointment payload
            const simulatedAppointment = {
                id: `sim-${Date.now()}`,
                title,
                doctor,
                clinic,
                date,
                time,
            };

            const submitButton = target.querySelector('button[type="submit"]') as HTMLButtonElement | null;
            if (submitButton) {
                submitButton.disabled = true;
                const prevText = submitButton.textContent;
                submitButton.textContent = 'Agendando...';
                const loadingToastId = toast.loading('Enviando cita...');

                // simulate network request
                setTimeout(() => {
                    toast.dismiss(loadingToastId);
                    toast.success('Cita agendada correctamente (simulado)');
                    // reset form visually
                    target.reset();
                    // re-enable button
                    if (submitButton) {
                        submitButton.disabled = false;
                        submitButton.textContent = prevText;
                    }
                    // log simulated payload to console for debugging
                    // eslint-disable-next-line no-console
                    console.log('Simulated appointment submitted:', simulatedAppointment);
                }, 1400);
            } else {
                // fallback: no submit button found
                toast.success('Cita agendada correctamente (simulado)');
                // eslint-disable-next-line no-console
                console.log('Simulated appointment submitted:', simulatedAppointment);
            }
        };

        form.addEventListener('submit', onSubmit);
        return () => form.removeEventListener('submit', onSubmit);
    }, []);

    return (
        <>
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
        <div className="w-full h-full bg-white flex flex-col p-8 justify-center items-center">

            <h1 className="text-2xl font-bold mb-4 text-blue-900">AGENDAR CITA</h1>

            <form className="w-full max-w-md bg-gray-100 p-6 rounded-lg shadow-md">
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="title">Título</label>
                    <input className="w-full p-2 border border-gray-300 rounded" type="text" id="title" name="title" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="doctor">Nombre del Doctor</label>
                    <select name="doctor" id="doctorSelect">
                        <option value="dr_smith">Dr. Smith</option>
                        <option value="dr_jones">Dr. Jones</option>
                        <option value="dr_brown">Dr. Brown</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="clinic">Clínica</label>
                    <select name="clinic" id="clinicSelect">
                        <option value="clinic_a">Clínica A</option>
                        <option value="clinic_b">Clínica B</option>
                        <option value="clinic_c">Clínica C</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="date">Fecha</label>
                    <input className="w-full p-2 border border-gray-300 rounded" type="date" id="date" name="date" />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 mb-2" htmlFor="time">Hora</label>
                    <input className="w-full p-2 border border-gray-300 rounded" type="time" id="time" name="time" />
                </div>
                <button className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600" type="submit">Agendar Cita</button>
            </form>
        </div>
        </>
    );
}