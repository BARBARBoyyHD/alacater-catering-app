'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signupSchema } from '@/lib/zod/authSchemas'
import { signUpNewUser } from '@/lib/actions/auth/SignUpActions'
import { z } from 'zod';

type SignupSchema = z.infer<typeof signupSchema>

export default function SignupPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = async (data: SignupSchema) => {
    // The role metadata will be handled within the signUpNewUser Server Action
    await signUpNewUser(data)
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background"> {/* bg-background: #F5F5F5 */}
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg shadow-lg"> {/* bg-card: #FFFFFF */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Provider Signup</h1> {/* text-primary: #333333 */}
          <p className="text-muted-foreground text-secondary">Create your account to get started</p> {/* text-secondary: #666666 */}
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
          <div>
            <Label htmlFor="confirmPassword" className="text-secondary">Confirm Password</Label> {/* text-secondary: #666666 */}
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              {...register('confirmPassword')}
              aria-invalid={errors.confirmPassword ? 'true' : 'false'}
              className="border-medium focus:border-primary" // border-medium: #CCCCCC, focus: border-primary: #FF7B00
            />
            {errors.confirmPassword && <p className="text-sm text-error">{errors.confirmPassword.message}</p>} {/* text-error: #FF3B30 */}
          </div>
          <div>
            <Label htmlFor="businessName" className="text-secondary">Business Name</Label> {/* text-secondary: #666666 */}
            <Input
              id="businessName"
              type="text"
              placeholder="Your Catering Business"
              {...register('businessName')}
              aria-invalid={errors.businessName ? 'true' : 'false'}
              className="border-medium focus:border-primary" // border-medium: #CCCCCC, focus: border-primary: #FF7B00
            />
            {errors.businessName && <p className="text-sm text-error">{errors.businessName.message}</p>} {/* text-error: #FF3B30 */}
          </div>
          <Button type="submit" className="w-full signature-gradient" disabled={isSubmitting}> {/* signature-gradient likely corresponds to primary action */}
            {isSubmitting ? 'Creating account...' : 'Sign Up'}
          </Button>
        </form>
        <div className="text-center text-sm text-secondary"> {/* text-secondary: #666666 */}
          <p>Already have an account? <a href="/login" className="text-primary hover:underline">Log in here</a></p> {/* text-primary: #FF7B00 */}
        </div>
      </div>
    </div>
  )
}
