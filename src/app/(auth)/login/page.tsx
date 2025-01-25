"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/utils/auth"
import { useToast } from "@/hooks/use-toast"
import Layout from "@/components/Layout/Layout"
import { setCookie } from "nookies"

export default function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await login(email, password)
            localStorage.setItem("accessToken", response.accessToken)

            toast({
                title: "Logged in successfully",
                description: "Welcome back!",
            })
            router.push("/")
        } catch (error) {
            toast({
                title: "Error",
                description: "Invalid email or password.",
                variant: "destructive",
            })
        }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="email">Email address</Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <Button type="submit" className="w-full">
                    Log in
                </Button>
            </form>
            <div className="mt-6">
                <Link href="/signup" className="text-sm text-blue-600 hover:text-blue-500">
                    Don't have an account? Sign up
                </Link>
            </div>
        </Layout>
    )
}

