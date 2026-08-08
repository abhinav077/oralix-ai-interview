"use server"

import { currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { revalidatePath } from "next/cache";



export const getInterviewerProfile = async (interviewerId) => {
    try {
        const interviewer = await db.user.findUnique({
            where: { id: interviewerId, role: "INTERVIEWER" },
            select: {
                id: true,
                name: true,
                imageUrl: true,
                title: true,
                company: true,
                yearsExp: true,
                bio: true,
                categories: true,
                creditRate: true,
                availabilities: {
                    where: { satus: "AVAILABLE" },
                    select: { startTime: true, endTime: true },
                    take: 1,
                },
                bookingsAsInterviewer: {
                    where: { status: "SCHEDULED" },
                    select: { startTime: true, endTime: true },
                },
            },
        });

        return interviewer ?? null;
    } catch (error) {
        console.error("getInterviewerProfile error:", error);
        throw new Error("Failed to fetch interviewer profile");

    }
};

export const bookSlot = async (interviewerId, startTime, endTime) => {
    const user = await currentUser();
    if (!user) {
        throw new Error("User not authenticated");
    }

    // Arcjet rate limit





    // --------------------------------

    const [dbUser, interviewer] = await Promise.all([
        db.user.findUnique({ where: { clearUserId: user.id } }),
        db.user.findUnique({ where: { id: interviewerId} }),
    ]);

    if(!dbUser || dbUser.role !== "USER") {
        throw new Error("Only Interviewees can book sessions");
    }
    if(!interviewer || interviewer.role !== "INTERVIEWER") {
        throw new Error("Invalid interviewer");
    }

    const credits = interviewer.creditRate ?? 10;

    if(dbUser.credits < credits) {
        throw new Error("Insufficient credits, please upgrade you plan");
    }

    // check slot isnt already booked
    const conflict = await db.booking.findFirst({
        where: {
            interviewerId,
            status: "SCHEDULED",
            startTime: { lt: new Date(endTime) },
            endTime: { gt: new Date(startTime) },
        },
    });

    if(conflict) {
        throw new Error("Slot already booked");
    }

    // create stream call
    let streamCallId;

    try{
        const streamClient = new streamClient(
            process.env.NEXT_PUBLIC_STREAM_API_KEY,
            process.env.STREAM_API_SECRET
        );

        await streamClient.updateUser([
            {
                id: dbUser.clearUserId,
                name: dbUser.name ?? "Interviewee",
                image: dbUser.imageUrl ?? undefined,
                roles: "user",
            },
            {
                id: interviewer.clearUserId,
                name: interviewer.name ?? "Interviewer",
                image: interviewer.imageUrl ?? undefined,
                roles: "interviewer",
            }
        ]);

        streamCallId = `mock-${Date.now()}_$Matth.random()}
        .toString(36)
        .slice(2, 7)}`;

        const call = streamClient.video.call("default", streamCallId );

        await call.getOrCreate({
            data:{
                created_by_id: dbUser.clearUserId,
                members:[
                    {user_id: dbUser.clearUserId, role: "host"},
                    {user_id: interviewer.clearUserId, role: "host"}
                ],
                settings_override: {
                    recording: { mode: "available", quality: "1080p" },
                    screensharing: { enabled: true},
                    transcription: { mode: "auto-on"},
                }
            }    
        });

    } catch (error) {
        console.error("Stream API error:", error);
        throw new Error("Failed to create video call");
    }

    try {
        const booking = await db.$transaction(async (tx) => {
            const newBooking = await tx.booking.create({
                data: {
                    interviewerId,
                    intervieweeId: dbUser.id,
                    startTime: new Date(startTime),
                    endTime: new Date(endTime),
                    status: "SCHEDULED",
                    streamCallId,
                    creditsCharged: credits,
                },
            });

            await tx.createTransaction({
                data: {
                    userId: dbUser.id,
                    type: "BOOKING_DEDUCTION",
                    amount: credits,
                    bookingId: newBooking.id,
                },
            });

            await tx.user.update({
                where: { id: dbUser.id },
                data: { credits: { decrement: credits } },
            });

            await tx.user.update({
                where: { id: interviewer.id },
                data: { credits: { increment: credits } },
            });

            return newBooking;
        });    

        revalidatePath(`/interviewers/${interviewerId}`);
        revalidatePath("/dashboard");

        return {success: true, bookingId: booking.id, streamCallId};

    } catch (error) {
        console.error("Booking creation error:", error);
        throw new Error("Failed to create booking");
    }
};