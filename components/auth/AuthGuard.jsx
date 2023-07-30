'use client'
import GetUser from "@/utilities/getUsers";
import { usePathname, useRouter } from "next/navigation"
import { useEffect } from "react";

export const AuthGuard = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();

    const { data: currentUser } = GetUser();

    useEffect(() => {
        const intendedDestination = localStorage.getItem('intendedDestination');
        if (!(currentUser && currentUser.email)) {
            localStorage.setItem('intendedDestination', pathname);
            router.push('/login');
        } else if (intendedDestination && currentUser && currentUser.email) {
            localStorage.removeItem('intendedDestination');
            router.push(intendedDestination)
        }
    }, [currentUser, pathname, router]);

    return children;
};
