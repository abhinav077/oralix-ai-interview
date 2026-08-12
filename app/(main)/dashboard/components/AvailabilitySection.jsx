/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { setAvailability } from "@/actions/dashboard";
import useFetch from "@/hooks/use-fetch";
import { Check, Clock, LoaderCircle } from "lucide-react";

export default function AvailabilitySection({ initial }) {
  const [startTime, setStartTime] = useState(
    initial?.startTime
      ? new Date(initial.startTime).toTimeString().slice(0, 5)
      : ""
  );
  const [endTime, setEndTime] = useState(
    initial?.endTime ? new Date(initial.endTime).toTimeString().slice(0, 5) : ""
  );
  const [saved, setSaved] = useState(false);

  const { data, loading, error, fn: saveFn } = useFetch(setAvailability);

  useEffect(() => {
    if (data?.success) {
      setSaved(true);
      const t = setTimeout(() => setSaved(false), 3000);
      return () => clearTimeout(t);
    }
  }, [data]);

  const toISO = (time) => {
    const [h, m] = time.split(":").map(Number);
    const d = new Date();
    d.setHours(h, m, 0, 0);
    return d.toISOString();
  };

  const handleSave = () => {
    if (!startTime || !endTime) return;
    saveFn({ startTime: toISO(startTime), endTime: toISO(endTime) });
  };

  const hasWindow = startTime && endTime;
  const duration = hasWindow
    ? (() => {
        const [sh, sm] = startTime.split(":").map(Number);
        const [eh, em] = endTime.split(":").map(Number);
        const diff = eh * 60 + em - (sh * 60 + sm);
        if (diff <= 0) return null;
        const h = Math.floor(diff / 60);
        const m = diff % 60;
        return h > 0 ? `${h}h ${m > 0 ? `${m}m` : ""}`.trim() : `${m}m`;
      })()
    : null;

  return (
    <section className="border border-white/10 bg-[#151512] p-5 sm:p-8">
      <div className="grid gap-6 border-b border-white/10 pb-6 sm:grid-cols-[1fr_auto] sm:items-start">
        <div>
          <span className="mb-4 flex size-10 items-center justify-center border border-amber-300/25 bg-amber-300/10">
            <Clock size={18} className="text-amber-300" strokeWidth={1.5} />
          </span>
          <h2 className="font-heading text-3xl tracking-tight text-stone-100">
            Working hours
          </h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-stone-500">
            Interviewees can book within this window every day.
          </p>
        </div>

        {initial && (
          <Badge
            variant="outline"
            className="shrink-0 rounded-none border-green-500/20 bg-green-500/10 px-2 py-1 text-[10px] tracking-[0.12em] text-green-400"
          >
            Active
          </Badge>
        )}
      </div>

      <div className="grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
        <div className="flex flex-col gap-2 bg-[#11110f] p-5">
          <Label htmlFor="availability-start-time" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">Start time</Label>
          <Input
            id="availability-start-time"
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="rounded-none border-white/10 bg-[#191914] text-stone-100"
          />
        </div>
        <div className="flex flex-col gap-2 bg-[#11110f] p-5">
          <Label htmlFor="availability-end-time" className="text-[10px] font-semibold uppercase tracking-[0.16em] text-stone-500">End time</Label>
          <Input
            id="availability-end-time"
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className="rounded-none border-white/10 bg-[#191914] text-stone-100"
          />
        </div>
      </div>

      {duration && (
        <div className="flex flex-wrap items-center gap-3 border-l-2 border-amber-300/60 bg-amber-300/5 px-4 py-3">
          <Badge
            variant="outline"
            className="rounded-none border-amber-400/20 bg-amber-400/5 text-amber-300"
          >
            {duration} window
          </Badge>
          <span className="text-xs text-stone-500">
            Interviewees see this as your open booking range
          </span>
        </div>
      )}

      {error && (
        <p className="border-l-2 border-red-400 bg-red-400/5 px-3 py-2 text-xs text-red-300" role="alert">
          {error?.message || error}
        </p>
      )}

      <Button
        variant="gold"
        disabled={!hasWindow || loading}
        onClick={handleSave}
        className="mt-6 self-start gap-2"
      >
        {loading
          ? <><LoaderCircle size={15} className="animate-spin" /> Saving…</>
          : saved
          ? <><Check size={15} /> Saved</>
          : initial
          ? "Update window"
          : "Set availability"}
      </Button>
    </section>
  );
}
