// Assignment

import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PayoutReviewClient from "./_components/PayoutReviewClient";

export default async function PayoutReviewPage({ params }) {
  const { id } = await params;

  const payout = await db.payout.findUnique({
    where: { id },
    include: {
      interviewer: { select: { name: true, email: true } },
    },
  });

  if (!payout) notFound();

  return (
    <main className="editorial-page product-surface px-5 py-10 antialiased sm:px-8 sm:py-16">
      <div className="mx-auto w-full max-w-2xl">
        <div className="ink-chamber rounded-b-none px-6 py-8 sm:px-10 sm:py-11">
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#f0d7ff]">
            Admin payout desk
          </p>
          <h1 className="mt-4 max-w-md font-heading text-4xl leading-[0.95] tracking-[-0.055em] sm:text-6xl">
            Review the
            <span className="block text-[#f0d7ff]">withdrawal.</span>
          </h1>
          <p className="mt-5 max-w-sm text-sm leading-6 text-[#ffffeb]/65">
            Verify the payout details before you release the interviewer&apos;s funds.
          </p>
        </div>

        <div className="rounded-b-[40px] border-2 border-t-0 border-[#1a1a1a] bg-[#ffffeb] p-5 sm:p-10">
          <PayoutReviewClient
            payout={{
              id: payout.id,
              credits: payout.credits,
              netAmount: payout.netAmount,
              platformFee: payout.platformFee,
              paymentMethod: payout.paymentMethod,
              paymentDetail: payout.paymentDetail,
              status: payout.status,
              interviewerName: payout.interviewer.name,
              interviewerEmail: payout.interviewer.email,
            }}
          />
        </div>
      </div>
    </main>
  );
}
