"use client";
import { useState } from 'react';
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error('Por favor complete todos los campos');
            return;
        }

        setIsLoading(true);

        try {
            // Call login API
            const response = await fetch('http://localhost:8081/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, clave: password })
            });

            if (!response.ok) {
                throw new Error('Credenciales incorrectas');
            }

            const userData = await response.json();
            
            // Store user data in sessionStorage
            sessionStorage.setItem('user', JSON.stringify(userData));
            
            toast.success('¡Inicio de sesión exitoso!');
            
            // Redirect based on email domain
            setTimeout(() => {
                if (email.endsWith('@smartcitas.com')) {
                    window.location.href = "/doctors";
                } else {
                    window.location.href = "/patients";
                }
            }, 500);

        } catch (error) {
            console.error('Login error:', error);
            toast.error('Error al iniciar sesión. Por favor, verifique sus credenciales.');
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
            <div className="w-11/12 h-11/12 flex flex-col p-8">
                <h1 className="text-3xl text-neutral-800 font-thin mb-10">
                    Smart Citas
                </h1>
            
                <div className="mt-8 flex flex-col text-neutral-900">
                    <h1 className="text-3xl font-bold">
                        Iniciar Sesión
                    </h1>
                    <p className="mb-8 mt-2">
                        ¿No tienes una cuenta? <a href="/register" className="font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent hover:underline hover:underline-offset-4">Regístrate aquí</a>
                    </p>
                    <label htmlFor="email" className="mb-2">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 disabled:opacity-50"
                        placeholder="ejemplo@correo.com"
                    />

                    <label htmlFor="password" className="mb-2 mt-8">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={isLoading}
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 disabled:opacity-50"
                        placeholder="••••••••"
                    />

                    <button
                        onClick={handleSubmit}
                        disabled={isLoading}
                        className="mt-12 px-6 py-3 text-white rounded-lg font-medium bg-linear-to-r from-blue-900 to-blue-500 bg-size-[200%_200%] transition-all duration-500 ease-in-out hover:bg-position-[100%_0%] hover:shadow-lg hover:cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Iniciando sesión...
                            </span>
                        ) : (
                            'Iniciar Sesión'
                        )}
                    </button>
                </div>   
            </div>
        </div>
        </>
    );
}