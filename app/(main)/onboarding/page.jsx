"use client"

import { GoldTitle, GrayTitle, SectionLabel } from '@/components/reusables'
import { ONBOARDING_ROLES } from '@/lib/data'
import React from 'react'
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { YEARS_OPTIONS, CATEGORIES } from '@/lib/data'
import { useRouter } from 'next/navigation'
import useFetch from '@/hooks/use-fetch'
import { completeOnboarding } from '@/actions/onboarding'

const OnboardingPage = () => {

  const router = useRouter();

  const { data, loading, error, fn: onBoardingFn } = useFetch(completeOnboarding);

  const [role, setRole] = useState(null);
  const [form, setForm] = useState({
    title: "",
    company: "",
    yearsExp: "",
    bio: "",
    categories: [],
  });

  useEffect(() => {
    if(data && !loading) {
      router.push(role==="INTERVIEWER" ? "/dashboard" : "/explore");
    }
  }, [data, loading]);

  const toggleCategory = (val) => {
    setForm((prev) => ({
      ...prev,
      categories: prev.categories.includes(val)
        ? prev.categories.filter((c) => c !== val)
        : [...prev.categories, val],
    }));
  }

  const isInterviewerValid = 
    form.title.trim()  && 
    form.company.trim() &&
    form.yearsExp &&
    form.bio.trim() &&
    form.categories.length > 0;

  const canSubmit = role === "INTERVIEWEE" || (role === "INTERVIEWER" && isInterviewerValid);

  const handleSubmit = () => {
    if (!canSubmit) return;
    onBoardingFn({ 
      role,
      ...(role === "INTERVIEWER" && {
        title: form.title,
        company: form.company,
        yearsExp: Number(form.yearsExp),
        bio: form.bio,
        categories: form.categories,
      }),
    });
  }
  
  const selectedRole = ONBOARDING_ROLES.find((r) => r.value === role)
  const Icon = selectedRole?.icon

  return (
    <div className='editorial-page product-surface relative isolate min-h-[calc(100dvh-4rem)] overflow-hidden px-5 py-12 sm:px-8 sm:py-16 lg:px-14 lg:py-20'>
      <div className='w-full max-w-5xl mx-auto'>
        <div className='mb-10 max-w-2xl sm:mb-14'>
          <SectionLabel>Welcome to Oralix</SectionLabel>
          <h1 className='mt-3 max-w-3xl font-heading text-6xl leading-[0.8] tracking-[-0.045em] sm:text-8xl'>
            <GrayTitle>How will you be</GrayTitle>
            <br/>
            <span className='text-[#034f46]'>using Oralix?</span>
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-6 text-[#6d6d63] sm:text-base sm:leading-7">
            This helps us personalise your experience.
              <span className="text-[#1a1a1a]">
              {" "}
              You can&apos;t change this later.
            </span>
          </p>
        </div>

        {!role && (
          <div className="grid w-full gap-4 md:grid-cols-2">
            {ONBOARDING_ROLES.map((r) => (
              <button
                key={r.value}
                type="button"
                onClick={() => setRole(r.value)}
                className="paper-card group relative min-h-72 overflow-hidden p-7 text-left transition-[background-color,transform] duration-300 hover:-translate-y-1 hover:bg-[#f0d7ff] focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#034f46] focus-visible:ring-offset-2 sm:p-10"
              >
                <span className="pointer-events-none absolute -right-12 -top-12 size-44 rounded-full border-2 border-[#034f46]/20 transition-transform duration-500 group-hover:scale-125" />
                <span className="relative mb-16 flex size-12 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff] text-xl sm:mb-20">
                  <r.icon className="h-5 w-5 text-[#034f46]" />
                </span>
                <h3 className="relative max-w-xs font-heading text-4xl font-normal leading-[.88] tracking-[-0.045em] sm:text-5xl">
                  {r.title}
                </h3>
                <p className="relative mt-4 max-w-sm text-sm leading-6 text-[#6d6d63]">
                  {r.desc}
                </p>
              </button>
            ))}
          </div>
        )}


        {role && (
          <div className="flex flex-col gap-5">
              <div className="paper-card flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
              <div className="flex items-center gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff] text-base">
                  {Icon ? <Icon className="w-4 h-4 text-[#034f46]" /> : null}
                </span>

                <div>
                  <p className="text-sm font-medium">
                    {selectedRole?.title}
                  </p>
                  <p className="mt-0.5 text-xs text-[#6d6d63]">Selected Role</p>
                </div>
              </div>

              <Button variant="outline-gradient-amber-hover" size="sm" onClick={() => setRole(null)} className="self-start sm:self-auto">
                Change
              </Button>
            </div>

            {/* Interview form */}

             {/* interviewer form */}
              {role === "INTERVIEWER" && (
                <div className="paper-card flex flex-col gap-7 p-5 sm:p-8">
                  {/* Title + Company */}
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="title" className="text-[#1a1a1a]">Current title</Label>
                      <Input
                        id="title"
                        placeholder="Senior Software Engineer"
                        value={form.title}
                        className="border-[#1a1a1a]/25 bg-white/45 text-[#1a1a1a] placeholder:text-[#6d6d63] focus-visible:border-[#034f46] focus-visible:ring-[#034f46]/25"
                        onChange={(e) =>
                          setForm((p) => ({ ...p, title: e.target.value }))
                        }
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <Label htmlFor="company" className="text-[#1a1a1a]">Company</Label>
                      <Input
                        id="company"
                        placeholder="Google, Meta, Startup…"
                        value={form.company}
                        className="border-[#1a1a1a]/25 bg-white/45 text-[#1a1a1a] placeholder:text-[#6d6d63] focus-visible:border-[#034f46] focus-visible:ring-[#034f46]/25"
                        onChange={(e) =>
                          setForm((p) => ({ ...p, company: e.target.value }))
                        }
                      />
                    </div>
                  </div>

                  {/* years */}
                  <div>
                    <p className="mb-3 text-sm font-medium text-[#1a1a1a]">Experience</p>
                    <div className="flex flex-wrap gap-2">
                      {YEARS_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() =>
                            setForm((p) => ({ ...p, yearsExp: opt.value }))
                          }
                          className={`rounded-[12px] border-2 px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#034f46] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffffeb] ${
                            form.yearsExp === opt.value
                              ? "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a]"
                              : "border-[#1a1a1a]/20 bg-white/45 text-[#6d6d63] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                          }`}
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* categories */}
                  <div>
                    <p className="mb-3 text-sm font-medium text-[#1a1a1a]">Interview focus</p>
                    <div className="flex flex-wrap gap-2">
                      {CATEGORIES.map((cat) => {
                        if (!cat?.value) return null;

                        const active = form.categories.includes(cat.value);

                        return (
                          <button
                            key={cat.value}
                            type="button"
                            onClick={() => toggleCategory(cat.value)}
                            className={`rounded-[12px] border-2 px-3 py-2 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#034f46] focus-visible:ring-offset-2 focus-visible:ring-offset-[#ffffeb] ${
                              active
                                ? "border-[#1a1a1a] bg-[#034f46] text-[#ffffeb]"
                                : "border-[#1a1a1a]/20 bg-white/45 text-[#6d6d63] hover:border-[#1a1a1a] hover:text-[#1a1a1a]"
                            }`}
                          >
                            {cat.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* bio */}
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="bio" className="text-[#1a1a1a]">About your interviews</Label>
                    <Textarea
                      id="bio"
                      rows={4}
                      maxLength={300}
                      placeholder="Tell interviewees about your background, what you specialise in, and what they can expect from a session with you."
                      value={form.bio}
                      className="border-[#1a1a1a]/25 bg-white/45 px-3 py-3 text-[#1a1a1a] placeholder:text-[#6d6d63] focus-visible:border-[#034f46] focus-visible:ring-[#034f46]/25"
                      onChange={(e) =>
                        setForm((p) => ({ ...p, bio: e.target.value }))
                      }
                    />
                  </div>
                </div>
              )}

            <Button variant="default-gradient-amber-hover" size="lg" className="h-12 w-full" disabled={!canSubmit || loading} onClick={handleSubmit}>
              {loading
              ? "Setting up your account..."
              : role === "INTERVIEWER"
              ? "Create interviewer profile"
              : "Explore interviewers"}
            </Button>

          </div>
        )}


      </div>
    </div>
  )
}

export default OnboardingPage
