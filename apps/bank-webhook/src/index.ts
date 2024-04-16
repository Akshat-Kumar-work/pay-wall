import express from "express";
import db from "@repo/db/client";
const app = express();

app.get("/",(req,res)=>{
    return res.json({
        "mess":"server working fine"
    })
})


interface paymentInformationType {
    token : string,
    userId: number,
    amount : number
}

//bank will hit this endpoint to update the user balance wallet
app.post("/hdfcWebhook",async(req,res)=>{

    try{

        const paymentInformation : paymentInformationType = {
            token : req.body.token,
            userId : req.body.user_indentifier,
            amount : req.body.amount
        }
        
        //using transactions to do 2 db query in single request so that if 1 fail 2nd also fail's 
        await db.$transaction([
             db.balance.update({
                where:{
                    userId: paymentInformation.userId
                },
                data:{
                    amount:{
                        increment: paymentInformation.amount
                    }
                }
            }),
        
            db.onRampTransaction.update({
                where:{
                    token: paymentInformation.token
                },
                data:{
                    status:"Success"
                }
            })
        ])

        res.status(200).json({
            mess:"req captured and updated"
        })
    }
    catch(e){
      return  res.status(500).json({
            mess:"internal server error",
        })
    }
})

