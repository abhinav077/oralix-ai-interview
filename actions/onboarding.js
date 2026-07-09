"use server"

import { db } from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";
import { t } from "shiki/bundle/full";

export const completeOnboarding = async (data) => {
    const user = await currentUser();

    if(!user) {
        throw new Error("User not found");
    }

    const {role, title, company, yearsExp, bio, categories} = data;

    if(!role || !["INTERVIEWER", "INTERVIEWEE"].includes(role)) {
        throw new Error("Invalid role");
    }

    if(role === "INTERVIEWER"){
        if(!title || !company || !yearsExp || !bio || !categories?.length) {
            throw new Error("Missing required fields for interviewer");
        }
    }
    
    try {
        await db.user.update({
            where: { clerkUserId: user.id },
            data: {
                role,
                ...(role === "INTERVIEWER" && {
                    title,
                    company,
                    yearsExp,
                    bio,
                    categories,
                }),
            },
        });

        return { success: true};

    } catch (error) {
        console.error("Error completing onboarding:", error);
        throw new Error("Failed to complete onboarding: " + error.message);
    }

};