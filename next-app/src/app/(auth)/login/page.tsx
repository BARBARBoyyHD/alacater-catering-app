'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { loginSchema } from '@/lib/zod/authSchemas'
import { signInUser } from '@/lib/actions/auth/SignInActions'
import { z } from 'zod';


type LoginSchema = z.infer<typeof loginSchema>

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginSchema) => {
    await signInUser(data)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background"> {/* bg-background: #F5F5F5 */}
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg"> {/* bg-card: #FFFFFF */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Provider Login</h1> {/* text-primary: #333333 */}
          <p className="text-muted-foreground text-secondary">Enter your credentials to access your account</p> {/* text-secondary: #666666 */}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-secondary">Email</Label> {/* text-secondary: #666666 */}
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              {...register('email')}
              aria-invalid={errors.email ? 'true' : 'false'}
              className="border-medium focus:border-primary" // border-medium: #CCCCCC, focus: border-primary: #FF7B00
            />
            {errors.email && <p className="text-sm text-error">{errors.email.message}</p>} {/* text-error: #FF3B30 */}
          </div>
          <div>
            <Label htmlFor="password" className="text-secondary">Password</Label> {/* text-secondary: #666666 */}
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              {...register('password')}
              aria-invalid={errors.password ? 'true' : 'false'}
              className="border-medium focus:border-primary" // border-medium: #CCCCCC, focus: border-primary: #FF7B00
            />
            {errors.password && <p className="text-sm text-error">{errors.password.message}</p>} {/* text-error: #FF3B30 */}
          </div>
          <Button type="submit" className="w-full signature-gradient" disabled={isSubmitting}> {/* signature-gradient likely corresponds to primary action */}
            {isSubmitting ? 'Logging in...' : 'Log In'}
          </Button>
        </form>
        <div className="text-center text-sm text-secondary"> {/* text-secondary: #666666 */}
          <p>Forgot Password? <a href="/forgot-password" className="text-primary hover:underline">Reset here</a></p> {/* text-primary: #FF7B00 */}
          <p>Don't have an account? <a href="/signup" className="text-primary hover:underline">Sign up</a></p> {/* text-primary: #FF7B00 */}
        </div>
      </div>
    </div>
  )
}
