"use client";

import Link from "next/link";
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "motion/react";
import { ArrowDownRight, ArrowUpRight, Check, CircleDollarSign, MessageSquare, Play, Sparkles, Users, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import PricingSection from "@/components/PricingSection";
import HomeMotion from "@/components/HomeMotion";
import Silk from "@/components/Silk";

const workflow = [
  { title: "Find your person.", body: "Search by the work, perspective, and question that matters to you.", tone: "paper" },
  { title: "Make it a room.", body: "Choose a real time, then talk without performing for a machine.", tone: "ink" },
  { title: "Keep the signal.", body: "Leave with sharper thinking. Interviewers leave with credits they can withdraw.", tone: "teal" },
];

function InteractiveField({ reduced }) {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 70, damping: 20 });
  const y = useSpring(pointerY, { stiffness: 70, damping: 20 });
  const translateX = useTransform(x, [-1, 1], [-30, 30]);
  const translateY = useTransform(y, [-1, 1], [-22, 22]);

  return <div className="absolute inset-0 overflow-hidden bg-[#1a1a1a]" onPointerMove={(event) => {
    if (reduced) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width * 2 - 1);
    pointerY.set((event.clientY - bounds.top) / bounds.height * 2 - 1);
  }} onPointerLeave={() => { pointerX.set(0); pointerY.set(0); }} aria-hidden="true">
    <motion.div className="absolute -inset-[12%]" style={reduced ? undefined : { x: translateX, y: translateY }}>
      <svg className="h-full w-full opacity-60" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
        <defs>
          <pattern id="oralix-field-grid" width="96" height="96" patternUnits="userSpaceOnUse"><path d="M96 0H0V96" stroke="#ffffeb" strokeOpacity=".08" /></pattern>
        </defs>
        <rect width="1440" height="900" fill="url(#oralix-field-grid)" />
        <g stroke="#f0d7ff" strokeOpacity=".28" strokeWidth="1.5">
          <path d="M-120 690C180 390 410 510 620 250S1070 40 1560 260" />
          <path d="M-180 770C140 430 420 570 650 300S1100 110 1600 320" />
          <path d="M-210 850C130 500 430 650 700 350S1170 170 1630 390" />
        </g>
        <g stroke="#034f46" strokeOpacity=".72" strokeWidth="2">
          <circle cx="1010" cy="330" r="170" /><circle cx="1010" cy="330" r="250" /><circle cx="1010" cy="330" r="340" />
          <path d="M1010 0V900M560 330H1440" strokeOpacity=".35" />
        </g>
        <g fill="#ffa946">
          <circle className="field-orb field-orb-one" cx="1010" cy="330" r="7" /><circle className="field-orb field-orb-two" cx="1300" cy="590" r="4" /><circle className="field-orb field-orb-three" cx="670" cy="230" r="5" />
        </g>
      </svg>
    </motion.div>
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_40%,rgba(3,79,70,.3),transparent_32%),linear-gradient(90deg,#1a1a1a_0%,rgba(26,26,26,.92)_34%,rgba(26,26,26,.35)_100%)]" />
  </div>;
}

function SignalWave() {
  const bars = [12, 24, 17, 31, 19, 38, 25, 14, 32, 20, 36, 16, 27, 12];
  return <div className="flex h-10 items-center gap-1" aria-label="Live conversation waveform">{bars.map((height, index) => <motion.span key={index} className="w-1 rounded-full bg-[#f0d7ff]" initial={{ height: 8 }} animate={{ height }} transition={{ delay: index * 0.04, duration: 0.8, repeat: Infinity, repeatType: "mirror" }} />)}</div>;
}

