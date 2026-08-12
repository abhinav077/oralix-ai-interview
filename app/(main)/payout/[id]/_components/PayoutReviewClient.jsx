/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { approvePayout } from "@/actions/payout";
import useFetch from "@/hooks/use-fetch";
import { Check, LoaderCircle, ShieldCheck } from "lucide-react";

export default function PayoutReviewClient({ payout }) {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(payout.status === "PROCESSED");

  const { data, loading, error, fn: approveFn } = useFetch(approvePayout);

  useEffect(() => {
    if (data?.success) setDone(true);
  }, [data]);

  if (done) {
    return (
      <div className="flex flex-col items-center gap-4 border border-green-500/20 bg-green-500/5 p-10 text-center">
        <span className="grid size-14 place-items-center rounded-full border border-green-500/25 bg-green-500/10">
          <Check size={23} className="text-green-400" />
        </span>
        <p className="font-heading text-2xl text-stone-100">Withdrawal approved</p>
        <p className="text-xs leading-5 text-stone-500">
          {payout.interviewerName} · ${payout.netAmount.toFixed(2)} via {payout.paymentMethod}
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-7">
      <div className="flex items-center gap-3 border-b border-white/10 pb-5">
        <span className="grid size-9 place-items-center border border-amber-300/25 bg-amber-300/10">
          <ShieldCheck size={18} className="text-amber-300" strokeWidth={1.5} />
        </span>
        <div>
          <p className="font-heading text-2xl tracking-tight text-stone-100">Payout verification</p>
          <p className="text-xs text-stone-500">Confirm the recipient and final amount.</p>
        </div>
      </div>

      <div className="border border-white/10 bg-black/15">
        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          <div className="flex flex-col gap-1 bg-[#11110f] p-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">Interviewer</span>
            <span className="text-sm text-stone-200">{payout.interviewerName}</span>
          </div>
          <div className="flex flex-col gap-1 bg-[#11110f] p-4">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">Email</span>
            <span className="truncate text-sm text-stone-200">{payout.interviewerEmail}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 p-4">
          <div className="flex justify-between text-xs">
            <span className="text-stone-500">Credits</span>
            <span className="text-stone-300">{payout.credits}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-stone-500">Platform fee (20%)</span>
            <span className="text-red-400">− ${payout.platformFee.toFixed(2)}</span>
          </div>
          <Separator className="my-1 bg-white/10" />
          <div className="flex items-end justify-between">
            <span className="text-sm text-stone-300">Pay out</span>
            <span className="font-heading text-3xl leading-none tracking-tight text-amber-300">
              ${payout.netAmount.toFixed(2)}
            </span>
          </div>
          <div className="flex justify-between gap-4 border-t border-white/10 pt-3 text-xs">
            <span className="shrink-0 text-stone-500">Send to</span>
            <span className="text-right text-stone-300">
              {payout.paymentMethod} · {payout.paymentDetail}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="admin-password" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
          Admin password
        </Label>
        <Input
          id="admin-password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) =>
            e.key === "Enter" &&
            password.trim() &&
            approveFn({ payoutId: payout.id, adminPassword: password })
          }
          placeholder="Enter password…"
          className="rounded-none border-white/10 bg-[#11110f] text-stone-100"
        />
      </div>

      {error && (
        <p className="border-l-2 border-red-400 bg-red-400/5 px-3 py-2 text-xs text-red-300" role="alert">
          {error?.message || error}
        </p>
      )}

      <Button
        variant="gold"
        disabled={!password.trim() || loading}
        onClick={() => approveFn({ payoutId: payout.id, adminPassword: password })}
        className="w-full gap-2"
      >
        {loading ? <><LoaderCircle size={15} className="animate-spin" /> Approving…</> : `Approve $${payout.netAmount.toFixed(2)} →`}
      </Button>
    </div>
  );
}
