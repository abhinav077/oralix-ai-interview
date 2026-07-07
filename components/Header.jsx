import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import { CalendarDays, MessagesSquare, Users } from 'lucide-react';
import Link from 'next/link';
import { checkUser } from '../lib/checkUser';
import CreditButton from './CreditButton';   
import RoleRedirect from './RoleRedirect';

const Header = async () => {
  const user = await checkUser();

  return (
    <nav className='fixed top-0 left-1/2 -translate-x-1/2 w-full lg:mx-auto lg:max-w-[1450px] z-50 flex items-center justify-between px-10 py-3 border-b border-white/7 backdrop-blur-xl  border-l border-r border-neutral-800'>

    {/* Logo */}
    <div className='flex items-center gap-2 text-lg font-bold'>
      <Link href={'/'} className='flex items-center gap-2'>
        <MessagesSquare />
        <span>Oralix</span>
      </Link>
    </div>

    {/* Redirecting Logic */}
    {/* {user && <RoleRedirect role={user.role} />} */}

    {/* Sign In / Sign Up Buttons */}
    <div className='flex items-center gap-3'>
        <Show when='signed-out'>
            <SignInButton mode='modal'>
                <Button variant='ghost-gradient-stone-hover'> Sign In</Button> 
            </SignInButton>
              <SignUpButton mode='modal'>
                <Button variant='ghost-gradient-amber-hover'> Get Started</Button> 
              </SignUpButton>
        </Show>
        <Show when='signed-in'>

            {/* Links */}
            {user?.role === "INTERVIEWER" && (
              <Button variant="ghost-gradient-stone-hover" asChild>
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            )}

            {user?.role === "INTERVIEWEE" && (
              <>
                <Button variant="ghost-gradient-stone-hover" asChild>
                  <Link href="/explore">
                    <Users size={16} />
                    <span className="hidden md:inline">Explore</span>
                  </Link>
                </Button>
                <Button variant="outline-gradient-amber-hover" asChild>
                  <Link href="/appointments">
                    <CalendarDays size={16} />
                    <span className="hidden md:inline">My Appointments</span>
                  </Link>
                </Button>
              </>
            )}

            <CreditButton
              role={user?.role === "INTERVIEWER" ? "INTERVIEWER" : "INTERVIEWEE"}
              credits={
                (user?.role === "INTERVIEWER"
                  ? user?.creditBalance
                  : user?.credits) ?? 0
              }
            />

            <UserButton />
        </Show>
    </div>
    </nav>
  )
}

export default Header