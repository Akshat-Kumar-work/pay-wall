import prisma from "@repo/db/client"
import { getServerSession } from "next-auth"
import { authOptions } from "./auth"


const getP2pTransacData = async ()=>{
    const session = await getServerSession(authOptions);

    if(!session?.user || !session.user?.id){
        return []
    }

    const transaction = await prisma.p2pTransfer.findMany({
        where:{
             fromUserId:Number(session.user.id)
        },
        include:{
            toUser:true
        }
    })
   
    return transaction.map( singleTransac=>({
     
            id: singleTransac.id,
            amount: singleTransac.amount,
            time: singleTransac.timestmap,
            to: singleTransac.toUser.name}
        )
    )

}


export default getP2pTransacData