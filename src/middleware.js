import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
export async function middleware(req) {

    const token = req.headers.get("authorization")?.split(" ")[1]

    if (!token) {
        return NextResponse.json(
            { message: "No token provided" },
            { status: 403 }
        )
    }

    try {

        const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY)
        const { payload } = await jwtVerify(token, SECRET_KEY, {
            algorithms: ["HS256"],
        })

        if (payload.isAdmin)
            return NextResponse.next()
    } catch (err) {
        return NextResponse.json(
            { message: err.message },
            { status: 401 }
        )
    }
}

export const config = {
    matcher: [
        '/api/admin/add-medicine',
        '/api/admin/add-interaction'
    ]
}