import Link from "next/link";
import { ArrowUpRight, Circle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CATEGORY_LABEL } from "@/lib/data";
import { formatTime } from "@/lib/helpers";

export default function InterviewerCard({ interviewer }) {
  const availability = interviewer.availabilities?.[0];
  return <article className="paper-card group relative flex min-h-[23rem] flex-col overflow-hidden p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6">
    <div className="flex items-start justify-between gap-4"><div className="flex min-w-0 items-center gap-3"><Avatar className="size-12 rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff]"><AvatarImage src={interviewer.imageUrl} alt={interviewer.name} /><AvatarFallback className="rounded-full bg-[#f0d7ff] font-heading text-xl text-[#1a1a1a]">{interviewer.name?.[0] ?? "?"}</AvatarFallback></Avatar><div className="min-w-0"><h2 className="truncate text-2xl leading-none">{interviewer.name}</h2>{interviewer.title && interviewer.company && <p className="mt-1 truncate text-xs text-[#6d6d63]">{interviewer.title} · {interviewer.company}</p>}</div></div>{interviewer.yearsExp && <span className="shrink-0 text-xs text-[#034f46]">{interviewer.yearsExp}+ yrs</span>}</div>
    <div className="mt-8 flex flex-1 flex-col">{interviewer.bio && <p className="line-clamp-3 text-sm leading-6 text-[#6d6d63]">{interviewer.bio}</p>}{interviewer.categories?.length > 0 && <div className="mt-5 flex flex-wrap gap-2">{interviewer.categories.slice(0, 4).map((cat) => <span key={cat} className="teal-badge !px-3 !py-1.5 !text-xs">{CATEGORY_LABEL[cat] ?? cat}</span>)}</div>}</div>
    <div className="mt-8 border-t border-[#1a1a1a]/20 pt-4"><div className="flex items-end justify-between gap-4"><div><p className="text-xs text-[#6d6d63]">Session Rate</p><p className="mt-1 font-heading text-3xl leading-none text-[#034f46]">{interviewer.creditRate ?? 10}<span className="ml-1.5 font-sans text-xs text-[#6d6d63]">credits</span></p></div><p className={`max-w-[9.5rem] text-right text-xs leading-5 ${availability ? "text-[#034f46]" : "text-[#6d6d63]"}`}>{availability ? <span className="inline-flex items-center justify-end gap-1.5"><Circle size={7} fill="currentColor" /> Available {formatTime(availability.startTime)}–{formatTime(availability.endTime)}</span> : "No Availability Set"}</p></div><Link href={`/interviewers/${interviewer.id}`} className="mt-5 flex items-center justify-between rounded-[12px] border-2 border-[#1a1a1a] px-3.5 py-3 text-sm font-medium text-[#1a1a1a] transition hover:bg-[#f0d7ff] hover:text-[#1a1a1a]">View Profile <ArrowUpRight size={16} /></Link></div>
  </article>;
}
