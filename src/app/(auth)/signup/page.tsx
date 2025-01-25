"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { signUp } from "@/utils/auth"
import Layout from "@/components/Layout/Layout"
import { useToast } from "@/hooks/use-toast"

export default function SignUp() {
    const [fullname, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [image, setImage] = useState<File | null>(null)
    const router = useRouter()
    const { toast } = useToast()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append("fullname", fullname)
            formData.append("email", email)
            formData.append("password", password)
            if (image) {
                formData.append("image", image)
            }

            await signUp(formData)
            toast({
                title: "Account created.",
                description: "We've created your account for you.",
            })
            router.push("/login")
        } catch (error) {
            toast({
                title: "Error",
                description: "There was a problem creating your account.",
                variant: "destructive",
            })
        }
    }

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="fullname">Full Name</Label>
                    <Input
                        id="fullname"
                        name="fullname"
                        type="text"
                        required
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
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
                <div>
                    <Label htmlFor="image">Profile Image</Label>
                    <Input id="image" name="image" type="file" onChange={(e) => setImage(e.target.files?.[0] || null)} />
                </div>
                <Button type="submit" className="w-full">
                    Sign up
                </Button>
            </form>
            <div className="mt-6">
                <Link href="/login" className="text-sm text-blue-600 hover:text-blue-500">
                    Already have an account? Log in
                </Link>
            </div>
        </Layout>
    )
}

