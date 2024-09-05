'use client';

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useSession } from "next-auth/react";
import { registerVeterinario } from '@/utils/actions/RegisterUserVeterinarian';

const registerSchema = z.object({
    name: z.string().nonempty('Nome é obrigatório'),
    email: z.string().email('Email inválido'),
    password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
    crmv: z.string().nonempty('CRMV é obrigatório'),
    cep: z.string().nonempty('CEP é obrigatório'),
    region: z.string().nonempty('Região é obrigatória'),
    termsAccepted: z.boolean().refine(val => val === true, 'Você deve aceitar os Termos e Condições'),
    role: z.string()
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;

export default function RegisterVeterinario() {
    const [show, setShow] = useState('password');
    const [check, setCheck] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        if (status === "authenticated") {
            router.push('/veterinario/home');
        }
    }, [status, router]);

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting, isValid, dirtyFields },
        watch
    } = useForm<RegisterSchemaType>({
        resolver: zodResolver(registerSchema),
        mode: 'all'
    });

    useEffect(() => {
        setIsFormValid(isValid && check);
    }, [isValid, check]);

    const handleShow = () => {
        setShow(show === 'password' ? 'text' : 'password');
    };

    const onSubmit = async (data: RegisterSchemaType) => {
        try {
            const formattedData = {
                ...data,
                crmv: data.crmv ?? "",
                cep: data.cep ?? "",
                region: data.region ?? ""
            };

            await registerVeterinario(formattedData);
            toast.success('Usuário criado com sucesso!');
            router.push('/vet/login');
        } catch (error) {
            toast.error('Erro ao criar usuário. Tente novamente.');
        }
    };

    const handleCheck = () => {
        setCheck(!check);
    };

    return (
        <main className="p-4 h-screen w-full flex justify-between gap-2 animate-fade-in">
            <div className="w-[45%] flex flex-col items-center justify-between">
                <div className="px-6 py-4 flex justify-between w-full">
                    <Link href={'/welcome'} className="text-2xl font-bold text-vet-secondary">Petzone</Link>
                    <Link href={'/welcome'} className="px-2 rounded-md flex align-middle text-base font-semibold text-vet-primary items-center justify-center gap-2 hover:bg-zinc-300 duration-300">
                        <ArrowLeft className="size-5 text-vet-primary" strokeWidth={2.5} /> Voltar ao início
                    </Link>
                </div>
                <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-3">
                        <h2 className="text-5xl font-semibold text-vet-primary">Registrar</h2>
                        <p className="text-lg font-semibold text-zinc-500">Digite suas informações para se registrar no Petzone</p>
                    </div>
                    <form className="flex flex-col gap-2 relative" onSubmit={handleSubmit(onSubmit)}>
                        <input
                            type="text"
                            placeholder="Nome"
                            {...register("name")}
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.name ? 'border-red-500' : ''}`}
                        />
                        {errors.name && <span className="text-red-500 text-sm">{errors.name?.message}</span>}

                        <input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email?.message}</span>}

                        <input
                            type={show}
                            placeholder="Senha"
                            {...register("password")}
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password?.message}</span>}

                        <input type="hidden" id="role"  {...register("role", { required: true })} value="veterinarian" />

                        <input
                            type="text"
                            placeholder="CRMV"
                            {...register("crmv")}
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.crmv ? 'border-red-500' : ''}`}
                        />
                        {errors.crmv && <span className="text-red-500 text-sm">{errors.crmv?.message}</span>}

                        <input
                            type="text"
                            placeholder="CEP da clínica"
                            {...register("cep")}
                            className={`outline-none border-2 rounded-lg py-2 px-4 w-full font-medium ${errors.cep ? 'border-red-500' : ''}`}
                        />
                        {errors.cep && <span className="text-red-500 text-sm">{errors.cep?.message}</span>}

                        <select
                            {...register("region")}
                            className={`outline-none border-2 bg-zinc-100 rounded-lg py-2 px-4 w-full font-medium ${errors.region ? 'border-red-500' : ''}`}
                            defaultValue=""
                        >
                            <option className='font-normal' value="" disabled>Selecione uma região</option>
                            <option className='font-normal' value="Águas Claras">Águas Claras</option>
                            <option className='font-normal' value="Asa sul">Asa sul</option>
                            <option className='font-normal' value="Asa norte">Asa norte</option>
                            <option className='font-normal' value="Brasília">Brasília</option>
                            <option className='font-normal' value="Ceilândia">Ceilândia</option>
                            <option className='font-normal' value="Taguatinga">Taguatinga</option>
                            <option className='font-normal' value="Gama">Gama</option>
                            <option className='font-normal' value="Guará">Guará</option>
                            <option className='font-normal' value="Planaltina">Planaltina</option>
                            <option className='font-normal' value="Samambaia">Samambaia</option>
                            <option className='font-normal' value="Sobradinho">Sobradinho</option>
                            <option className='font-normal' value="Vicente Pires">Vicente Pires</option>
                        </select>

                        <div className="text-end flex gap-2 p-1">
                            <input
                                type="checkbox"
                                id="terms"
                                {...register("termsAccepted")}
                                onChange={handleCheck}
                                className={`mr-2 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                            />
                            <label htmlFor="terms" className="text-sm font-medium">Eu aceito os <span className="text-vet-secondary hover:underline">Termos e Condições</span></label>
                        </div>
                        <button className="absolute bottom-[268px] right-6 duration-300" type="button" onClick={handleShow}>
                            {show === 'password' ? <EyeOff strokeWidth={2.5} className="text-zinc-500 size-5 hover:text-zinc-700 duration-300" /> : <Eye strokeWidth={2.5} className="text-zinc-500 size-5 hover:text-zinc-700 duration-300" />}
                        </button>
                        <button
                            className={`text-white font-semibold text-lg rounded-md py-1.5 px-4 border-2 mt-4 ${isFormValid
                                    ? 'bg-vet-secondary hover:bg-transparent hover:border-vet-secondary hover:text-vet-secondary'
                                    : 'bg-zinc-600'
                                } duration-300`}
                            type="submit"
                            disabled={isSubmitting || !isFormValid}
                        >
                            Registrar
                        </button>
                    </form>
                </div>
                <div>
                    <Link href={'/vet/login'} className="text-sm font-medium">
                        Já possui uma conta de veterinário? <span className="text-vet-secondary hover:underline">Acesse aqui</span>
                    </Link>
                </div>
            </div>
            <div className="bg-vet-secondary h-full w-[55%] rounded-3xl"></div>
        </main>
    )
}
