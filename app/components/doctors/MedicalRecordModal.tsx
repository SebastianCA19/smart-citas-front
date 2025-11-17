import React, {useState, useEffect} from "react";
import { Toaster, toast } from "react-hot-toast";
import { MedicalRecord } from "../types/MedicalRecord";
import { AppointmentDoc } from "../types/AppointmentDoc";

export default function MedicalRecordModal({
  appointment,
  onClose
}: {
  appointment: AppointmentDoc | null;
  onClose: () => void;
}) {
  const [medicalRecord, setMedicalRecord] = useState<MedicalRecord | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    diagnosis: "",
    treatment: "",
    notes: ""
  });
  const [hasFetched, setHasFetched] = useState(false);

  // Reset state when appointment changes
  useEffect(() => {
    if (appointment) {
      setHasFetched(false);
      setMedicalRecord(null);
      setIsEditing(false);
      setFormData({
        diagnosis: "",
        treatment: "",
        notes: ""
      });
    }
  }, [appointment?.id]); // Only re-run when appointment ID changes

  // Fetch medical record only once per appointment
  useEffect(() => {
    if (appointment && !hasFetched) {
      fetchMedicalRecord();
    }
  }, [appointment?.id, hasFetched]);

  const fetchMedicalRecord = async () => {
    if (!appointment || hasFetched) return;
    
    setIsLoading(true);
    setHasFetched(true);
    
    try {
      // Try to fetch existing medical records for this appointment
      const response = await fetch(`http://localhost:8083/api/medicalrecords/appointment/${appointment.id}/details`);
      
      if (response.status === 404) {
        setIsEditing(true);
        setIsLoading(false);
        return;
      }

      if (response.ok) {
        const record = await response.json();
        
        if (Array.isArray(record) && record.length > 0) {
          setMedicalRecord(record[0]);
          setFormData({
            diagnosis: record[0].diagnosis,
            treatment: record[0].treatment,
            notes: record[0].notes
          });
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      } else {
        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error fetching medical record:', error);
      setIsEditing(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    if (!appointment) return;

    // Validation
    if (!formData.diagnosis.trim()) {
      toast.error('El diagnóstico es obligatorio');
      return;
    }
    if (!formData.treatment.trim()) {
      toast.error('El tratamiento es obligatorio');
      return;
    }

    setIsLoading(true);

    try {
      const userDataStr = sessionStorage.getItem('user');
      if (!userDataStr) {
        toast.error('No se encontró información del doctor');
        return;
      }
      const userData = JSON.parse(userDataStr);

      const recordData = {
        idPatient: appointment.idPatient,
        idDoctor: userData.idUsuario,
        diagnosis: formData.diagnosis,
        treatment: formData.treatment,
        notes: formData.notes,
        idAppointment: appointment.id
      };

      let response;
      if (medicalRecord) {
        // Update existing record
        response = await fetch(`http://localhost:8083/api/medicalrecords/${medicalRecord.idRecord}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recordData)
        });
      } else {
        // Create new record
        response = await fetch('http://localhost:8083/api/medicalrecords/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(recordData)
        });
      }

      if (!response.ok) {
        throw new Error('Error al guardar la historia clínica');
      }

      toast.success('Historia clínica guardada exitosamente');
      setIsEditing(false);
      
      // Reset fetch flag to allow refetching
      setHasFetched(false);
    } catch (error) {
      console.error('Error saving medical record:', error);
      toast.error('Error al guardar la historia clínica');
    } finally {
      setIsLoading(false);
    }
  };

  if (!appointment) return null;

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">Historia Clínica</h2>
              <p className="text-slate-600 text-sm mt-1">Paciente: {appointment.patientName}</p>
            </div>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-600 transition-colors hover:cursor-pointer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-6">
            {isLoading && !medicalRecord ? (
              <div className="text-center py-12">
                <svg className="animate-spin h-10 w-10 text-blue-900 mx-auto mb-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-slate-600">Cargando historia clínica...</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Diagnosis */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Diagnóstico <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.diagnosis}
                      onChange={(e) => setFormData({ ...formData, diagnosis: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Ingrese el diagnóstico del paciente"
                    />
                  ) : (
                    <p className="text-slate-900 bg-slate-50 p-4 rounded-xl">{medicalRecord?.diagnosis}</p>
                  )}
                </div>

                {/* Treatment */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Tratamiento <span className="text-red-500">*</span>
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.treatment}
                      onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      rows={3}
                      placeholder="Ingrese el tratamiento prescrito"
                    />
                  ) : (
                    <p className="text-slate-900 bg-slate-50 p-4 rounded-xl">{medicalRecord?.treatment}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Notas Adicionales
                  </label>
                  {isEditing ? (
                    <textarea
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors resize-none"
                      rows={4}
                      placeholder="Notas u observaciones adicionales (opcional)"
                    />
                  ) : (
                    <p className="text-slate-900 bg-slate-50 p-4 rounded-xl">{medicalRecord?.notes || 'Sin notas adicionales'}</p>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  {isEditing ? (
                    <>
                      <button
                        onClick={handleSave}
                        disabled={isLoading}
                        className="flex-1 bg-blue-900 text-white px-6 py-3 rounded-xl hover:bg-blue-800 transition-all duration-200 shadow-lg font-semibold disabled:opacity-50"
                      >
                        {isLoading ? 'Guardando...' : 'Guardar'}
                      </button>
                      {medicalRecord && (
                        <button
                          onClick={() => {
                            setFormData({
                              diagnosis: medicalRecord.diagnosis,
                              treatment: medicalRecord.treatment,
                              notes: medicalRecord.notes
                            });
                            setIsEditing(false);
                          }}
                          className="px-6 py-3 border-2 border-slate-300 text-slate-700 rounded-xl hover:bg-slate-50 transition-all duration-200 font-semibold"
                        >
                          Cancelar
                        </button>
                      )}
                    </>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="flex-1 bg-slate-700 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all duration-200 shadow-lg font-semibold"
                    >
                      Editar
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}