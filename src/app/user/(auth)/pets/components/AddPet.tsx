import { addPet, CreatePetSchema } from "@/utils/actions/AddPet";
import { X } from "lucide-react";
import { Session } from "next-auth";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import { generateId } from "@/utils/actions/GenerateID";
import { useRouter } from "next/navigation";

export function AddPet({ user, onPetAdded, setOpen }: { user: Session, onPetAdded: () => void, setOpen: () => void }) {
    const [pet, setPet] = useState<CreatePetSchema>({
        id: '',
        name: '',
        age: 1,
        city: '',
        birthDate: new Date(),
        userEmail: user.user?.email || '',
        race: '',
        notes: '',
        sex: 'U',
        vaccination: ''
    });

    const router = useRouter()

    useEffect(() => {
        if (pet.name) {
            setPet(prevPet => ({
                ...prevPet,
                id: `${pet.name}-${generateId()}`
            }));
        }
    }, [pet.name]);

    const handlePet = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setPet(prevPet => {
            const newValue = name === 'birthDate' ? new Date(value) : name === 'age' ? parseInt(value) : value;
            const newPet = {
                ...prevPet,
                [name]: newValue
            };

            if (name === 'birthDate') {
                const idade = calcularIdade(newPet.birthDate);
                newPet.age = idade;
            }

            return newPet;
        });
    };

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        console.log('Radio value selected:', value);
        setPet(prevPet => ({
            ...prevPet,
            sex: value as 'M' | 'F'
        }));
    };

    const calcularIdade = (dataNascimento: Date) => {
        const hoje = dayjs();
        const nascimento = dayjs(dataNascimento);
        const idade = hoje.diff(nascimento, 'month');
        return idade;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Submitting pet:', pet);
        try {
            await addPet(pet);
            onPetAdded();
            setOpen();
            setPet({
                id: '',
                name: '',
                age: 1,
                city: '',
                birthDate: new Date(),
                userEmail: user.user?.email || '',
                race: '',
                notes: '',
                sex: 'U',
                vaccination: ''
            });
            router.push(`/user/pets/${pet.id}`)
        } catch (error) {
            console.error('Error adding pet:', error);
            postMessage('Failed to add pet.');
        }
    };

    return (
        <div className="w-[86.7%] h-full absolute animate-fade-in">
            <div className="absolute w-full h-full z-0 bg-black opacity-70" />
            <div className="absolute w-full h-full flex flex-col items-center justify-center z-40">
                <div className="flex flex-col items-center justify-center gap-2">
                    <form className="flex flex-col px-6 py-8 rounded-xl bg-zinc-100 gap-4 relative" onSubmit={handleSubmit}>
                        <div className="w-full flex justify-end">
                            <div className="flex justify-between w-full gap-3">
                                <div>
                                    <h2 className="text-xl text-zinc-800 font-semibold">Adicione seu pet</h2>
                                    <p className="text-sm text-zinc-500 font-medium">Preencha os campos com as informações do seu amiguinho</p>
                                </div>
                                <button type="button" className="cursor-pointer" onClick={setOpen}>
                                    <X className="text-zinc-500 size-6 absolute top-4 right-3 hover:text-red-500 duration-300" />
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <input
                                type="text"
                                placeholder="Nome"
                                name="name"
                                value={pet.name}
                                onChange={handlePet}
                                className="border-2 rounded-lg px-4 py-2 font-medium"
                                required
                            />
                            <div className="w-full flex gap-3">
                                <input
                                    type="text"
                                    placeholder="Raça"
                                    name="race"
                                    value={pet.race}
                                    onChange={handlePet}
                                    className="border-2 rounded-lg px-4 py-2 font-medium"
                                    required
                                />
                                <input
                                    type="date"
                                    name="birthDate"
                                    value={pet.birthDate.toISOString().split('T')[0]}
                                    onChange={handlePet}
                                    className="border-2 rounded-lg px-4 py-2 font-medium flex-1"
                                    required
                                />
                            </div>
                            <div className="flex gap-3 justify-center items-center">
                                <input
                                    type="text"
                                    placeholder="Cidade"
                                    name="city"
                                    value={pet.city}
                                    onChange={handlePet}
                                    className="border-2 rounded-lg px-4 py-2 font-medium"
                                    required
                                />
                                <div className="flex gap-4 flex-1">
                                    <label className="flex gap-2">
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="M"
                                            checked={pet.sex === 'M'}
                                            onChange={handleRadioChange}
                                        />
                                        Macho
                                    </label>
                                    <label className="flex gap-2">
                                        <input
                                            type="radio"
                                            name="sex"
                                            value="F"
                                            checked={pet.sex === 'F'}
                                            onChange={handleRadioChange}
                                        />
                                        Fêmea
                                    </label>
                                </div>
                            </div>
                            <textarea
                                placeholder="Notas"
                                name="notes"
                                value={pet.notes}
                                onChange={handlePet}
                                className="border-2 rounded-lg px-4 py-2 font-medium resize-none h-40"
                            />
                            {/* <input
                                type="text"
                                placeholder="Vaccination"
                                name="vaccination"
                                value={pet.vaccination}
                                onChange={handlePet}
                                className="border-2 rounded-lg px-4 py-2 font-medium"
                            /> */}
                        </div>
                        <button
                            type="submit"
                            className=" rounded-lg bg-brand-secondary px-4 py-2 text-white font-bold border-2 border-transparent hover:bg-transparent hover:text-brand-secondary hover:border-brand-secondary duration-300"
                        >
                            Adicionar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
