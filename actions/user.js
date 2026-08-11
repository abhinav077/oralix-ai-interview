"use server";

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { CreditTransactionScalarFieldEnum } from "@/lib/generated/prisma/internal/prismaNamespace";

export const getCurrentUser = async () => {
  const user = await currentUser();
  if (!user) return null;

  return db.user.findUnique({
    where: { clerkUserId: user.id },
    select: {
      role: true,
      name: true,
      title: true,
      company: true,
      imageUrl: true,
      credits: true,
    },
  });
};