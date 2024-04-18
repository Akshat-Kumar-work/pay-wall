"use server"

import db from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";



export const transfer = async(toemail:string,amount:number)=>{
    const sessionData =await  getServerSession(authOptions);
    if(!sessionData?.user || !sessionData.user?.id){
        return{
            mess:"Unauthenticated request"
        }
    };

    const toUser = await db.user.findUnique({
        where:{
            email:toemail
        }
    });

    if(!toUser){
        return{
            mess:"user not exist"
        }
    }

    await db.$transaction(

        async (client)=>{
            //LOCKING THE ROW to ensure there will be one request after another sequentially
            await client.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(sessionData.user.id)} FOR UPDATE`;
            const fromBalance = await client.balance.findUnique({
                where:{
                    userId: Number(sessionData.user.id) 
                }
            })

            if(!fromBalance || fromBalance.amount<amount){
                throw new Error ("Insufficient funds");
            }


         await  client.balance.update({
                where:{
                    userId: toUser.id
                },
                data:{
                    amount:{
                        increment: amount
                    }
                }
            }),
     
         await client.balance.update({
             where:{
                 userId: Number(sessionData.user.id) 
             },
             data:{
                 amount:{
                     decrement: amount
                 }
             }
         })

         await client.p2pTransfer.create({
            data:{
                fromUserId: Number(sessionData.user.id),
                toUserId:toUser.id,
                amount:amount,
                timestmap:new Date()
            }
         })
        });

}