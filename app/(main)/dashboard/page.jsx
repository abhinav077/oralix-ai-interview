import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  getAvailability,
  getInterviewerAppointments,
  getInterviewerStats,
  getWithdrawalHistory,
} from "@/actions/dashboard";
import AvailabilitySection from "./components/AvailabilitySection";
import AppointmentsSection from "./components/AppointmentsSection";
import EarningsSection from "./components/EarningsSection";
import { ClipboardList, Clock, Wallet } from "lucide-react";
import { getCurrentUser } from "@/actions/user";

export default async function InterviewerDashboardPage() {
  const user = await currentUser();
  if (!user) redirect("/");

  const dbUser = await getCurrentUser();

  const [availability, appointments, stats, withdrawalHistory] =
    await Promise.all([
      getAvailability(),
      getInterviewerAppointments(),
      getInterviewerStats(),

      // Assignment
      getWithdrawalHistory(),
    ]);

  return (
    <main className="editorial-page product-surface">
      <div className="border-b-2 border-[#1a1a1a]/20">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 py-10 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-14">
          <div>
            <p className="editorial-label">
              Interviewer workspace
            </p>
            <h1 className="mt-3 font-heading text-4xl leading-[0.95] tracking-[-0.055em] sm:text-6xl">
              Welcome back,
                <span className="block text-[#034f46]">
                {dbUser.name?.split(" ")[0] ?? "Interviewer"}.
              </span>
            </h1>
            {dbUser.title && dbUser.company && (
              <p className="mt-4 text-sm text-[#6d6d63]">
                {dbUser.title} <span className="px-1 text-[#034f46]">·</span> {dbUser.company}
              </p>
            )}
          </div>
          <div className="border-l-2 border-[#1a1a1a]/20 pl-5 lg:mb-1">
            <p className="text-xs tracking-[0.08em] text-[#6d6d63]">
              Available Balance
            </p>
            <p className="mt-1 font-heading text-6xl leading-none tracking-tight text-[#034f46]">
              {stats?.creditBalance ?? 0}
              <span className="ml-2 text-sm font-medium tracking-normal text-[#6d6d63]">CR</span>
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10 lg:py-12">
        <Tabs defaultValue="earnings">
            <TabsList className="mb-8 grid h-auto w-full grid-cols-1 gap-1 overflow-visible rounded-[16px] border-2 border-[#1a1a1a] bg-[#f0d7ff] p-1 sm:grid-cols-3">
              <TabsTrigger value="earnings" className="min-w-0 justify-start rounded-[12px] px-3 py-3 text-xs data-[state=active]:-translate-y-1 data-[state=active]:shadow-[0_5px_0_#1a1a1a] sm:justify-center sm:px-5">
              <Wallet size={16} className="text-[#034f46]" /> Earnings
            </TabsTrigger>
              <TabsTrigger value="appointments" className="min-w-0 justify-start rounded-[12px] px-3 py-3 text-xs data-[state=active]:-translate-y-1 data-[state=active]:shadow-[0_5px_0_#1a1a1a] sm:justify-center sm:px-5">
              <ClipboardList size={18} className="text-[#034f46]" />{" "}
              Appointments
            </TabsTrigger>
              <TabsTrigger value="availability" className="min-w-0 justify-start rounded-[12px] px-3 py-3 text-xs data-[state=active]:-translate-y-1 data-[state=active]:shadow-[0_5px_0_#1a1a1a] sm:justify-center sm:px-5">
              <Clock size={18} className="text-[#034f46]" /> Availability
            </TabsTrigger>
          </TabsList>

          <TabsContent value="appointments">
            <AppointmentsSection appointments={appointments} />
          </TabsContent>

          <TabsContent value="availability">
            <AvailabilitySection initial={availability} />
          </TabsContent>

          <TabsContent value="earnings">
            <EarningsSection stats={stats} history={withdrawalHistory} />
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
