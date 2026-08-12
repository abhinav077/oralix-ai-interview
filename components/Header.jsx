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
    <nav className='fixed inset-x-0 top-0 z-50 isolate px-3 pt-3 sm:px-5'>
      <div className='mx-auto flex min-h-14 w-full max-w-6xl items-center justify-between gap-3 rounded-lg border border-border bg-background/95 px-3 py-2 shadow-sm backdrop-blur-md sm:px-5'>
        <Link
          href={'/'}
          className='group flex shrink-0 items-center gap-2 rounded-md px-1.5 py-1 text-foreground transition-colors duration-200 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background'
        >
          <span className='grid size-8 place-items-center rounded-full border border-border bg-primary/10 text-primary transition-transform duration-200 group-hover:rotate-6'>
            <MessagesSquare size={16} />
          </span>
          <span className='text-lg font-semibold max-[359px]:sr-only'>Oralix</span>
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
