"use server"

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";



const onRampTransactionAction = async(amount:number,provider:string)=>{

    const session = await getServerSession(authOptions);

    if(!session?.user || !session.user?.id){
        return{
            mess:"Unauthenticated request"
        }
    }

    //creating false token , but token have to come from bank providers
    const token = (Math.random()*1000).toString();

    try{
        const transactionEntry =    await prisma.onRampTransaction.create({
            data:{
                provider:provider,
                status:"Processing",
                userId:Number(session?.user?.id),
                amount: amount*100,
                token:token,
                startTime: new Date()
            }
        })
    }
    catch(e){
        console.log("error while creating on ramp transaction entry ",e)
    }

    return{
        mess:"on ramp transaction entry done"
    }
}


export default onRampTransactionAction;