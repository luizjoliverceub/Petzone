'use client';

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import googleBrand from '../../../../public/google-brand.svg';
import appleBrand from '../../../../public/apple-brand.svg';
import Image from "next/image";
import { registerUser } from '@/utils/actions/RegisterUser';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";

const registerSchema = z.object({
    name: z.string().nonempty('O nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    role: z.string()
});

type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function Home() {
    const [show, setShow] = useState('password');
    const [check, setCheck] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/user/home');
        }
    }, [status, router]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid },
        watch
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        mode: 'onChange'
    });

    const watchName = watch("name");
    const watchEmail = watch("email");
    const watchPassword = watch("password");

    useEffect(() => {
        setIsFormValid(isValid && check);
    }, [isValid, check]);

    const handleShow = () => {
        setShow(show === 'password' ? 'text' : 'password');
    };

    const handleCheck = () => {
        setCheck(!check);
    };

    const onSubmit = async (data: RegisterSchemaType) => {
        try {
            await registerUser(data);
            toast.success('Usuário criado com sucesso!');
            router.push('/user/login');
        } catch (error) {
            toast.error('Erro ao criar usuário. Tente novamente.');
        }
    };

    return (
        <main className="p-4 h-screen w-full flex justify-between gap-2 animate-fade-in">
            <div className="w-[45%] flex flex-col items-center justify-between">
                <div className="px-6 py-4 flex justify-between w-full">
                    <Link href={'/welcome'} className="text-2xl font-bold text-brand-secondary">Petzone</Link>
                    <Link href={'/welcome'} className="px-2 rounded-md flex align-middle text-base font-semibold text-brand-primary items-center justify-center gap-2 hover:bg-zinc-300 duration-300">
                        <ArrowLeft className="size-5 text-brand-primary" strokeWidth={2.5} /> Voltar ao início
                    </Link>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-5xl font-semibold text-brand-primary">Registrar</h2>
                        <p className="text-lg font-semibold text-zinc-500">Digite seu email e senha para acessar o Petzone</p>
                    </div>
                    <form className="flex flex-col gap-2 relative" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="Username"
                            {...register("name")}
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.name && watchName ? 'border-red-500' : ''}`}
                        />
                        {errors.name && watchName && <span className="text-red-500 text-sm">{errors.name?.message}</span>}

                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.email && watchEmail ? 'border-red-500' : ''}`}
                        />
                        {errors.email && watchEmail && <span className="text-red-500 text-sm">{errors.email?.message}</span>}

                        <input
                            type={show}
                            placeholder="Senha"
                            {...register("password")}
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.password && watchPassword ? 'border-red-500' : ''}`}
                        />
                        {errors.password && watchPassword && <span className="text-red-500 text-sm">{errors.password?.message}</span>}

                        <input type="hidden" id="role"  {...register("role", { required: true })} value="normal" />

                        <div className="text-end flex gap-2 p-1">
                            <input type="checkbox" id="check" required onChange={handleCheck} />
                            <label htmlFor="check" className="text-sm font-medium">Eu aceito os <span className="text-brand-secondary hover:underline">Termos e Condições</span></label>
                        </div>

                        <button className="absolute bottom-[115px] right-6 duration-300" type="button" onClick={handleShow}>
                            {show === 'password' ? <EyeOff strokeWidth={2.5} className="text-zinc-500 size-5 hover:text-zinc-700 duration-300" /> : <Eye strokeWidth={2.5} className="text-zinc-500 size-5 hover:text-zinc-700 duration-300" />}
                        </button>

                        <button
                            className={`${isFormValid ? 'bg-brand-secondary hover:bg-transparent hover:border-brand-secondary hover:text-brand-secondary' : 'bg-zinc-600'} text-white font-semibold text-lg rounded-md py-1.5 px-4 border-2 border-transparent  duration-300 mt-4`}
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                        >
                            Registrar
                        </button>
                    </form>

                    <div className="flex gap-4 items-center">
                        <div className="h-0.5 flex-1 bg-zinc-300 rounded-xl"></div>
                        <p>Ou</p>
                        <div className="h-0.5 flex-1 bg-zinc-300 rounded-xl"></div>
                    </div>
                    <div className="w-full flex flex-col gap-2.5">
                        <button className="flex gap-2 justify-center items-center w-full border-2 text-zinc-600 font-semibold rounded-md py-1.5 px-4 hover:bg-transparent hover:border-red-800 hover:text-red-800 duration-300">
                            <Image src={googleBrand} alt="" width={18} />
                            Registrar com o Google
                        </button>
                        <button className="flex gap-2 justify-center items-center w-full border-2 text-zinc-600 font-semibold rounded-md py-1.5 px-4 hover:bg-transparent hover:border-zinc-800 hover:text-zinc-800 duration-300">
                            <Image src={appleBrand} alt="" width={20} />
                            Registrar com o Apple ID
                        </button>
                    </div>
                </div>
                <div>
                    <Link href={'/user/login'} className="text-sm font-medium">
                        Já possui uma conta? <span className="text-brand-secondary hover:underline">Acesse aqui</span>
                    </Link>
                </div>
            </div>
            <div className="bg-brand-secondary h-full w-[55%] rounded-3xl"></div>
        </main>
    );
}
