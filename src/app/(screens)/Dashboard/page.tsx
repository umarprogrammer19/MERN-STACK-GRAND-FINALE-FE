"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function Dashboard() {
    const [user, setUser] = useState<{ fullname: string } | null>(null);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            router.push("/login")
        } else {
            setUser({ fullname: "Not Found" })
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem("accessToken")
        router.push("/login")
    }

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Welcome to your Dashboard, {user.fullname}!
                </h2>
                <div className="mt-6 text-center">
                    <Button onClick={handleLogout}>Log out</Button>
                </div>
            </div>
        </div>
    )
}

