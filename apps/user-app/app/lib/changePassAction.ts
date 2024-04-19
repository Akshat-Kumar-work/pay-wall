"use server"

import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import prisma from "@repo/db/client";
import bcrypt from "bcrypt";

export const changePassword = async(password:string)=>{

    const session = await getServerSession(authOptions);

    console.log("session data",session);
   

    if(!session?.user || !session.user?.id){
        return{
            mess:"Unauthenticated request"
        }
    }

    try{
        
        const userData = await prisma.user.findUnique({
            where:{
               email:String(session.user.email)
            }
        })
    
        if(!userData){
            return{
                mess:"user not found"
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const updatedUser = await prisma.user.update({
            where:{
                email:String(session.user.email)
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