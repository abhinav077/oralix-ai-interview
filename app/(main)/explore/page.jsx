import { getInterviewers } from "@/actions/explore";
import ExploreGrid from "./_components/ExploreGrid";

export default async function ExplorePage() {
  const interviewers = await getInterviewers();

  return (
    <main className="editorial-page overflow-hidden">
      <section className="px-5 pb-14 pt-28 sm:px-8 sm:pb-20 lg:px-10 lg:pt-36">
        <div className="editorial-wrap grid gap-8 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div><h1 className="max-w-4xl text-[clamp(4rem,8vw,7.5rem)] leading-[.82]">Find the voice that <span className="text-[#034f46]">sharpens yours.</span></h1></div>
          <p className="border-t-2 border-[#1a1a1a] pt-4 text-sm leading-6 text-[#6d6d63] lg:border-l-2 lg:border-t-0 lg:pl-5">Browse interviewers, compare their focus, and choose a time that works.</p>
        </div>
      </section>
      <section className="ink-chamber mx-3 px-5 py-8 sm:mx-5 sm:px-8 lg:mx-8 lg:px-10"><div className="editorial-wrap"><ExploreGrid interviewers={interviewers} /></div></section>
    </main>
  );
}
