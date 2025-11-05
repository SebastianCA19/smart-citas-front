"use client";
import { FormEvent } from 'react';
import { Toaster, toast } from "react-hot-toast";

export default function RegisterPage() {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const firstName = formData.get('first-name') as string;
        const lastName = formData.get('last-name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const verifyPassword = formData.get('verify-password') as string;

        if (!name || !firstName || !email || !password || !verifyPassword) {
            toast.error('Por favor complete todos los campos');
            return;
        }

        if (password !== verifyPassword) {
            toast.error('Las contraseñas no coinciden');
            return;
        }

        //Simulate register process
        toast.promise(
            new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    if (email === '' || password === '' || name === '' || firstName === '' || lastName === '') {
                        reject();
                    }else{
                        resolve();
                        window.location.href = "/patients";
                    }
                }, 2000);
            }),
            {
                loading: 'Registrando...',
                success: '¡Registro exitoso!',
                error: 'Error al registrar. Por favor, intente de nuevo.',
            }
        )
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
            <div className="w-11/12 h-screen flex flex-col p-8">
                <h1 className="text-2xl text-neutral-800 font-thin">
                    Smart Citas
                </h1>

                {/* Register Form */}
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col text-neutral-900">
                    <h1 className="text-3xl font-bold">
                        Registrarse
                    </h1>
                    <p className="mb-8 mt-2">
                        ¿Ya tienes una cuenta? <a href="/login" className="font-bold bg-linear-to-r from-blue-900 to-blue-700 bg-clip-text text-transparent hover:underline hover:underline-offset-4">Inicia sesión aquí</a>
                    </p>
                    <label htmlFor="name" className="mb-2">Nombre:</label>    
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200"
                        />
                    <div className="w-full flex flex-row gap-4 mb-2 mt-4">
                        <div className="mt-4 w-full flex flex-col">
                            <label htmlFor="first-name">Primer Apellido:</label>
                            <input
                                type="text"
                                id="first-name"
                                name="first-name"
                                className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 w-full"
                                />
                        </div>
                        <div className="mt-4 w-full flex flex-col">
                            <label htmlFor="last-name">Segundo Apellido:</label>
                            <input
                                type="text"
                                id="last-name"
                                name="last-name"
                                className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200 w-full"
                                />
                        </div>
                    </div>
                    <label htmlFor="email" className="mb-2 mt-5">Correo Electrónico:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200"/>
                    <label htmlFor="password" className="mb-2 mt-8">Contraseña:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200"/>
                    <label htmlFor="verify-password" className="mb-2 mt-5">Verificar Contraseña:</label>
                    <input
                        type="password"
                        id="verify-password"
                        name="verify-password"
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200"/>
                    <button
                        type="submit"
                        className="mt-12 mb-12 px-6 py-3 text-white rounded-lg font-medium bg-linear-to-r from-blue-900 to-blue-500 bg-size-[200%_200%] transition-all duration-500 ease-in-out hover:bg-position-[100%_0%] hover:shadow-lg hover:cursor-pointer"
                    >
                        Registrarse
                    </button>
                </form>    
            </div>
        </div>
        </>
    );
}