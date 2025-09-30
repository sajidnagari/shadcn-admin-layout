
import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'
import SignupForm from '@/components/auth/SignupForm'

export default function SignUp() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/favicon.ico"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Create an account</CardTitle>
            <CardDescription>Enter your information to create your account</CardDescription>
          </CardHeader>
          <CardContent>
            <SignupForm
              defaultName="Jane Admin"
              defaultEmail="admin@example.com"
              defaultPassword="password"
            />
            <div className="mt-4 text-center text-sm text-gray-600">
              Already have an account?{" "}
              <Link href="/" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }