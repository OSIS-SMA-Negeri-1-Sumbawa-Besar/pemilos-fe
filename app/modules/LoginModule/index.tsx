/* eslint-disable react/react-in-jsx-scope */
'use client'

import { Button } from '~/components/ui/button'
import { Input } from '~/components/ui/input'
import { toast } from 'sonner'
import { motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import { useState } from 'react'
import { Background } from '~/components/elements/Background/background'
import { useLocation, useNavigate } from 'react-router'

export function LoginModule() {
  return (
    <section className="font-manrope w-full h-screen relative overflow-hidden flex items-center justify-center">
      <Background />
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
            <label className="font-bold text-3xl text-center">Login</label>
            <Input
              placeholder="Username"
              className="font-manrope font-semibold text-sm bg-[#FAFAFA] placeholder:text-[#ADADAD]"
              onChange={(e) => {
                // setNisn(e.target.value)
              }}
            />
            <Input
              placeholder="Password"
              type="password"
              className="font-manrope font-semibold text-sm bg-[#FAFAFA] placeholder:text-[#ADADAD] focus:outline-none "
              onChange={(e) => {
                // setPassword(e.target.value)
              }}
            />
            <Button
              // disabled={loading}
              // onClick={async () => {
              //   await login()
              //   setTimeout(() => {
              //     setLoading(false)
              //   }, 200)
              // }}
              size={'lg'}
              className="w-full"
            >
              <LogIn className="w-4" />
              <span>Login</span>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
