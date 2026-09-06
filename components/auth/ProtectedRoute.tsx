import { useRouter } from "next/navigation";
import { useAuth } from "./AuthContext";
import { useEffect } from "react";

export default function ProtectedRoute({ children, }: { children: React.ReactNode; }) {
    const { currentUser, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !currentUser) {
            router.replace("/login");
        }
    }, [currentUser, isLoading, router])
    if (isLoading || !currentUser) {
        return <div>Loading...</div>;
    }

    return children;
}