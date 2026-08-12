export default function AuthLayout({ children }) {
  return (
    <section className="editorial-page min-h-[100dvh] px-4 pb-8 pt-28 sm:px-8 sm:pb-12 lg:px-10">
      <div className="editorial-wrap grid min-h-[calc(100dvh-9rem)] overflow-hidden rounded-[40px] border-2 border-[#1a1a1a] bg-[#1a1a1a] lg:grid-cols-[1fr_.9fr]">
        <div className="flex flex-col justify-between p-7 text-[#ffffeb] sm:p-10 lg:p-16">
          <div>
            <p className="flex items-center gap-3 text-xl"><span className="grid size-10 place-items-center rounded-full border-2 border-[#1a1a1a] bg-[#f0d7ff] text-[#1a1a1a]">O</span><span className="font-heading text-2xl">Oralix</span></p>
            <h1 className="mt-20 max-w-xl text-6xl leading-[.84] tracking-[-0.045em] sm:text-7xl">Better conversations begin before the interview.</h1>
            <p className="mt-7 max-w-md text-base leading-7 text-[#ffffeb]/65">Practice with experienced interviewers, sharpen your thinking with AI, and arrive ready to make the most of the room.</p>
          </div>
          <p className="mt-16 max-w-sm border-t border-[#ffffeb]/25 pt-5 text-sm leading-6 text-[#ffffeb]/65">One focused place for preparation, conversation, and meaningful feedback.</p>
        </div>
        <div className="flex items-center bg-[#ffffeb] p-4 sm:p-8 lg:p-14"><div className="w-full max-w-[27rem]">{children}</div></div>
      </div>
    </section>
  );
}
