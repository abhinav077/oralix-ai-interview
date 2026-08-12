"use client";

import { AppointmentCard } from "@/components/AppointmentCard";
import { ClipboardList } from "lucide-react";

export default function AppointmentsSection({ appointments }) {
  const now = new Date();
  const scheduled = appointments.filter(
    (a) => a.status === "SCHEDULED" && new Date(a.startTime) > now
  );
  const past = appointments.filter(
    (a) => a.status !== "SCHEDULED" || new Date(a.endTime) <= now
  );

  return (
    <section className="flex flex-col gap-8">
      <div className="grid gap-4 border-b border-white/10 pb-6 sm:grid-cols-[1fr_auto] sm:items-end">
        <div>
          <div className="mb-3 flex size-9 items-center justify-center border border-amber-300/25 bg-amber-300/10">
            <ClipboardList size={17} className="text-amber-300" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-3xl tracking-tight text-stone-100">Session schedule</h2>
        </div>
        <p className="max-w-xs text-sm leading-6 text-stone-500">
          Track every scheduled conversation and keep a clear record of completed work.
        </p>
      </div>

      {appointments.length === 0 ? (
        <div className="grid min-h-72 place-items-center border border-dashed border-amber-200/20 bg-[#151512] px-6 text-center">
          <div>
            <p className="font-heading text-xl text-stone-200">No appointments yet.</p>
            <p className="mt-2 text-xs leading-5 text-stone-600">
              Once interviewees book your slots, they&apos;ll appear here.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          {scheduled.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-amber-300/80">Upcoming</p>
                <p className="font-mono text-xs text-stone-500">{String(scheduled.length).padStart(2, "0")} sessions</p>
              </div>
              <div className="grid grid-cols-1 gap-4 overflow-visible lg:grid-cols-2">
                {scheduled.map((b) => (
                  <AppointmentCard key={b.id} booking={b} mode="interviewer" />
                ))}
              </div>
            </div>
          )}

          {past.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <p className="text-[10px] font-semibold tracking-[0.2em] text-stone-500">Archive</p>
                <p className="font-mono text-xs text-stone-500">{String(past.length).padStart(2, "0")} sessions</p>
              </div>
              <div className="grid grid-cols-1 gap-4 overflow-visible lg:grid-cols-2">
                {past.map((b) => (
                  <AppointmentCard
                    key={b.id}
                    booking={b}
                    mode="interviewer"
                    isPast
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
