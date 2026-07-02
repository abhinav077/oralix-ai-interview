import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import { MessagesSquare } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  return (
    <nav className='fixed top-0 left-1/2 -translate-x-1/2 w-full lg:mx-auto lg:max-w-[1450px] z-50 flex items-center justify-between px-10 py-3 border-b border-white/7 backdrop-blur-xl'>

    {/* Logo */}
    <div className='flex items-center gap-2 text-lg font-bold'>
      <Link href={'/'} className='flex items-center gap-2'>
        <MessagesSquare />
        <span>Oralix</span>
      </Link>
    </div>

    {/* Redirecting Logic */}

    {/* Sign In / Sign Up Buttons */}
    <div className='flex items-center gap-3'>
        <Show when='signed-out'>
            <SignInButton mode='modal'>
                <Button variant='ghost'> Sign In</Button> 
            </SignInButton>
              <SignUpButton mode='modal'>
                <Button variant='ghost'> Get Started</Button> 
              </SignUpButton>
        </Show>
        <Show when='signed-in'>
            <UserButton />
        </Show>
    </div>

    </nav>
  )
}

export default Header