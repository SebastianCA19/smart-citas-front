"use client";
import { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";

export default function RegisterPage() {
    const [formData, setFormData] = useState({
        cedula: '',
        nombre: '',
        primerApellido: '',
        segundoApellido: '',
        email: '',
        clave: '',
        verifyClave: ''
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'cedula') {
            // Ensure only numbers and max 10 digits
            const numericValue = value.replace(/\D/g, '').slice(0, 10);

            setFormData(prev => ({
                ...prev,
                [name]: numericValue
            }));
            return;
        }

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        // Validation
        if (!formData.cedula || !formData.nombre || !formData.primerApellido || !formData.email || !formData.clave || !formData.verifyClave) {
            toast.error('Por favor complete todos los campos obligatorios');
            return;
        }

        if (formData.clave !== formData.verifyClave) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        if (formData.clave.length < 6) {
            toast.error('La contraseña debe tener al menos 6 caracteres');
            return;
        }

        setIsLoading(true);

        try {
            // Determine if user is a doctor or patient based on email
            const isDoctor = formData.email.endsWith('@smartcitas.com');
            const endpoint = isDoctor ? '/api/doctors/' : '/api/patients/';

            // Prepare user data according to API format
            const userData = {
                cedula: parseInt(formData.cedula),
                nombre: formData.nombre,
                primerApellido: formData.primerApellido,
                segundoApellido: formData.segundoApellido || '',
                email: formData.email,
                clave: formData.clave
            };

            // Call register API
            const response = await fetch(`http://localhost:8081${endpoint}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al registrar usuario');
            }

            const result = await response.json();
            
            toast.success('¡Registro exitoso!');

            sessionStorage.setItem('user', JSON.stringify(result));
            
            // Redirect based on user type
            setTimeout(() => {
                if (isDoctor) {
                    window.location.href = "/doctors";
                } else {
                    window.location.href = "/patients";
                }
            }, 500);

        } catch (error: any) {
            console.error('Register error:', error);
            toast.error('Error al registrar. Por favor, intente de nuevo o revise bien sus datos.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <>
        <div>
            <Toaster
                position="top-right"
                reverseOrder={false}
            />
        </div>
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-11/12 h-screen flex flex-col p-8 overflow-y-auto">
                <h1 className="text-2xl text-neutral-800 font-thin">
                    Smart Citas
                </h1>

                <div className="mt-8 flex flex-col text-neutral-900">
                    <h1 className="text-3xl font-bold">
                        Registrarse
                    </h1>
                    <p className="mb-8 mt-2">
                        ¿Ya tienes una cuenta? <a href="/login" className="font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent hover:underline hover:underline-offset-4">Inicia sesión aquí</a>
                    </p>

                    <label htmlFor="cedula" className="mb-2">Cédula: <span className="text-red-500">*</span></label>    
                    <input
                        type="number"
                        id="cedula"
                        name="cedula"
                        value={formData.cedula}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 disabled:opacity-50"
                        placeholder="12345678"
                    />

                    <label htmlFor="nombre" className="mb-2 mt-5">Nombre: <span className="text-red-500">*</span></label>    
                    <input
                        type="text"
                        id="nombre"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 disabled:opacity-50"
                    />

                    <div className="w-full flex flex-row gap-4 mb-2 mt-4">
                        <div className="mt-4 w-full flex flex-col">
                            <label htmlFor="primerApellido">Primer Apellido: <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                id="primerApellido"
                                name="primerApellido"
                                value={formData.primerApellido}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 w-full disabled:opacity-50"
                            />
                        </div>
                        <div className="mt-4 w-full flex flex-col">
                            <label htmlFor="segundoApellido">Segundo Apellido:</label>
                            <input
                                type="text"
                                id="segundoApellido"
                                name="segundoApellido"
                                value={formData.segundoApellido}
                                onChange={handleInputChange}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                                className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 w-full disabled:opacity-50"
                            />
                        </div>
                    </div>

                    <label htmlFor="email" className="mb-2 mt-5">Correo Electrónico: <span className="text-red-500">*</span></label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 disabled:opacity-50"
                        placeholder="ejemplo@correo.com"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                        * Usa un correo @smartcitas.com para registrarte como doctor
                    </p>

                    <label htmlFor="clave" className="mb-2 mt-8">Contraseña: <span className="text-red-500">*</span></label>
                    <input
                        type="password"
                        id="clave"
                        name="clave"
                        value={formData.clave}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 disabled:opacity-50"
                        placeholder="Mínimo 6 caracteres"
                    />

                    <label htmlFor="verifyClave" className="mb-2 mt-5">Verificar Contraseña: <span className="text-red-500">*</span></label>
                    <input
                        type="password"
                        id="verifyClave"
                        name="verifyClave"
                        value={formData.verifyClave}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 disabled:opacity-50"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="mt-12 mb-12 px-6 py-3 text-white rounded-lg font-medium bg-linear-to-r from-blue-900 to-blue-500 bg-size-[200%_200%] transition-all duration-500 ease-in-out hover:bg-position-[100%_0%] hover:shadow-lg hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Registrando...
                            </span>
                        ) : (
                            'Registrarse'
                        )}
                    </button>
                </div>    
            </div>
        </div>
        </>
    );
}