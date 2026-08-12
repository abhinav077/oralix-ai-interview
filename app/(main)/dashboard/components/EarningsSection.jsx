/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { requestWithdrawal } from "@/actions/dashboard";
import useFetch from "@/hooks/use-fetch";
import { Check, CircleCheck, LoaderCircle, TrendingUp, Wallet } from "lucide-react";
import { formatDate } from "@/lib/helpers";

const PAYMENT_METHODS = [
  { value: "PAYPAL", label: "PayPal", placeholder: "your@paypal.com" },
  {
    value: "BANK",
    label: "Bank Transfer",
    placeholder: "Account / routing info",
  },
  { value: "UPI", label: "UPI", placeholder: "your@upi" },
];

const PLATFORM_FEE = 0.2;

export default function EarningsSection({ stats, history }) {
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [method, setMethod] = useState("PAYPAL");
  const [detail, setDetail] = useState("");

  const { data, loading, error, fn: withdrawFn } = useFetch(requestWithdrawal);

  const balance = (stats?.creditBalance ?? 0) * 5;
  const totalEarnedDollars = (stats?.totalEarned ?? 0) * 5;
  const feeAmount = (balance * PLATFORM_FEE).toFixed(2);
  const netAmount = (balance * (1 - PLATFORM_FEE)).toFixed(2);
  const selectedMethod = PAYMENT_METHODS.find((m) => m.value === method);
  const isValid = detail.trim().length > 0;

  useEffect(() => {
    if (data?.success) {
      setDone(true);
      setTimeout(() => {
        setOpen(false);
        setTimeout(() => {
          setDone(false);
          setDetail("");
          setMethod("PAYPAL");
        }, 300);
      }, 2000);
    }
  }, [data]);

  const handleOpenChange = (val) => {
    if (!val && !loading) {
      setOpen(false);
      if (!done) {
        setDetail("");
        setMethod("PAYPAL");
      }
    }
  };

  const statsToShow = [
    {
      label: "Credit balance",
      value: stats?.creditBalance ?? 0,
      unit: "credits",
      gold: true,
      icon: <Wallet size={16} className="text-[#034f46]" strokeWidth={1.5} />,
      dollarValue: balance,
    },
    {
      label: "Total earned",
      value: stats?.totalEarned ?? 0,
      unit: "credits",
      gold: false,
      icon: <TrendingUp size={16} className="text-[#034f46]" strokeWidth={1.5} />,
      dollarValue: totalEarnedDollars,
    },
    {
      label: "Sessions done",
      value: stats?.completedSessions ?? 0,
      unit: "completed",
      gold: false,
      icon: <CircleCheck size={16} className="text-[#034f46]" strokeWidth={1.5} />,
    },
  ];

  return (
    <section className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-3">
        {statsToShow.map((stat) => (
          <div key={stat.label} className="flex min-h-44 flex-col justify-between bg-[#151512] p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-semibold tracking-[0.16em] text-stone-500">
                {stat.label}
              </p>
              {stat.icon}
            </div>
            <div>
              <p
                className={`font-heading text-5xl leading-none tracking-[-0.05em] ${
                  stat.gold
                    ? "text-[#034f46]"
                    : "text-[#1a1a1a]"
                }`}
              >
                {stat.value}
              </p>
              <p className="mt-2 text-xs text-stone-600">
                {stat.unit.charAt(0).toUpperCase() + stat.unit.slice(1)}
                {stat.dollarValue !== undefined
                  ? ` · $${stat.dollarValue.toFixed(2)}`
                  : ""}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-6 rounded-[32px] border-2 border-[#1a1a1a] bg-[#f0d7ff] p-5 sm:grid-cols-[1fr_auto] sm:items-end sm:p-8">
        <div>
          <p className="text-[10px] font-semibold tracking-[0.18em] text-[#034f46]">
            Payout Desk
          </p>
          <h2 className="mt-2 font-heading text-3xl tracking-tight text-[#1a1a1a]">
            Withdraw Earnings
          </h2>
          <p className="mt-2 text-sm leading-6 text-[#1a1a1a]/65">
            20% platform fee applies. Processed within 2–3 business days.
          </p>
        </div>
        <Button
          variant="gold"
          disabled={balance <= 0}
          onClick={() => setOpen(true)}
          className="shrink-0"
        >
          Request Withdrawal
        </Button>
      </div>

      {history?.length > 0 ? (
        <div className="border border-white/10 bg-[#151512]">
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
            <p className="font-heading text-xl tracking-tight text-stone-100">Withdrawal history</p>
            <p className="font-mono text-xs text-stone-500">
              {String(history.length).padStart(2, "0")} requests
            </p>
          </div>
          <div className="divide-y divide-white/10">
            {history.map((p) => (
              <div
                key={p.id}
                className="grid gap-3 px-5 py-4 sm:grid-cols-[1fr_auto] sm:items-center sm:px-6"
              >
                <div className="flex flex-col gap-0.5">
                  <p className="text-sm text-stone-200">
                    {p.credits} credits → ${p.netAmount.toFixed(2)}
                  </p>
                  <p className="text-xs text-stone-600">
                    {p.paymentMethod} · {formatDate(p.createdAt)}
                  </p>
                </div>
                <Badge
                  variant="outline"
                  className={`w-fit rounded-none px-2 py-1 text-[10px] tracking-[0.12em] ${
                    p.status === "PROCESSED"
                      ? "border-green-500/20 bg-green-500/10 text-green-400"
                      : "border-amber-500/20 bg-amber-500/10 text-amber-400"
                  }`}
                >
                  {p.status.charAt(0) + p.status.slice(1).toLowerCase()}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="border border-dashed border-white/15 bg-[#11110f] p-6">
          <p className="font-heading text-xl tracking-tight text-stone-100">Withdrawal history</p>
          <p className="mt-2 text-sm leading-6 text-stone-400">No withdrawal requests yet. Your completed requests will appear here.</p>
        </div>
      )}

      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="dialog-editorial max-w-md">
          {done ? (
            <div className="flex flex-col items-center gap-4 py-8 text-center">
              <span className="grid size-14 place-items-center rounded-full border border-green-500/20 bg-green-500/10">
                <Check size={23} className="text-green-400" />
              </span>
              <p className="font-heading text-2xl text-[#1a1a1a]">Request Submitted</p>
              <p className="text-xs leading-5 text-stone-500">
                We&apos;ll process your withdrawal within 2–3 business days.
              </p>
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle className="font-heading text-2xl tracking-tight text-stone-100">
                  Request Withdrawal
                </DialogTitle>
                <DialogDescription className="text-xs leading-5 text-stone-500">
                  Your full balance of <span className="text-amber-300">{balance} credits</span> will be withdrawn.
                </DialogDescription>
              </DialogHeader>

              <Separator className="bg-white/10" />

              <div className="flex flex-col gap-5 py-2">
                <div className="flex flex-col gap-2 border border-white/10 bg-black/15 p-4">
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Balance (1 Cr = $5)</span>
                    <span className="text-green-400">${balance}</span>
                  </div>
                  <div className="flex justify-between text-xs text-stone-500">
                    <span>Platform fee (20%)</span>
                    <span className="text-red-400">− ${feeAmount}</span>
                  </div>
                  <Separator className="my-1 bg-white/10" />
                  <div className="flex justify-between text-sm font-medium">
                    <span className="text-stone-300">You receive</span>
                    <span className="text-amber-300">${netAmount}</span>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Label className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                    Payment method
                  </Label>
                  <Tabs
                    value={method}
                    onValueChange={(val) => {
                      setMethod(val);
                      setDetail("");
                    }}
                  >
                    <TabsList className="grid h-auto w-full grid-cols-3 rounded-none border border-white/10 bg-[#11110f] p-1">
                      {PAYMENT_METHODS.map((m) => (
                        <TabsTrigger key={m.value} value={m.value} className="rounded-none text-xs">
                          {m.label}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor="withdrawal-detail" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">
                    {selectedMethod?.label} details
                  </Label>
                  <Input
                    id="withdrawal-detail"
                    value={detail}
                    onChange={(e) => setDetail(e.target.value)}
                    placeholder={selectedMethod?.placeholder}
                    className="rounded-none border-white/10 bg-[#11110f] text-stone-100"
                  />
                </div>

                {error && (
                  <p className="border-l-2 border-red-400 bg-red-400/5 px-3 py-2 text-xs text-red-300" role="alert">
                    {error?.message || error}
                  </p>
                )}
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline" onClick={() => handleOpenChange(false)} disabled={loading}>
                  Cancel
                </Button>
                <Button
                  variant="gold"
                  disabled={!isValid || loading}
                  onClick={() =>
                    withdrawFn({
                      credits: stats?.creditBalance,
                      paymentMethod: method,
                      paymentDetail: detail,
                    })
                  }
                  className="gap-2"
                >
                  {loading ? <><LoaderCircle size={15} className="animate-spin" /> Submitting…</> : "Confirm Withdrawal"}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
