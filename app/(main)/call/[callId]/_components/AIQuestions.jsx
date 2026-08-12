"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Loader2, Sparkles } from "lucide-react";
import { CATEGORY_LABEL } from "@/lib/data";
import { generateInterviewQuestions } from "@/actions/aiQuestions";
import useFetch from "@/hooks/use-fetch";

export default function AIQuestionsPanel({ categories }) {
  const [selectedCategory, setSelectedCategory] = useState(
    categories?.[0] ?? null
  );

  const {
    data,
    loading,
    error,
    fn: generateFn,
  } = useFetch(generateInterviewQuestions);

  const questions = data?.questions ?? [];

  return (
    <section className="flex h-full min-h-0 flex-col">
      <header className="flex shrink-0 items-start gap-3 border-b border-white/6 pb-4">
        <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-amber-200/15 bg-amber-200/8 text-amber-200">
          <Sparkles size={15} aria-hidden="true" />
        </span>
        <div>
          <h2 className="text-sm font-semibold tracking-tight text-stone-100">
            Interview prompts
          </h2>
          <p className="mt-1 text-xs leading-5 text-stone-500">
            Generate focused questions and suggested answers for this session.
          </p>
        </div>
      </header>

      {/* Category selector */}
      <div className="shrink-0 py-4">
        <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-stone-600">
          Focus area
        </p>
        <div className="flex flex-wrap gap-2">
          {categories?.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={selectedCategory === cat}
              onClick={() => setSelectedCategory(cat)}
              className={`min-h-9 rounded-lg border px-3 text-xs font-medium outline-none transition-colors duration-150 focus-visible:ring-2 focus-visible:ring-amber-200/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11120f] motion-reduce:transition-none ${
                selectedCategory === cat
                  ? "border-amber-200/25 bg-amber-200/10 text-amber-100"
                  : "border-white/8 bg-white/3 text-stone-500 hover:border-white/15 hover:bg-white/5 hover:text-stone-300"
              }`}
            >
              {CATEGORY_LABEL[cat] ?? cat}
            </button>
          ))}
        </div>
      </div>

      <Button
        variant="gold"
        size="sm"
        disabled={loading || !selectedCategory}
        onClick={() => generateFn({ category: selectedCategory })}
        className="h-10 w-full shrink-0 gap-2 rounded-lg text-xs font-semibold focus-visible:ring-2 focus-visible:ring-amber-100 focus-visible:ring-offset-2 focus-visible:ring-offset-[#11120f]"
      >
        {loading ? (
          <>
            <Loader2
              size={14}
              aria-hidden="true"
              className="animate-spin motion-reduce:animate-none"
            />
            Generating…
          </>
        ) : (
          <>
            <Sparkles size={14} aria-hidden="true" />
            Generate questions
          </>
        )}
      </Button>

      {error && (
        <div
          role="alert"
          className="mt-4 flex shrink-0 items-start gap-2.5 border border-red-300/15 bg-red-300/6 px-3 py-3 text-red-200"
        >
          <AlertCircle size={15} aria-hidden="true" className="mt-0.5 shrink-0" />
          <div>
            <p className="text-xs font-semibold">Questions could not be generated</p>
            <p className="mt-1 text-xs leading-5 text-red-200/65">
              {error?.message || error}
            </p>
          </div>
        </div>
      )}

      {/* Questions list */}
      {questions.length > 0 ? (
        <ol className="mt-4 flex flex-1 flex-col gap-3 overflow-y-auto pr-1">
          {questions.map((q, i) => (
            <li
              key={i}
              className="rounded-xl border border-white/8 bg-[#161712] p-4 transition-colors duration-150 hover:border-white/12 motion-reduce:transition-none"
            >
              <div className="flex items-start gap-3">
                <span className="grid size-6 shrink-0 place-items-center rounded-full border border-white/10 bg-white/4 text-[10px] font-semibold text-stone-500">
                  {i + 1}
                </span>
                <p className="pt-0.5 text-sm font-medium leading-6 text-stone-200">
                  {q.question}
                </p>
              </div>
              <div className="mt-3 border-t border-white/6 pt-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-amber-200/60">
                  Suggested answer
                </p>
                <p className="mt-1.5 text-xs leading-5 text-stone-500">
                  {q.answer}
                </p>
              </div>
            </li>
          ))}
        </ol>
      ) : loading ? (
        <div
          role="status"
          aria-live="polite"
          className="flex flex-1 flex-col items-center justify-center px-4 text-center"
        >
          <span className="grid size-11 place-items-center rounded-full border border-white/8 bg-white/4">
            <Loader2
              size={17}
              aria-hidden="true"
              className="animate-spin text-amber-200 motion-reduce:animate-none"
            />
          </span>
          <p className="mt-4 text-sm font-medium text-stone-300">
            Building interview prompts
          </p>
          <p className="mt-1.5 max-w-60 text-xs leading-5 text-stone-600">
            Preparing questions for the selected focus area.
          </p>
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center px-4 text-center">
          <span className="grid size-11 place-items-center rounded-xl border border-amber-200/15 bg-amber-200/8">
            <Sparkles size={16} aria-hidden="true" className="text-amber-200" />
          </span>
          <p className="mt-4 text-sm font-medium text-stone-300">
            {selectedCategory ? "Ready when you are" : "No focus area selected"}
          </p>
          <p className="mt-1.5 max-w-64 text-xs leading-5 text-stone-600">
            {selectedCategory
              ? "Generate role-specific prompts to guide the interview conversation."
              : "Choose an available category before generating interview prompts."}
          </p>
        </div>
      )}
    </section>
  );
}
