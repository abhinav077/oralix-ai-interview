"use client";

import { useAuth, SignInButton } from "@clerk/nextjs";
import { CheckoutButton } from "@clerk/nextjs/experimental";
import { Button } from "@/components/ui/button";
import { PLANS } from "@/lib/data";
import { Check } from "lucide-react";

export default function PricingSection() {
  const { has, userId } = useAuth();
  const isSignedIn = !!userId;
  const isOnStarter = isSignedIn && has({ plan: "starter" });
  const isOnPro = isSignedIn && has({ plan: "pro" });
  const activePlanSlug = isOnPro ? "pro" : isOnStarter ? "starter" : isSignedIn ? "free" : null;

  return <div className="grid grid-cols-1 gap-4 md:grid-cols-3">{PLANS.map((plan) => {
    const isActive = activePlanSlug === plan.slug;
    return <article key={plan.name} className={`relative flex h-full flex-col rounded-[32px] border-2 border-[#1a1a1a] p-7 transition duration-300 hover:-translate-y-1 sm:p-9 ${plan.featured ? "bg-[#034f46] text-[#ffffeb]" : "bg-[#ffffeb] hover:bg-[#f0d7ff]"} ${isActive ? "ring-4 ring-[#ffa946]/35" : ""}`}>
      {plan.featured && !isActive && <span className="absolute -top-3 left-7 rounded-full border-2 border-[#1a1a1a] bg-[#ffa946] px-3 py-1 text-xs font-medium">Most Popular</span>}
      <p className={`mb-5 text-xs font-medium tracking-[0.08em] ${plan.featured ? "text-[#ffffeb]/60" : "text-[#6d6d63]"}`}>{plan.name}</p>
      <div className="mb-1.5 flex items-end gap-1"><span className={`font-heading text-6xl leading-none tracking-[-.04em] ${plan.featured ? "text-[#f0d7ff]" : "text-[#1a1a1a]"}`}>{plan.price}</span><span className={`mb-1.5 text-sm ${plan.featured ? "text-[#ffffeb]/55" : "text-[#6d6d63]"}`}>/month</span></div>
      <p className={`mb-7 text-sm ${plan.featured ? "text-[#f0d7ff]" : "text-[#034f46]"}`}>{plan.credits}</p>
      <div className={`mb-7 h-px ${plan.featured ? "bg-[#ffffeb]/15" : "bg-[#1a1a1a]/15"}`} />
      <ul className="mb-9 flex-1 space-y-3">{plan.features.map((feature) => <li key={feature} className={`flex items-start gap-2.5 text-sm ${plan.featured ? "text-[#ffffeb]/65" : "text-[#6d6d63]"}`}><Check className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${plan.featured ? "text-[#f0d7ff]" : "text-[#034f46]"}`} />{feature}</li>)}</ul>
      {isActive ? <Button variant={plan.featured ? "outline-gradient-stone" : "default"} disabled className="w-full"><Check className="h-4 w-4" /> Current Plan</Button> : plan.planId === null ? (isSignedIn ? <Button variant="outline" disabled className="w-full">Default Plan</Button> : <SignInButton mode="modal"><Button variant="outline" className="w-full">Get Started Free</Button></SignInButton>) : isSignedIn ? <CheckoutButton planId={plan.planId} planPeriod="month" checkoutProps={{ appearance: { elements: { drawerRoot: { zIndex: 2000 } } } }}><Button variant={plan.featured ? "outline-gradient-stone" : "outline"} className="w-full">{activePlanSlug === "pro" && plan.slug === "starter" ? "Downgrade" : activePlanSlug === "starter" && plan.slug === "pro" ? "Upgrade →" : "Get Started →"}</Button></CheckoutButton> : <SignInButton mode="modal"><Button variant={plan.featured ? "outline-gradient-stone" : "outline"} className="w-full">Get Started →</Button></SignInButton>}
    </article>;
  })}</div>;
}
