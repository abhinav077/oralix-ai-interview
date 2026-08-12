"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { bookSlot } from "@/actions/booking";
import useFetch from "@/hooks/use-fetch";
import UpgradeModal from "@/components/UpgradeModal";
import {
  formatDateFull,
  formatTime,
  formatDateTab,
  generateDates,
  generateSlots,
} from "@/lib/helpers";

const SLOT_DURATION_MINUTES = 45;
const DAYS_AHEAD = 7;

export default function SlotPicker({
  interviewer,
  interviewerCredits,
  userCredits,
}) {
  const router = useRouter();
  const dates = useMemo(() => generateDates(DAYS_AHEAD), []);
  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const summaryRef = useRef(null);

  useEffect(() => {
    if (selectedSlot && summaryRef.current) {
      summaryRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [selectedSlot]);

  const { data, loading, error, fn: bookFn } = useFetch(bookSlot);
  const availability = interviewer.availabilities?.[0];
  const canAfford = userCredits >= interviewerCredits;

  const slots = useMemo(() => {
    if (!availability) return [];
    return generateSlots(
      selectedDate,
      availability.startTime,
      availability.endTime,
      interviewer.bookingsAsInterviewer ?? [],
      SLOT_DURATION_MINUTES
    );
  }, [selectedDate, availability, interviewer.bookingsAsInterviewer]);

  useEffect(() => {
    if (data?.success && data.streamCallId) {
      router.push(`/appointments`);
    }
  }, [data, router]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotClick = (slot) => {
    if (!slot.available) return;
    if (!canAfford) {
      setUpgradeOpen(true);
      return;
    }
    setSelectedSlot((prev) =>
      prev?.startTime.getTime() === slot.startTime.getTime() ? null : slot
    );
  };

  const handleConfirm = () => {
    if (!selectedSlot) return;
    bookFn(
      interviewer.id,
      selectedSlot.startTime.toISOString(),
      selectedSlot.endTime.toISOString()
    );
  };

  if (!availability) {
    return (
      <div className="border border-dashed border-white/15 bg-white/[0.02] px-6 py-10 text-center">
        <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-stone-600">
          Calendar unavailable
        </p>
        <p className="mt-3 font-heading text-xl tracking-[-0.03em] text-stone-300">
          No availability listed yet.
        </p>
        <p className="mt-2 text-xs leading-5 text-stone-600">Check back later.</p>
      </div>
    );
  }

  return (
    <>
      <UpgradeModal
        open={upgradeOpen}
        onOpenChange={setUpgradeOpen}
        reason={`You need ${interviewerCredits} credits to book this session. Your current balance is ${userCredits}.`}
      />

      <div className="booking-surface flex flex-col gap-4">
        <section className="border border-white/10 bg-[#101115] p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4 border-b border-white/8 pb-5">
            <div>
              <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-amber-200/80">
                Book a session
              </p>
              <h2 className="mt-2 font-heading text-2xl tracking-[-0.04em] text-stone-200">
                Choose your practice window.
              </h2>
              <p className="mt-2 text-xs leading-5 text-stone-500">
                Select a date and available time slot.
              </p>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.13em] text-stone-600">
                Session
              </p>
              <p className="mt-1 font-heading text-xl tracking-[-0.03em] text-amber-200">
                {interviewerCredits}
                <span className="ml-1 font-sans text-[0.65rem] font-medium text-stone-500">
                  cr
                </span>
              </p>
            </div>
          </div>

          <div className="mt-5 flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {dates.map((date) => {
              const label = formatDateTab(date);
              const active = date.toDateString() === selectedDate.toDateString();

              return (
                <button
                  key={date.toDateString()}
                  type="button"
                  onClick={() => handleDateChange(date)}
                  aria-pressed={active}
                  className={`min-w-15 shrink-0 border px-2.5 py-2 text-center text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101115] ${
                    active
                      ? "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a]"
                      : "border-[#1a1a1a]/20 text-[#6d6d63] hover:border-[#034f46] hover:text-[#1a1a1a]"
                  }`}
                >
                  <span className="block font-semibold">{label.top}</span>
                  <span className={`mt-0.5 block text-[0.65rem] ${active ? "text-stone-700" : "text-stone-700"}`}>
                    {label.bottom}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="mt-5 border-t border-white/8 pt-5">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-stone-600">
                Available times
              </p>
              <p className="text-[0.65rem] text-stone-600">45 minutes</p>
            </div>
            {slots.length === 0 ? (
              <p className="border border-dashed border-white/10 px-3 py-5 text-center text-xs leading-5 text-stone-600">
                No slots in the availability window for this date.
              </p>
            ) : (
              <div className="grid grid-cols-3 gap-1.5">
                {slots.map((slot) => {
                  const isSelected =
                    selectedSlot?.startTime.getTime() === slot.startTime.getTime();
                  const unavailable = slot.isBooked || !slot.available;

                  return (
                    <button
                      key={slot.startTime.toISOString()}
                      type="button"
                      disabled={slot.isBooked}
                      onClick={() => handleSlotClick(slot)}
                      aria-pressed={isSelected}
                      aria-label={`${formatTime(slot.startTime)}${
                        unavailable ? ", unavailable" : ", available"
                      }`}
                      className={`min-h-12 border px-1 py-2 text-xs transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#101115] ${
                        isSelected
                          ? "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a]"
                          : unavailable
                            ? "cursor-not-allowed border-[#1a1a1a]/10 bg-[#e4e4d0]/45 text-[#8a8a80] line-through"
                            : "border-[#1a1a1a]/20 text-[#6d6d63] hover:border-[#034f46] hover:bg-[#f0d7ff] hover:text-[#1a1a1a]"
                      }`}
                    >
                      <span className="block">{formatTime(slot.startTime)}</span>
                      {unavailable && (
                        <span className="mt-0.5 block text-[0.57rem] no-underline">
                          {slot.isBooked ? "reserved" : "unavailable"}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {selectedSlot && (
          <section
            ref={summaryRef}
            className={`border p-5 transition-colors ${
              data?.success
                ? "border-emerald-300/45 bg-emerald-300/[0.06]"
                : "border-amber-300/35 bg-[#14130f]"
            }`}
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-[0.62rem] font-semibold uppercase tracking-[0.15em] text-amber-200/85">
                  {data?.success ? "Session created" : "Selected session"}
                </p>
                <p className="mt-2 font-heading text-xl tracking-[-0.035em] text-stone-200">
                  {formatDateFull(selectedSlot.startTime)}
                </p>
              </div>
              {data?.success ? (
                <span className="border border-emerald-300/35 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-emerald-200">
                  Opening
                </span>
              ) : (
                <span className="border border-amber-300/25 px-2 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-amber-200">
                  Selected
                </span>
              )}
            </div>

            <div className="mt-5 grid gap-3 border-y border-white/8 py-4 text-xs sm:grid-cols-3">
              <div>
                <p className="text-stone-600">Time</p>
                <p className="mt-1 text-stone-300">
                  {formatTime(selectedSlot.startTime)} – {formatTime(selectedSlot.endTime)}
                </p>
              </div>
              <div>
                <p className="text-stone-600">Duration</p>
                <p className="mt-1 text-stone-300">{SLOT_DURATION_MINUTES} minutes</p>
              </div>
              <div>
                <p className="text-stone-600">Credits</p>
                <p className="mt-1 text-amber-200">−{interviewerCredits}</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs">
              <span className="text-stone-600">Balance after</span>
              <span className="text-stone-400">{userCredits - interviewerCredits} credits</span>
            </div>

            <div className="mt-4 border-l border-amber-300/45 bg-white/[0.025] px-3 py-2.5">
              <p className="text-xs leading-5 text-stone-500">
                A video call room will be created and you&apos;ll be redirected immediately after confirming.
              </p>
            </div>

            {error && <p className="mt-4 text-xs text-red-400">{error?.message || error}</p>}

            <Separator className="my-4 bg-white/8" />

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex-1 rounded-none border-white/15 text-stone-300"
                disabled={loading || data?.success}
                onClick={() => setSelectedSlot(null)}
              >
                Change slot
              </Button>
              <Button
                variant="gold"
                size="sm"
                className="flex-1 rounded-none"
                disabled={loading || data?.success}
                onClick={handleConfirm}
              >
                {data?.success ? "Opening session…" : loading ? "Creating call…" : "Confirm booking"}
              </Button>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
