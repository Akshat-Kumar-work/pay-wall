 import { getServerSession } from "next-auth";
 import prisma from "@repo/db/client";
 import { authOptions } from "./auth";
 
 async function getBalance() {
 
    const session = await getServerSession(authOptions);

    if(!session?.user || !session.user?.id){
        return{
            mess:"Unauthenticated request"
        }
    }
   try{
    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        },
        include:{
            user:true
        }
    });

    console.log("balance details",balance);



    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
   }
   catch(e){
    console.log("err while fetching balance data",e);
   }
}

export default getBalance;