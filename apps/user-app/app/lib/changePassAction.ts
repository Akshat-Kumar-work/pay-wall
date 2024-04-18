"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export const changePassword = async(password:string)=>{

    const session = await getServerSession(authOptions);
   

    if(!session?.user || !session.user?.id){
        return{
            mess:"Unauthenticated request"
        }
    }

    try{
        
        const userData = await prisma.user.findUnique({
            where:{
                id:Number(session.user.id)
            }
        })
    
        if(!userData){
            return{
                mess:"user not found"
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);

        const updatedUser = await prisma.user.update({
            where:{
                id:Number(session.user.id)
            },
            data:{
                password:String(hashedPassword)
            }
        });

        console.log("updated user",updatedUser);
        return updatedUser
    }
    catch(e){
        console.log("err while updating user pass",e);
        return {
            mess:"err while updating user passs"
        }
    }

}