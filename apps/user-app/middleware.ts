
import { NextRequest, NextResponse } from "next/server";


function  middleware(req:NextRequest){

        return NextResponse.next();

}

export default middleware;