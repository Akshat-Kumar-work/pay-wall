"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "./auth"
import prisma from "@repo/db/client"



//function to get on ramp transactions from db for current user
export async function getOnRampTransactions() {
    const session = await getServerSession(authOptions);
    //finding all transactions of the current user id 
    const onRampTransaction = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });

    //returning all on ramp transaction of current user id 
    return onRampTransaction.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}