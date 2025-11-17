"use client";

import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

interface MedicalRecord {
  idRecord: number;
  idPatient: number;
  patientName: string;
  idDoctor: number;
  doctorName: string;
  diagnosis: string;
  treatment: string;
  notes: string;
}

function MedicalRecordCard({ 
  record, 
  onView 
}: { 
  record: MedicalRecord;
  onView: (record: MedicalRecord) => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-6 border-2 border-slate-200">
      <div className="flex flex-col lg:flex-row justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-slate-900">
              Historia Clínica #{record.idRecord}
            </h3>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-xs text-slate-500">Médico tratante</p>
                <p className="text-slate-900 font-semibold">Dr. {record.doctorName}</p>
              </div>
            </div>
            
            <div className="flex items-start gap-2 mt-3 bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-blue-600 font-semibold mb-1">Diagnóstico</p>
                <p className="text-slate-700 text-sm line-clamp-2">{record.diagnosis}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col justify-center">
          <button
            onClick={() => onView(record)}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-all duration-200 shadow-md font-medium whitespace-nowrap"
          >
            Ver Detalles
          </button>
        </div>
      </div>
    </div>
  );
}

function MedicalRecordDetailModal({
  record,
  onClose
}: {
  record: MedicalRecord | null;
  onClose: () => void;
}) {
  if (!record) return null;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Mi Historia Clínica</h2>
              <p className="text-slate-600 text-sm mt-1">Historia #{record.idRecord}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Doctor Info */}
              <div className="bg-linear-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-4 rounded-r-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    Dr
                  </div>
                  <div>
                    <p className="text-xs text-blue-700 font-medium">Médico tratante</p>
                    <p className="text-blue-900 font-bold text-lg">Dr. {record.doctorName}</p>
                  </div>
                </div>
              </div>

              {/* Diagnosis */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  <label className="text-base font-bold text-slate-900">
                    Diagnóstico
                  </label>
                </div>
                <div className="bg-slate-50 p-5 rounded-xl border-2 border-slate-200">
                  <p className="text-slate-900 whitespace-pre-wrap leading-relaxed">{record.diagnosis}</p>
                </div>
              </div>

              {/* Treatment */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                  <label className="text-base font-bold text-slate-900">
                    Tratamiento Prescrito
                  </label>
                </div>
                <div className="bg-green-50 p-5 rounded-xl border-2 border-green-200">
                  <p className="text-slate-900 whitespace-pre-wrap leading-relaxed">{record.treatment}</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <svg className="w-5 h-5 text-slate-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  <label className="text-base font-bold text-slate-900">
                    Notas Adicionales
                  </label>
                </div>
                <div className="bg-amber-50 p-5 rounded-xl border-2 border-amber-200">
                  <p className="text-slate-900 whitespace-pre-wrap leading-relaxed">
                    {record.notes || 'Sin notas adicionales'}
                  </p>
                </div>
              </div>

              {/* Info Notice */}
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-blue-900 mb-1">Información importante</p>
                    <p className="text-sm text-blue-800">
                      Esta información fue proporcionada por tu médico tratante. Si tienes dudas o necesitas aclaraciones, contacta directamente con tu médico.
                    </p>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="w-full bg-slate-700 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PatientMedicalRecordsPage() {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);
  const [userCedula, setUserCedula] = useState<number | null>(null);

  useEffect(() => {
    const userDataStr = sessionStorage.getItem('user');
    if (!userDataStr) {
      toast.error('No se encontró información de usuario. Por favor inicie sesión.');
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
      return;
    }

    const userData = JSON.parse(userDataStr);
    setUserCedula(userData.idUsuario);
    fetchMedicalRecords(userData.idUsuario);
  }, []);

  const fetchMedicalRecords = async (cedula: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:8083/api/medicalrecords/patient/${cedula}/details`);
      
      if (!response.ok) {
        if (response.status === 404) {
          setMedicalRecords([]);
          setIsLoading(false);
          return;
        }
        throw new Error('Error al cargar las historias clínicas');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const parsedRecords = data.map((record: any) => {
          let doctorName = record.doctorName;

          // Parse doctor name if it's a JSON string
          if (typeof doctorName === 'string' && doctorName.startsWith('{')) {
            try {
              const doctorObj = JSON.parse(doctorName);
              doctorName = `${doctorObj.nombre} ${doctorObj.primerApellido}${doctorObj.segundoApellido ? ' ' + doctorObj.segundoApellido : ''}`.trim();
            } catch (e) {
              console.error('Error parsing doctor name:', e);
            }
          }

          return { ...record, doctorName };
        });

        setMedicalRecords(parsedRecords);
      } else {
        setMedicalRecords([]);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
      toast.error('Error al cargar las historias clínicas');
      setMedicalRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="h-screen flex items-center justify-center bg-slate-50">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-900 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-600 text-lg">Cargando tus historias clínicas...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="min-h-screen bg-slate-50 p-6 lg:p-10">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-blue-900 mb-2">
              Mis Historias Clínicas
            </h1>
            <p className="text-slate-600">
              Consulta el historial de tus diagnósticos y tratamientos médicos
            </p>
          </div>

          {/* Stats Card */}
          <div className="bg-linear-to-r from-blue-900 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 text-sm mb-1">Historias Clínicas Registradas</p>
                <p className="text-4xl font-bold">{medicalRecords.length}</p>
              </div>
              <div className="bg-white/20 p-4 rounded-lg">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Medical Records List */}
          {medicalRecords.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
              <svg className="w-24 h-24 text-slate-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h2 className="text-2xl font-bold text-slate-900 mb-3">
                No tienes historias clínicas registradas
              </h2>
              <p className="text-slate-600 text-lg mb-6">
                Tus historias clínicas aparecerán aquí después de tus consultas médicas
              </p>
              <a
                href="/patients"
                className="inline-block bg-blue-900 text-white px-8 py-4 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg font-semibold text-lg"
              >
                Ver Mis Citas
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {medicalRecords.map((record) => (
                <MedicalRecordCard
                  key={record.idRecord}
                  record={record}
                  onView={(rec) => setSelectedRecord(rec)}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedRecord && (
        <MedicalRecordDetailModal
          record={selectedRecord}
          onClose={() => setSelectedRecord(null)}
        />
      )}
    </>
  );
}