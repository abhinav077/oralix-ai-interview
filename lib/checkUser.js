import {auth, currentUser} from '@clerk/nextjs/server'
import {db} from './prisma'

const PLAN_CREDITS = {
    free: 1,
    starter: 5,
    pro: 15
}

const getCurrentPlan = async () => {
    const {has} = await auth();
    if(has({plan: 'pro'})) return 'pro';
    if(has({plan: 'starter'})) return 'starter';
    return 'free';
}

const shouldAllocateCredits = (dbUser, currentPlan) => {
    // Always Allocate if plan changed
    if(dbUser.currentPlan !== currentPlan) return true;

    // Allocate if never allocated before
    if(!dbUser.creditsLastAllocatedAt) return true;

    // Allocate if its a new calender month since last allocation
    const now = new Date();
    const last = new Date(dbUser.creditsLastAllocatedAt);
    const isNewMonth = now.getFullYear() > last.getFullYear() || now.getMonth() > last.getMonth();

    return isNewMonth;
}

export const checkUser = async () => {
    const user = await currentUser();
    if(!user)  return null;

    try {
        const currentPlan = await getCurrentPlan();
        const credits = PLAN_CREDITS[currentPlan];

        const loggedInUser = await db.user.findUnique({
            where: { clerkUserId: user.id },
        })

        if(loggedInUser) {
            // Interviewers dont have a credit subcription - skip allocation
            // if(loggedInUser.role === 'INTERVIEWER') return loggedInUser;
            
            if(shouldAllocateCredits(loggedInUser, currentPlan)){
                return await db.user.update({
                    where: { clerkUserId: user.id },
                    data: {
                        credits,
                        currentPlan,
                        creditsLastAllocatedAt: new Date()
                    }, 
                });
            }

            return loggedInUser;

        }

        // New user - create with credits from their current plan
        const name = `${user.firstName} ${user.lastName}`;

        return await db.user.create({
            data: {
                clerkUserId: user.id,
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
                credits,
                currentPlan,
                creditsLastAllocatedAt: new Date()
            }
        });


    } catch (error) {
        console.error(error);
        console.log('Error checking user:', error.message);
        return null;
    }

}