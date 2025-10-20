import { Button } from "@/components/ui/button"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Image from 'next/image'
import Link from 'next/link'

export default function ForgotPassword() {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center space-y-2">
            <div className="flex items-center justify-center mb-4">
              <Image
                src="/logo.svg"  // Add your logo here
                alt="Logo"
                width={40}
                height={40}
                className="h-10 w-10"
              />
            </div>
            <CardTitle className="text-2xl font-bold text-foreground">Reset your password</CardTitle>
            <CardDescription>Enter your email to receive a password reset link</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">
                  Email
                </label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  required
                  className="w-full"
                />
              </div>
              <Button className="w-full">
                Send reset link
              </Button>
            </form>
            <div className="mt-4 text-center text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link href="/" className="font-medium text-primary-600 hover:text-primary-500">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }