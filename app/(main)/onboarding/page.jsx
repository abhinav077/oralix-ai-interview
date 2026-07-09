import { GoldTitle, GrayTitle, SectionLabel } from '@/components/reusables'
import React from 'react'

const OnboardingPage = () => {
  return (
    <div className='min-h-screen bg-black px-6 py-24 flex flex-col items-center'>
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
      </div>
    </div>
  )
}

export default OnboardingPage