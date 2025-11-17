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
          <h3 className="text-lg font-bold text-slate-900 mb-3">
            Historia Clínica #{record.idRecord}
          </h3>
          <div className="space-y-2">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-slate-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <div>
                <p className="text-xs text-slate-500">Paciente</p>
                <p className="text-slate-900 font-semibold">{record.patientName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 text-slate-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <div>
                <p className="text-xs text-slate-500">Médico</p>
                <p className="text-slate-900 font-semibold">Dr. {record.doctorName}</p>
              </div>
            </div>
            <div className="flex items-start gap-2 mt-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div className="flex-1">
                <p className="text-xs text-slate-500 mb-1">Diagnóstico</p>
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
              <h2 className="text-2xl font-bold text-slate-900">Historia Clínica #{record.idRecord}</h2>
              <p className="text-slate-600 text-sm mt-1">Paciente: {record.patientName}</p>
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
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
                <p className="text-sm text-blue-700 font-medium">
                  Médico tratante: Dr. {record.doctorName}
                </p>
              </div>

              {/* Diagnosis */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Diagnóstico
                </label>
                <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                  <p className="text-slate-900 whitespace-pre-wrap">{record.diagnosis}</p>
                </div>
              </div>

              {/* Treatment */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Tratamiento
                </label>
                <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                  <p className="text-slate-900 whitespace-pre-wrap">{record.treatment}</p>
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Notas Adicionales
                </label>
                <div className="bg-slate-50 p-4 rounded-xl border-2 border-slate-200">
                  <p className="text-slate-900 whitespace-pre-wrap">
                    {record.notes || 'Sin notas adicionales'}
                  </p>
                </div>
              </div>

              {/* Info Notice */}
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 text-amber-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-sm text-amber-800">
                    Esta historia clínica es de solo lectura. Para editar, dirígete a la sección de citas.
                  </p>
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

export default function DocMedicalRecordsPage() {
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecord[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<MedicalRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecord | null>(null);

  useEffect(() => {
    fetchMedicalRecords();
  }, []);

  useEffect(() => {
    // Filter records by patient name or cedula
    if (searchQuery.trim() === "") {
      setFilteredRecords(medicalRecords);
    } else {
      const filtered = medicalRecords.filter(record => 
        record.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        record.idPatient.toString().includes(searchQuery)
      );
      setFilteredRecords(filtered);
    }
  }, [searchQuery, medicalRecords]);

  const fetchMedicalRecords = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:8083/api/medicalrecords/details');
      
      if (!response.ok) {
        if (response.status === 404) {
          setMedicalRecords([]);
          setFilteredRecords([]);
          setIsLoading(false);
          return;
        }
        throw new Error('Error al cargar las historias clínicas');
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const parsedRecords = data.map((record: any) => {
          let patientName = record.patientName;
          let doctorName = record.doctorName;

          // Parse patient name if it's a JSON string
          if (typeof patientName === 'string' && patientName.startsWith('{')) {
            try {
              const patientObj = JSON.parse(patientName);
              patientName = `${patientObj.nombre} ${patientObj.primerApellido}${patientObj.segundoApellido ? ' ' + patientObj.segundoApellido : ''}`.trim();
            } catch (e) {
              console.error('Error parsing patient name:', e);
            }
          }

          // Parse doctor name if it's a JSON string
          if (typeof doctorName === 'string' && doctorName.startsWith('{')) {
            try {
              const doctorObj = JSON.parse(doctorName);
              doctorName = `${doctorObj.nombre} ${doctorObj.primerApellido}${doctorObj.segundoApellido ? ' ' + doctorObj.segundoApellido : ''}`.trim();
            } catch (e) {
              console.error('Error parsing doctor name:', e);
            }
          }

          return { ...record, patientName, doctorName };
        });

        setMedicalRecords(parsedRecords);
        setFilteredRecords(parsedRecords);
      } else {
        setMedicalRecords([]);
        setFilteredRecords([]);
      }
    } catch (error) {
      console.error('Error fetching medical records:', error);
      toast.error('Error al cargar las historias clínicas');
      setMedicalRecords([]);
      setFilteredRecords([]);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Toaster position="top-right" reverseOrder={false} />
        <div className="h-full flex items-center justify-center">
          <div className="text-center">
            <svg className="animate-spin h-12 w-12 text-blue-900 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-slate-600 text-lg">Cargando historias clínicas...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-blue-900 mb-2">
            Historias Clínicas
          </h1>
          <p className="text-slate-600">
            Consulta todas las historias clínicas registradas en el sistema
          </p>
        </div>

        {/* Search Bar and Stats */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Search Bar */}
          <div className="md:col-span-2 bg-white p-4 rounded-xl shadow-md border-2 border-slate-200 flex items-center">
            <div className="flex items-center gap-3 w-full">
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar por nombre o cédula del paciente..."
                className="flex-1 outline-none text-slate-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-slate-400 hover:text-slate-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="bg-white rounded-xl p-4 shadow-md border-2 border-slate-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-50 p-2.5 rounded-lg">
                <svg className="w-5 h-5 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-slate-500 text-xs">Total</p>
                <p className="text-xl font-bold text-slate-900">{medicalRecords.length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {searchQuery && (
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-xl">
            <p className="text-blue-900 font-semibold">
              {filteredRecords.length} historia{filteredRecords.length !== 1 ? 's' : ''} clínica{filteredRecords.length !== 1 ? 's' : ''} encontrada{filteredRecords.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Medical Records List */}
        {filteredRecords.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <svg className="w-24 h-24 text-slate-300 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h2 className="text-2xl font-bold text-slate-900 mb-3">
              {searchQuery ? 'No se encontraron historias clínicas' : 'No hay historias clínicas registradas'}
            </h2>
            <p className="text-slate-600 text-lg">
              {searchQuery 
                ? 'No hay historias clínicas que coincidan con tu búsqueda' 
                : 'Las historias clínicas aparecerán aquí una vez sean creadas'}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredRecords.map((record) => (
              <MedicalRecordCard
                key={record.idRecord}
                record={record}
                onView={(rec) => setSelectedRecord(rec)}
              />
            ))}
          </div>
        )}
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