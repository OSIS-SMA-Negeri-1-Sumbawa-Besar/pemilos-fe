import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { Button } from '~/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { getAuthClient } from '~/lib/auth'

// Login schema validation
const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required').min(5, 'Password must be at least 5 characters'),
})

type LoginFormValues = z.infer<typeof loginSchema>

export function LoginModule() {
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: '',
      password: '',
    },
  })

  const authClient = getAuthClient();

  const onSubmit = async (values: LoginFormValues) => {
    setLoading(true);
    const { data, error } = await authClient.signIn.email({
      email: `${values.username}@gmail.com`,
      password: values.password,
      callbackURL: '/'
    })

    setLoading(false);
    if (error) {
      return toast.error(error.message || 'Login failed')
    }
  }
  return (
    <section className="font-manrope w-full h-screen relative overflow-hidden flex items-center justify-center">
      <div className="flex flex-col gap-2 items-center z-20">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
        >
          <img
            src={'/logo-smanika-osis.png'}
            alt="SMANIKA OSIS Logo"
            width={100}
            height={200}
            className=""
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
          }}
          className="p-8 md:p-12 border-2 border-black/10 w-[300px] md:w-[400px] rounded-xl bg-white shadow-sm"
        >
          <div className="flex flex-col gap-8">
            <label className="font-bold text-xl text-center">Login</label>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Username"
                          className="font-manrope font-semibold text-sm bg-[#FAFAFA] placeholder:text-[#ADADAD]"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="password"
                          placeholder="Password"
                          className="font-manrope font-semibold text-sm bg-[#FAFAFA] placeholder:text-[#ADADAD] focus:outline-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  size={'lg'}
                  className="w-full"
                  onClick={() => form.handleSubmit(onSubmit)()}
                  disabled={loading}
                >
                  <LogIn className="w-4" />
                  <span>Login</span>
                </Button>
              </form>
            </Form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
