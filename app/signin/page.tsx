'use client'

import { Lock, Mail } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function SignIn() {
    const [data, setData] = useState({ email: '', password: '' })
    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            const res = await signIn('credentials', {
                email: data.email,
                password: data.password,
                redirect: false
            })

            if (res && res.ok) {
                setData({ email: '', password: '' })
                router.push('/round1')
            } else {
                toast.error(res?.error)
            }
        } catch (error) {
            toast.error((error as Error).message)
            console.error(error)
        }
    }

    return (
        <div className="flex min-h-[90vh] w-full items-center justify-center bg-gradient-to-br from-blue-100 via-white to-blue-200 p-6">
            <div className="w-full max-w-sm">
                <Card className="rounded-xl border border-white/30 bg-white/40 shadow-2xl backdrop-blur-md transition-all">
                    <CardHeader>
                        <CardTitle className="text-3xl font-bold text-blue-800">
                            Welcome Back
                        </CardTitle>
                        <CardDescription className="text-blue-700">
                            Enter your credentials to access your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                            <div className="grid gap-2">
                                <Label htmlFor="email" className="text-blue-800">
                                    Email
                                </Label>
                                <div className="relative">
                                    <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-blue-500" />
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="you@example.com"
                                        required
                                        className="pl-10"
                                        value={data.email}
                                        onChange={e => setData({ ...data, email: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className="grid gap-2">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="password" className="text-blue-800">
                                        Password
                                    </Label>
                                    <Link
                                        href="#"
                                        className="text-sm text-blue-600 hover:underline"
                                    >
                                        Forgot?
                                    </Link>
                                </div>
                                <div className="relative">
                                    <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-blue-500" />
                                    <Input
                                        id="password"
                                        type="password"
                                        required
                                        className="pl-10"
                                        value={data.password}
                                        onChange={e =>
                                            setData({ ...data, password: e.target.value })
                                        }
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Login
                            </Button>

                            <div className="mt-2 text-center text-sm text-blue-700">
                                Don&apos;t have an account?{' '}
                                <Link href="/signup" className="underline hover:text-blue-900">
                                    Sign up
                                </Link>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
