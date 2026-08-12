"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, Sparkles } from "lucide-react";
import { FeedbackModal } from "./FeedbackModal";
import { formatDate, formatDuration, formatTime } from "@/lib/helpers";
import { RATING_LABEL, RATING_STYLES, STATUS_STYLES } from "@/lib/data";

export function AppointmentCard({ booking, mode, isPast = false }) {
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const { has } = useAuth();

  const {
    startTime,
    endTime,
    status,
    creditsCharged,
    streamCallId,
    recordingUrl,
    feedback,
  } = booking;

  const person =
    mode === "interviewer" ? booking.interviewee : booking.interviewer;

  const creditsLabel =
    mode === "interviewer"
      ? `+${creditsCharged} credits earned`
      : `−${creditsCharged} credits`;

  const creditsStyle =
    mode === "interviewer"
      ? "border-[#034f46] bg-[#034f46] text-[#ffffeb]"
      : "border-[#ffa946] bg-[#ffa946]/15 text-[#1a1a1a]";

  const isUpcoming = status === "SCHEDULED";

  return (
    <>
      <FeedbackModal
        open={feedbackOpen}
        onOpenChange={setFeedbackOpen}
        feedback={feedback}
        intervieweeName={
          mode === "interviewer" ? booking.interviewee?.name : undefined
        }
      />

      <article className="paper-card group relative flex min-w-0 flex-col gap-6 p-5 transition-transform duration-300 hover:-translate-y-1 sm:p-6">
        <div className="grid gap-5 sm:grid-cols-[auto_1fr_auto] sm:items-start">
          <div className="flex min-w-0 items-center gap-4">
            <Avatar className="size-12 shrink-0 rounded-full border-2 border-[#1a1a1a]">
              <AvatarImage
                src={person?.imageUrl}
                alt={person?.name}
                className="rounded-full"
              />
              <AvatarFallback className="rounded-full bg-[#f0d7ff] text-base font-medium text-[#034f46]">
                {person?.name?.[0] ?? "?"}
              </AvatarFallback>
            </Avatar>

            <div className="flex min-w-0 flex-col gap-1">
              <p className="truncate font-heading text-xl leading-tight tracking-tight">
                {person?.name ?? "—"}
              </p>
              {person?.title && person?.company ? (
                <p className="truncate text-xs text-[#6d6d63]">
                  {person.title}
                  <span className="text-stone-700 mx-1.5">·</span>
                  {person.company}
                </p>
              ) : (
                <p className="truncate text-xs text-[#6d6d63]">
                  {person?.email}
                </p>
              )}
              {mode === "interviewee" && person?.categories?.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1">
                  {person.categories.slice(0, 3).map((cat) => (
                    <span
                      key={cat}
                      className="rounded-full border border-[#034f46]/25 bg-[#034f46]/5 px-2 py-0.5 text-[10px] leading-tight text-[#034f46]"
                    >
                      {cat.replace("_", " ")}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-row flex-wrap items-center gap-2 sm:flex-col sm:items-end">
            <Badge variant="outline" className={`${STATUS_STYLES[status]} rounded-none px-2 py-0.5 text-[10px] tracking-wide`}>
              {status.charAt(0) + status.slice(1).toLowerCase()}
            </Badge>
            <Badge variant="outline" className={`${creditsStyle} rounded-none px-2 py-0.5 text-[10px] tracking-wide`}>
              {creditsLabel}
            </Badge>
          </div>
        </div>

        <div className="h-px bg-[#1a1a1a]/20" />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border-l-2 border-[#034f46]/35 pl-3">
              <div className="flex items-center gap-1.5 text-[#6d6d63]">
              <Calendar size={12} strokeWidth={1.5} />
                <span className="text-[10px] font-semibold tracking-[0.08em]">
                Date
              </span>
            </div>
            <p className="mt-1 text-sm">{formatDate(startTime)}</p>
          </div>

          <div className="border-l-2 border-[#1a1a1a]/15 pl-3">
              <div className="flex items-center gap-1.5 text-[#6d6d63]">
              <Clock size={12} strokeWidth={1.5} />
                <span className="text-[10px] font-semibold tracking-[0.08em]">
                Time
              </span>
            </div>
            <p className="mt-1 text-sm text-[#1a1a1a]">
              {formatTime(startTime)}
              <span className="text-stone-600 mx-1">–</span>
              {formatTime(endTime)}
            </p>
          </div>

          <div className="border-l-2 border-[#1a1a1a]/15 pl-3">
              <div className="flex items-center gap-1.5 text-[#6d6d63]">
              <Video size={12} strokeWidth={1.5} />
                <span className="text-[10px] font-semibold tracking-[0.08em]">
                Duration
              </span>
            </div>
            <p className="mt-1 text-sm text-[#1a1a1a]">
              {formatDuration(startTime, endTime)}
            </p>
          </div>
        </div>

        {feedback?.summary && (
          <div className="border-l-2 border-[#034f46] bg-[#034f46]/5 px-4 py-3">
            <p className="text-[10px] font-semibold tracking-[0.08em] text-stone-500">
              AI Feedback
            </p>
            <p className="mt-1.5 line-clamp-2 text-xs leading-relaxed text-[#6d6d63]">
              {feedback.summary}
            </p>
          </div>
        )}

        {(streamCallId || recordingUrl || feedback) && (
          <div className="flex flex-wrap items-center gap-2 border-t-2 border-[#1a1a1a]/12 pt-4">
            {!isPast && streamCallId && isUpcoming && (
              <Button variant="gold" size="sm" className="gap-2" asChild>
                <Link href={`/call/${streamCallId}`}>
                  <Video size={13} />
                  Join Call
                </Link>
              </Button>
            )}

            {recordingUrl && has?.({ plan: "pro" }) && (
              <Button variant="outline" size="sm" className="gap-2" asChild>
                <a
                  href={recordingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Video size={13} /> Recording
                </a>
              </Button>
            )}

            {feedback &&
              (has?.({ plan: "starter" }) || has?.({ plan: "pro" })) && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="gap-1.5 border-[#034f46]/25 text-[#034f46] hover:border-[#034f46] hover:bg-[#034f46]/5"
                    onClick={() => setFeedbackOpen(true)}
                  >
                    <Sparkles size={12} />
                    Full Feedback
                  </Button>
                  <Badge
                    variant="outline"
                    className={RATING_STYLES[feedback.overallRating]}
                  >
                    {RATING_LABEL[feedback.overallRating]} Performance
                  </Badge>
                </>
              )}
          </div>
        )}
      </article>
    </>
  );
}
