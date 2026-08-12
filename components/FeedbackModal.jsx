"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  Sparkles,
  TrendingUp,
  MessageSquare,
  Brain,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { GrayTitle } from "@/components/reusables";
import { RATING_CONFIG } from "@/lib/data";

export function FeedbackModal({
  open,
  onOpenChange,
  feedback,
  intervieweeName,
}) {
  if (!feedback) return null;

  const rating = RATING_CONFIG[feedback.overallRating];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="dialog-editorial max-h-[85vh] overflow-y-auto sm:max-w-3xl">

        <DialogHeader className="relative">
          <DialogTitle className="font-heading text-3xl tracking-tight">
            <GrayTitle>AI Feedback Report</GrayTitle>
          </DialogTitle>

          {intervieweeName && (
            <p className="mt-1 text-xs font-light text-[#6d6d63]">
              Performance Analysis For {intervieweeName}
            </p>
          )}
        </DialogHeader>

        <div className="relative flex flex-col gap-5 mt-2">
          {/* Rating */}
          <div
            className="flex items-center justify-between rounded-[24px] border-2 border-[#1a1a1a] bg-[#f0d7ff] p-6 text-[#1a1a1a]"
          >
            <div>
              <p className="text-[10px] tracking-[0.12em] text-[#034f46]">
                Overall Rating
              </p>
              <p className="font-serif text-3xl">{rating.label}</p>
            </div>

            <span className="grid size-12 place-items-center rounded-full border-2 border-[#1a1a1a] bg-[#ffffeb] text-[#034f46]" aria-hidden="true"><Sparkles size={20} /></span>
          </div>

          {/* Summary */}
          <div className="rounded-[24px] border-2 border-[#1a1a1a]/15 bg-[#ffffeb] p-5">
            <div className="mb-2 flex items-center gap-2">
              <Sparkles size={15} className="text-[#034f46]" />
              <p className="text-[10px] tracking-[0.12em] text-[#6d6d63]">
                Summary
              </p>
            </div>
            <p className="text-sm text-[#1a1a1a]/75">{feedback.summary}</p>
          </div>

          {/* Recommendation */}
          <div className="rounded-[24px] border-2 border-[#1a1a1a]/15 bg-[#ffffeb] p-5">
            <p className="mb-2 text-[10px] tracking-[0.12em] text-[#6d6d63]">
              Recommendation
            </p>
            <p className="text-sm text-[#1a1a1a]/75">{feedback.recommendation}</p>
          </div>

          {/* Sections */}
          <div className="grid gap-3">
            {[
              {
                icon: <Brain size={15} className="text-[#034f46]" />,
                label: "Technical",
                value: feedback.technical,
              },
              {
                icon: <MessageSquare size={15} className="text-[#034f46]" />,
                label: "Communication",
                value: feedback.communication,
              },
              {
                icon: <TrendingUp size={15} className="text-[#034f46]" />,
                label: "Problem Solving",
                value: feedback.problemSolving,
              },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[24px] border-2 border-[#1a1a1a]/15 bg-[#ffffeb] p-5"
              >
                <div className="flex items-center gap-2 mb-2">
                  {item.icon}
                  <p className="text-[10px] tracking-[0.12em] text-[#6d6d63]">
                    {item.label}
                  </p>
                </div>
                <p className="text-sm text-[#1a1a1a]/75">{item.value}</p>
              </div>
            ))}
          </div>

          {/* Strengths & Improvements */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[24px] border-2 border-[#1a1a1a] bg-[#034f46] p-5 text-[#ffffeb]">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 size={15} className="text-[#f0d7ff]" />
                <p className="text-[10px] tracking-[0.12em] text-[#ffffeb]/70">
                  Strengths
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {feedback.strengths?.map((s, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="h-auto justify-start whitespace-normal border-[#ffffeb]/25 bg-[#ffffeb]/10 text-left text-[#ffffeb]"
                  >
                    ✓ {s}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="rounded-[24px] border-2 border-[#1a1a1a] bg-[#ffa946] p-5 text-[#1a1a1a]">
              <div className="mb-3 flex items-center gap-2">
                <AlertCircle size={15} />
                <p className="text-[10px] tracking-[0.12em] text-[#1a1a1a]/65">
                  To Improve
                </p>
              </div>

              <div className="flex flex-col gap-2">
                {feedback.improvements?.map((imp, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="h-auto justify-start whitespace-normal border-[#1a1a1a]/20 bg-[#ffffeb]/30 text-left text-[#1a1a1a]"
                  >
                    ✓ {imp}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
