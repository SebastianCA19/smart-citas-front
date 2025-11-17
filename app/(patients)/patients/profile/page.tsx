"use client";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from "react-hot-toast";

interface UserFromSession {
  idUsuario: number;
  nombre: string;
  primerApellido: string;
  segundoApellido: string;
  email: string;
  estado: number;
}

export default function PatientProfile() {
  const [user, setUser] = useState<UserFromSession | null>(null);

  useEffect(() => {
    const userStr = sessionStorage.getItem("user");
    if (!userStr) {
      toast.error("No se encontró información de usuario. Por favor inicie sesión.");
      setTimeout(() => (window.location.href = "/login"), 1500);
      return;
    }

    try {
      const userData = JSON.parse(userStr) as UserFromSession;
      // validación mínima
      if (!userData || !userData.email) {
        throw new Error("Formato de usuario inválido");
      }
      setUser(userData);
    } catch (err) {
      console.error(err);
      toast.error("Error al leer datos de usuario. Vuelva a iniciar sesión.");
      sessionStorage.removeItem("user");
      setTimeout(() => (window.location.href = "/login"), 1500);
    }
  }, []); // solo una vez

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    toast.success("Cerrando sesión...");
    setTimeout(() => (window.location.href = "/login"), 600);
  };

  if (!user) {
    return (
      <>
        <Toaster position="top-right" />
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-blue-600 font-semibold">Cargando perfil...</p>
        </div>
      </>
    );
  }

  const fullName = `${user.nombre} ${user.primerApellido} ${user.segundoApellido}`;
  const estadoLabel = user.estado === 1 ? "Activo" : "Inactivo";

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="min-h-screen flex items-center justify-center p-6 bg">
        <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
          <div className="flex flex-col items-center">
            {/* Avatar con iniciales */}
            <div className="w-28 h-28 bg-linear-to-br from-blue-600 to-blue-900 rounded-full flex items-center justify-center text-white font-semibold hover:shadow-lg transition-all duration-200 text-3xl">
              {user.nombre?.charAt(0) ?? "U"}{user.primerApellido?.charAt(0) ?? "U"}
            </div>

            <h1 className="text-2xl font-semibold mt-4 text-blue-700">
              {fullName}
            </h1>

            <p className="text-gray-600 text-center">Paciente</p>

            <div className="mt-6 w-full">
              <h2 className="text-lg text-center font-medium text-blue-600 mb-2">
                Información
              </h2>

              <div className="p-4 rounded-xl space-y-2 text-md">
                <p>
                  <span className="font-semibold">Cedula:</span> {user.idUsuario}
                </p>

                <p>
                  <span className="font-semibold">Email:</span> {user.email}
                </p>

                <p>
                  <span className="font-semibold">Ubicación:</span> Santa Marta,
                  Colombia
                </p>
              </div>
            </div>

            <div className="mt-6 w-full space-y-3">
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 transition text-white py-2 rounded-xl font-medium"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
