import { useUser } from "@/contexts/UserContext";
import { useRouter } from "next/navigation";

export default function Home() {
    const { session } = useUser();
    const router = useRouter();

    if (session?.user?.role !== 'normal' && session?.user?.role !== 'veterinarian') {
        router.push('/welcome');
        return null;
    }

    if (session?.user?.role === 'normal') {
        router.push('/user/home');
        return null;
    }

    if (session?.user?.role === 'veterinarian') {
        router.push('/vet/home');
        return null;
    }

    return null;
}