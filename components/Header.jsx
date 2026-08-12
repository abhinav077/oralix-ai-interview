import { SignInButton, SignUpButton, Show, UserButton } from '@clerk/nextjs'
import React from 'react'
import { Button } from './ui/button'
import { CalendarDays, LayoutDashboard, MessagesSquare, Users } from 'lucide-react';
import Link from 'next/link';
import { checkUser } from '../lib/checkUser';
import CreditButton from './CreditButton';   
import RoleRedirect from './RoleRedirect';


const Header = async () => {
  const user = await checkUser();

  return (
    <nav className='fixed inset-x-0 top-0 z-50 isolate bg-transparent px-3 pt-3 sm:px-5'>
      <div className='mx-auto flex min-h-14 w-full max-w-[1200px] items-center justify-between gap-3 rounded-full border-2 border-[#1a1a1a] bg-[#ffffeb]/95 px-3 py-2 backdrop-blur-md sm:px-5'>
        <Link
          href={'/'}
          className='group flex shrink-0 items-center gap-2 rounded-full px-1.5 py-1 text-[#1a1a1a] transition-colors duration-200 hover:text-[#034f46] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#034f46] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffffeb]'
        >
          <span className='grid size-8 place-items-center rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] transition-transform duration-200 group-hover:rotate-6'>
            <MessagesSquare size={16} />
          </span>
          <span className='font-heading text-2xl tracking-[-0.03em] max-[359px]:sr-only'>Oralix</span>
        </Link>

        {/* Redirecting Logic */}
        {user && <RoleRedirect role={user.role} />}

        {/* Sign In / Sign Up Buttons */}
        <div className='flex shrink-0 items-center justify-end gap-1 sm:gap-2'>
        <Show when='signed-out'>
            <SignInButton mode='modal'>
                <Button size='sm' variant='outline'>Sign In</Button>
            </SignInButton>
              <SignUpButton mode='modal'>
                <Button size='sm' variant='default'>Get Started</Button>
              </SignUpButton>
        </Show>
        <Show when='signed-in'>

            {/* Links */}
            {user?.role === "INTERVIEWER" && (
                <Button size="sm" variant="outline" asChild>
                  <Link href="/dashboard">
                  <LayoutDashboard size={15} />
                  <span>Dashboard</span>
                </Link>
              </Button>
            )}

            {user?.role === "INTERVIEWEE" && (
              <>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/explore" aria-label="Explore interviewers">
                    <Users size={16} />
                    <span>Explore</span>
                  </Link>
                </Button>
                <Button size="sm" variant="outline" asChild>
                  <Link href="/appointments" aria-label="My appointments">
                    <CalendarDays size={16} />
                    <span>Appointments</span>
                  </Link>
                </Button>
              </>
            )}

            <div className="shrink-0">
              <CreditButton
                role={user?.role === "INTERVIEWER" ? "INTERVIEWER" : "INTERVIEWEE"}
                credits={
                  (user?.role === "INTERVIEWER"
                    ? user?.creditBalance
                    : user?.credits) ?? 0
                }
              />
            </div>

            <div className="shrink-0"><UserButton /></div>
        </Show>
        </div>
      </div>
    </nav>
  )
}

export default Header
