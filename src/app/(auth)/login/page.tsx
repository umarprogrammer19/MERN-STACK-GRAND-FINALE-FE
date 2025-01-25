"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import Layout from "@/components/Layout/Layout";

export default function Login() {
    const [cnic, setCnic] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/v1/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ cnic, password }),
            });

            const data = await response.json();

            if (response.ok) {
                // Save token to localStorage or cookies
                localStorage.setItem("accessToken", data.accessToken);

                toast({
                    title: "Logged in successfully",
                    description: "Welcome back!",
                });

                // Navigate to home page
                router.push("/");
            } else {
                toast({
                    title: "Error",
                    description: data.message || "Invalid CNIC or password.",
                    variant: "destructive",
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again later.",
                variant: "destructive",
            });
        }
    };

    return (
        <Layout>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <Label htmlFor="cnic">CNIC</Label>
                    <Input
                        id="cnic"
                        name="cnic"
                        type="text"
                        placeholder="Enter your CNIC"
                        required
                        value={cnic}
                        onChange={(e) => setCnic(e.target.value)}
                    />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
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
    );
}
