"use client";

import { useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Search, UsersRound } from "lucide-react";
import { CATEGORIES } from "@/lib/data";
import InterviewerCard from "./InterviewerCard";

export default function ExploreGrid({ interviewers }) {
  const [activeCategory, setActiveCategory] = useState(null);
  const [search, setSearch] = useState("");
  const filtered = useMemo(() => interviewers.filter((i) => {
    const query = search.toLowerCase().trim();
    return (activeCategory === null || i.categories?.includes(activeCategory)) && (!query || [i.name, i.title, i.company].some((value) => value?.toLowerCase().includes(query)));
  }), [interviewers, activeCategory, search]);

  return <div className="flex flex-col gap-8">
    <div className="grid gap-5 border-b-2 border-[#ffffeb]/25 pb-5 lg:grid-cols-[minmax(17rem,.75fr)_1fr] lg:items-center">
      <div className="relative"><Search size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#f0d7ff]" /><Input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, role, or company" aria-label="Search interviewers" className="h-12 rounded-[12px] border-2 border-[#ffffeb]/25 bg-transparent pl-11 text-sm text-[#ffffeb] shadow-none placeholder:text-[#ffffeb]/45 focus-visible:border-[#f0d7ff] focus-visible:ring-0" /></div>
      <div className="flex flex-wrap gap-2 lg:justify-end"><button type="button" onClick={() => setActiveCategory(null)} aria-pressed={activeCategory === null} className={`rounded-full border px-3 py-2 text-xs font-medium transition ${activeCategory === null ? "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a]" : "border-[#ffffeb]/25 text-[#ffffeb]/65 hover:border-[#f0d7ff] hover:text-[#ffffeb]"}`}>All disciplines</button>{CATEGORIES.map((cat) => <button key={String(cat.value)} type="button" onClick={() => setActiveCategory(cat.value)} aria-pressed={activeCategory === cat.value} className={`rounded-full border px-3 py-2 text-xs font-medium transition ${activeCategory === cat.value ? "border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a]" : "border-[#ffffeb]/25 text-[#ffffeb]/65 hover:border-[#f0d7ff] hover:text-[#ffffeb]"}`}>{cat.label}</button>)}</div>
    </div>
    <div className="flex items-end justify-between gap-3"><div className="flex items-center gap-3"><span className="grid size-10 place-items-center rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a]"><UsersRound size={17} /></span><div><p className="text-sm font-medium text-[#f0d7ff]">Available Perspectives</p><p className="mt-1 text-sm text-[#ffffeb]/55" aria-live="polite">{filtered.length === 0 ? "No Interviewers Found" : `${filtered.length} Interviewer${filtered.length === 1 ? "" : "s"} Found`}</p></div></div>{(activeCategory !== null || search) && <button type="button" onClick={() => { setActiveCategory(null); setSearch(""); }} className="text-sm text-[#f0d7ff] underline-offset-4 hover:underline">Reset Filters</button>}</div>
    {filtered.length === 0 ? <div className="rounded-[32px] border-2 border-dashed border-[#ffffeb]/25 px-6 py-20 text-center"><p className="font-heading text-3xl">No matching practice partner.</p><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#ffffeb]/60">Try widening your search or choosing another interview discipline.</p></div> : <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">{filtered.map((interviewer) => <InterviewerCard key={interviewer.id} interviewer={interviewer} />)}</div>}
  </div>;
}