function InterviewArtifact() {
  return <div data-home-preview className="relative w-full max-w-[38rem] rotate-[2deg] transition-transform duration-700 hover:rotate-0">
    <div className="absolute -inset-5 rounded-[48px] border border-[#f0d7ff]/30" />
    <div className="relative overflow-hidden rounded-[34px] border-2 border-[#1a1a1a] bg-[#ffffeb] p-3 text-[#1a1a1a] sm:p-4">
      <div className="flex items-center justify-between border-b-2 border-[#1a1a1a]/10 pb-3 text-[0.65rem] font-medium tracking-[0.08em] text-[#6d6d63]"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#ffa946]" /> Live Room</span><span className="font-mono">04 / 08</span></div>
      <div className="grid gap-3 py-3 sm:grid-cols-[1.18fr_.82fr]">
        <div className="flex min-h-[19rem] flex-col justify-between rounded-[25px] bg-[#1a1a1a] p-5 text-[#ffffeb] sm:min-h-[22rem] sm:p-6">
          <div className="flex justify-between text-[0.65rem] tracking-[0.08em] text-[#ffffeb]/50"><span>Product Sense</span><span>42:18</span></div>
          <div><p className="font-heading text-[clamp(2.6rem,5vw,4.7rem)] leading-[.8] tracking-[-.05em]">A better answer starts with a better question.</p><p className="mt-5 max-w-xs text-sm leading-6 text-[#ffffeb]/60">A real conversation, shaped around the next useful thought.</p></div>
          <div className="flex items-center justify-between border-t border-[#ffffeb]/15 pt-4"><div className="flex items-center gap-3"><SignalWave /><span className="text-xs text-[#ffffeb]/55">Listening</span></div><span className="grid size-9 place-items-center rounded-full bg-[#f0d7ff] text-[#1a1a1a]"><Video size={15} /></span></div>
        </div>
        <div className="flex min-h-[19rem] flex-col rounded-[25px] bg-[#f0d7ff] p-4 sm:min-h-[22rem] sm:p-5"><div className="flex items-center justify-between text-xs font-medium"><span>room notes</span><Sparkles size={15} className="text-[#034f46]" /></div><div className="mt-8 space-y-3">{["Clarify the tradeoff", "Probe the boundary", "Ask for the edge case"].map((prompt, index) => <div key={prompt} className={`border-l-2 px-3 py-2 text-xs leading-5 ${index === 0 ? "border-[#034f46] text-[#1a1a1a]" : "border-[#1a1a1a]/20 text-[#6d6d63]"}`}>{prompt}</div>)}</div><div className="mt-auto flex items-center gap-2 border-t border-[#1a1a1a]/15 pt-3 text-xs text-[#6d6d63]"><MessageSquare size={14} /> chat stays open</div></div>
      </div>
    </div>
    <div className="absolute -bottom-5 -left-5 flex items-center gap-3 rounded-full border-2 border-[#1a1a1a] bg-[#ffa946] px-4 py-2 text-xs font-medium text-[#1a1a1a]"><span className="size-2 rounded-full bg-[#1a1a1a]" /> interviewer is live</div>
  </div>;
}

