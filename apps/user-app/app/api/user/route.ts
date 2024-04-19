import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import {  NextRequest, NextResponse } from "next/server";

export const GET= async()=>{

    //always use headers , cookies , server session outside the try catch it will not give err in build phase after development
    const session = await getServerSession(authOptions);

    if(session.user){
        return NextResponse.json({
            user:session.user
        });}

    return NextResponse.json({
        mess:"You are not logged in "
    })

}