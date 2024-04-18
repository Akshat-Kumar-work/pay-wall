import { NextRequest, NextResponse } from "next/server";

async function middleware(req: NextRequest) {
     

    return NextResponse.next();
}

export default middleware;
