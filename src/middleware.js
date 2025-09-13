import { NextResponse } from "next/server"
import { jwtVerify } from "jose"
export async function middleware(req) {

    const token = req.headers.get("authorization")?.split(" ")[1]
console.log('token', token)
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
        console.log(payload)

        if (payload.isAdmin)
            return NextResponse.next()
        else
            return NextResponse.json(
                { message: "Access denied: Admins only" },
                { status: 403 }
            )
    } catch (err) {
        return NextResponse.json(
            { message: err },
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