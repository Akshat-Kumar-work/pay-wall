"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import { NextResponse } from "next/server";

export const GET= async()=>{
   try{
    const session = await getServerSession(authOptions);
    if(session.user){
        return NextResponse.json({
            user:session.user
        });
   }}
   catch(e){
    console.log("err while getting server session",e);
   }
    return NextResponse.json({
        mess:"You are not logged in "
    })
}