"use client";
import { FormEvent } from 'react';
import { Toaster, toast } from "react-hot-toast";

export default function LoginPage() {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;

        if (!email || !password) {
            toast.error('Por favor complete todos los campos');
            return;
        }

        //Simulate login process
        toast.promise(
            new Promise<void>((resolve, reject) => {
                setTimeout(() => {
                    if (email === '' || password === '') {
                        reject();
                    }else{
                        resolve();
                        window.location.href = "/patients";
                    }
                }, 2000);
            }),
            {
                loading: 'Iniciando sesión...',
                success: '¡Inicio de sesión exitoso!',
                error: 'Error al iniciar sesión. Por favor, verifique sus credenciales.',
            }
        )
        
    };

    return (
        <>
        <div>
            <div>
                <Toaster
                position="top-right"
                reverseOrder={false}
                />
            </div>
        </div>
        <div className="w-full h-screen flex items-center justify-center">

            <div className="w-11/12 h-11/12 flex flex-col p-8">
                <h1 className="text-3xl text-neutral-800 font-thin mb-10">
                    Smart Citas
                </h1>
            
                {/* Login Form */}
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col text-neutral-900">
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
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200"
                        placeholder="ejemplo@correo.com"/>

                    <label htmlFor="password" className="mb-2 mt-8">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        className="border-b-2 border-b-neutral-400 py-2 outline-none focus:border-b-blue-900 transition-colors duration-200"
                        placeholder="••••••••"/>

                    <button
                        type="submit"
                        className="mt-12 px-6 py-3 text-white rounded-lg font-medium bg-linear-to-r from-blue-900 to-blue-500 bg-size-[200%_200%] transition-all duration-500 ease-in-out hover:bg-position-[100%_0%] hover:shadow-lg hover:cursor-pointer"
                        >
                        Iniciar Sesión
                        </button>
                </form>   
            </div>
        </div>
        </>
    );
}