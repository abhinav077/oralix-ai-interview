import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { AppointmentCard } from "@/components/AppointmentCard";
import { Button } from "@/components/ui/button";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { getIntervieweeAppointments } from "@/actions/appointment";

export default async function MyAppointmentsPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const appointments = await getIntervieweeAppointments();
  const now = new Date();
  const scheduled = appointments.filter(
    (a) => a.status === "SCHEDULED" && new Date(a.startTime) > now
  );
  const past = appointments.filter(
    (a) => a.status !== "SCHEDULED" || new Date(a.endTime) <= now
  );

  return (
    <main className="editorial-page">
      <div className="border-b-2 border-[#1a1a1a]/20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-14">
          <div>
            <p className="editorial-label">
              Session ledger
            </p>
            <h1 className="mt-3 max-w-xl font-heading text-5xl leading-[0.84] tracking-[-0.055em] sm:text-7xl">
              Your interview
              <span className="block text-[#034f46]">calendar.</span>
            </h1>
          </div>
          <p className="max-w-xs border-l-2 border-[#1a1a1a]/20 pl-4 text-sm leading-6 text-[#6d6d63] lg:mb-1">
            Every upcoming conversation and completed practice session, in one
            working record.
          </p>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
        {appointments.length === 0 && (
            <div className="grid min-h-[22rem] place-items-center rounded-[32px] border-2 border-dashed border-[#1a1a1a]/25 px-6 text-center">
            <div className="flex max-w-sm flex-col items-center gap-5">
              <span className="grid size-14 place-items-center rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff]">
                <CalendarDays size={22} className="text-[#034f46]" />
              </span>
              <div>
                  <p className="font-heading text-2xl tracking-tight">
                  The calendar is clear.
                </p>
                <p className="mt-2 text-sm leading-6 text-[#6d6d63]">
                  Browse experienced interviewers to schedule your first
                  practice session.
                </p>
              </div>
              <Button variant="gold" asChild className="gap-2">
                <Link href="/explore">
                  Browse interviewers <ArrowUpRight size={15} />
                </Link>
              </Button>
            </div>
          </div>
        )}

        {scheduled.length > 0 && (
          <section className="flex flex-col gap-5">
            <div className="grid gap-3 border-b-2 border-[#1a1a1a]/15 pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
              <p className="editorial-label">
                  Next in line
                </p>
                <h2 className="mt-1 font-heading text-3xl tracking-tight">
                  Upcoming sessions
                </h2>
              </div>
              <p className="text-xs text-[#6d6d63]">
                {String(scheduled.length).padStart(2, "0")} scheduled
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {scheduled.map((b) => (
                <AppointmentCard key={b.id} booking={b} mode="interviewee" />
              ))}
            </div>
          </section>
        )}

        {past.length > 0 && (
          <section className="flex flex-col gap-5">
            <div className="grid gap-3 border-b-2 border-[#1a1a1a]/15 pb-4 sm:grid-cols-[1fr_auto] sm:items-end">
              <div>
              <p className="editorial-label !text-[#6d6d63]">
                  Archive
                </p>
                <h2 className="mt-1 font-heading text-3xl tracking-tight">
                  Past sessions
                </h2>
              </div>
              <p className="text-xs text-[#6d6d63]">
                {String(past.length).padStart(2, "0")} recorded
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {past.map((b) => (
                <AppointmentCard
                  key={b.id}
                  booking={b}
                  mode="interviewee"
                  isPast={true}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