export default function HomeExperience() {
  const reduce = useReducedMotion();
  return <main className="overflow-hidden bg-[#ffffeb] text-[#1a1a1a]">
    <HomeMotion />
    <section className="grain relative isolate min-h-[min(920px,100svh)] overflow-hidden bg-[#1a1a1a] text-[#ffffeb]">
      <InteractiveField reduced={reduce} />
      {!reduce && <div className="pointer-events-none absolute inset-0 z-[1] opacity-20 mix-blend-screen" aria-hidden="true"><Silk speed={2.2} scale={1.15} color="#034f46" noiseIntensity={1.4} rotation={0.18} /></div>}
      <div className="relative z-10 mx-auto flex min-h-[min(920px,100svh)] w-full max-w-[1320px] flex-col px-5 pb-12 pt-28 sm:px-8 lg:px-12 lg:pt-36">
        <div className="grid flex-1 items-center gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-16"><div data-home-hero className="max-w-2xl"><p className="mb-7 flex items-center gap-3 text-xs font-medium tracking-[0.08em] text-[#f0d7ff]"><span className="h-px w-10 bg-[#f0d7ff]" /> Interview Practice, Made Human</p><h1 className="max-w-3xl font-heading text-[clamp(4.4rem,9vw,9.4rem)] leading-[.86] tracking-[-.055em]">Make the next answer feel <span className="text-[#f0d7ff]">possible.</span></h1><p className="mt-8 max-w-md text-base leading-7 text-[#ffffeb]/70 sm:text-lg">Oralix brings thoughtful interviewees and experienced interviewers into the same room—then makes the value of showing up visible.</p><div className="mt-8 flex flex-wrap items-center gap-3"><Button asChild size="lg"><Link href="/onboarding">Find Your Room <ArrowUpRight size={18} /></Link></Button><Button asChild size="lg" variant="outline-gradient-stone"><Link href="/explore">Meet An Interviewer <ArrowDownRight size={17} /></Link></Button></div></div><div className="flex justify-end lg:pr-4"><InterviewArtifact /></div></div>
        <div className="mt-12 flex flex-wrap items-center justify-between gap-5 border-t border-[#ffffeb]/20 pt-5 text-xs text-[#ffffeb]/55"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-[#ffa946]" /> Built For Both Sides Of The Table</span><span className="flex items-center gap-2"><ArrowDownRight size={14} /> Scroll To See The Exchange</span></div>
      </div>
    </section>
    <section className="border-b-2 border-[#1a1a1a] bg-[#f0d7ff] px-5 py-5 sm:px-8"><div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 text-sm font-medium"><span>One Platform, Two Kinds Of Momentum</span><div className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-[#1a1a1a]/65"><span>Find A Focused Conversation</span><span>Earn For Taking One</span><span>Keep The Signal</span></div></div></section>
    <section className="editorial-grid px-5 py-28 sm:px-8 lg:px-12 lg:py-40"><div className="mx-auto max-w-[1200px]"><div className="grid items-start gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-24"><div data-story-copy className="h-fit lg:sticky lg:top-28"><h2 className="max-w-lg font-heading text-[clamp(3.5rem,6vw,6.4rem)] leading-[.86] tracking-[-.05em]">The Room Is The Product.</h2><p className="mt-7 max-w-md text-base leading-7 text-[#6d6d63]">Everything around the conversation should make the next step feel clearer: who to meet, when to meet, and what your time is worth.</p></div><div className="grid gap-4">{workflow.map((item, index) => <motion.article key={item.title} data-stack-card initial={reduce ? false : { opacity: 0, y: 24 }} whileInView={reduce ? undefined : { opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .65, delay: index * .08 }} className={`group relative min-h-[22rem] overflow-hidden rounded-[36px] border-2 border-[#1a1a1a] p-7 sm:min-h-[25rem] sm:p-10 ${item.tone === "ink" ? "bg-[#1a1a1a] text-[#ffffeb]" : item.tone === "teal" ? "bg-[#034f46] text-[#ffffeb]" : "bg-[#ffffeb]"}`}><span className="absolute right-8 top-8 font-mono text-xs opacity-45">{String(index + 1).padStart(2, "0")}</span><div className="absolute -right-12 -bottom-20 size-56 rounded-full border border-current opacity-15 transition-transform duration-700 group-hover:scale-125" /><div className="relative flex h-full flex-col justify-between"><div className="flex size-11 items-center justify-center rounded-full border-2 border-current/40 bg-[#f0d7ff] text-[#1a1a1a]">{index === 0 ? <Users size={18} /> : index === 1 ? <Video size={18} /> : <CircleDollarSign size={18} />}</div><div><h3 className="max-w-xl font-heading text-5xl leading-[.9] tracking-[-.04em] sm:text-6xl">{item.title}</h3><p className={`mt-5 max-w-md text-sm leading-6 ${item.tone === "paper" ? "text-[#6d6d63]" : "text-[#ffffeb]/62"}`}>{item.body}</p></div></div></motion.article>)}</div></div></div></section>
    <section id="exchange" className="mx-3 overflow-hidden rounded-[52px] bg-[#1a1a1a] px-5 py-24 text-[#ffffeb] sm:mx-5 sm:px-8 lg:mx-8 lg:px-12 lg:py-32"><div className="mx-auto max-w-[1200px]"><div className="grid gap-10 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><p className="mb-6 text-xs font-medium tracking-[0.08em] text-[#f0d7ff]">The Exchange</p><h2 className="max-w-2xl font-heading text-[clamp(3.5rem,6vw,6.4rem)] leading-[.86] tracking-[-.05em]">One Side Gets Sharper. The Other Gets Paid.</h2></div><p className="max-w-md text-base leading-7 text-[#ffffeb]/62 lg:justify-self-end">Credits connect the generous act of taking an interview to a real, withdrawable reward.</p></div><div data-story-text className="mt-12 grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-stretch"><div className="rounded-[32px] border-2 border-[#ffffeb]/20 bg-[#ffffeb]/5 p-7 sm:p-9"><span className="text-xs text-[#ffffeb]/48">For The Interviewee</span><h3 className="mt-14 font-heading text-5xl leading-[.9]">A Clearer Next Move.</h3><ul className="mt-8 space-y-3 text-sm text-[#ffffeb]/62"><li className="flex gap-3"><Check size={16} className="shrink-0 text-[#f0d7ff]" /> Choose The Right Perspective</li><li className="flex gap-3"><Check size={16} className="shrink-0 text-[#f0d7ff]" /> Turn Feedback Into Momentum</li></ul></div><div className="grid place-items-center"><div className="grid size-16 place-items-center rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a] md:mx-3"><CircleDollarSign size={24} /></div></div><div className="rounded-[32px] bg-[#034f46] p-7 text-[#ffffeb] sm:p-9"><span className="text-xs text-[#ffffeb]/58">For The Interviewer</span><h3 className="mt-14 font-heading text-5xl leading-[.9]">A Reason To Share The Room.</h3><ul className="mt-8 space-y-3 text-sm text-[#ffffeb]/65"><li className="flex gap-3"><Check size={16} className="shrink-0 text-[#f0d7ff]" /> Set Time On Your Rhythm</li><li className="flex gap-3"><Check size={16} className="shrink-0 text-[#f0d7ff]" /> Convert Credits To Money</li></ul></div></div></div></section>
    <section className="px-5 py-28 sm:px-8 lg:px-12 lg:py-40"><div className="mx-auto max-w-[1200px]"><div className="mb-12 flex flex-col justify-between gap-6 border-b-2 border-[#1a1a1a] pb-8 md:flex-row md:items-end"><div><p className="editorial-label">choose your pace</p><h2 className="mt-5 max-w-2xl font-heading text-[clamp(3.5rem,6vw,6.2rem)] leading-[.8] tracking-[-.05em]">More room to think.</h2></div><p className="max-w-sm text-sm leading-6 text-[#6d6d63]">Plans add credits for interviewees. The live experience stays human for everyone.</p></div><PricingSection /></div></section>
    <section className="px-5 pb-24 sm:px-8 lg:px-12 lg:pb-32"><div className="grain relative mx-auto max-w-[1200px] overflow-hidden rounded-[52px] bg-[#f0d7ff] px-7 py-16 sm:px-14 sm:py-24 lg:px-20"><div className="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="text-xs font-medium tracking-[0.08em] text-[#034f46]">The Next Useful Room</p><h2 className="mt-8 max-w-3xl font-heading text-[clamp(3.8rem,7vw,7.5rem)] leading-[.9] tracking-[-.055em]">Practice Can Feel Like Progress.</h2></div><div className="flex flex-col gap-3 sm:flex-row lg:flex-col"><Button asChild size="lg"><Link href="/onboarding">Enter Oralix <ArrowUpRight size={18} /></Link></Button><Button asChild size="lg" variant="outline"><Link href="/explore">Explore Interviewers <Play size={16} /></Link></Button></div></div></div></section>
  </main>;
}
