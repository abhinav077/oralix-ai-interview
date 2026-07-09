"use client"

import { GoldTitle, GrayTitle, SectionLabel } from '@/components/reusables'
import { ONBOARDING_ROLES } from '@/lib/data'
import React from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const OnboardingPage = () => {

  const [role, setRole] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    yearsExp: "",
    bio: "",
    categories: [],
  });
  
  const selectedRole = ONBOARDING_ROLES.find((r) => r.value === role)
  const Icon = selectedRole?.icon

  return (
    <div className='min-h-screen bg-black px-6 flex flex-col items-center'>
      <div className='w-full max-w-2xl'>
        <div className='text-center mb-10'>
          <SectionLabel>Welcome</SectionLabel>
          <h1 className='text-5xl leading-tight tracking-tighter mt-1'>
            <GrayTitle>How will you be</GrayTitle>
            <br/>
            <GoldTitle>using Oralix?</GoldTitle>
          </h1>
          <p className="text-sm text-stone-500 font-light mt-4 leading-relaxed">
            This helps us personalise your experience.
            <span className="text-stone-600">
              {" "}
              You can&apos;t change this later.
            </span>
          </p>
        </div>

        {!role && (
          <div className="grid grid-cols-2 gap-4 w-full">
            {ONBOARDING_ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className="text-left rounded-2xl p-8 border border-white/10 bg-[#0f0f11] hover:border-amber-400/20 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="w-11 h-11 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-xl mb-5">
                  <r.icon className="h-5 w-5 text-amber-400" />
                </span>
                <h3 className="font-serif text-xl tracking-tight mb-3 text-stone-100">
                  {r.title}
                </h3>
                <p className="text-sm text-stone-400 font-light leading-relaxed">
                  {r.desc}
                </p>
              </button>
            ))}
          </div>
        )}


        {role && (
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between bg-[#0f0f11] border border-white/10 rounded-2xl px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="w-9 h-9 rounded-xl bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-base shrink-0">
                  {Icon ? <Icon className="w-4 h-4 text-amber-400" /> : null}
                </span>

                <div>
                  <p className="text-sm font-medium text-stone-200">
                    {selectedRole?.title}
                  </p>
                  <p className="text-xs text-stone-600 mt-0.5">Selected role</p>
                </div>
              </div>

              <Button variant="outline" size="sm" onClick={() => setRole(null)}>
                Change
              </Button>
            </div>
          </div>
        )}


      </div>
    </div>
  )
}

export default OnboardingPage