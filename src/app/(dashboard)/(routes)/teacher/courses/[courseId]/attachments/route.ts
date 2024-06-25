import { db } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"

export async function POST(req: Request, { params }: { params: { courseId: string } }) {
    try {
        const { userId } = auth()
        const { url } = await req.json()

        if (!userId) {
            return new NextResponse("Unauthorized")
        }

        const courseOwner = await db.course.findUnique({
            where: {
                id: params.courseId,
                userId: userId
            }
        })

        if (!courseOwner) {
            return new NextResponse("Internal Error", { status: 401 })
        }

        const attachment = await db.attachment.create({
            data: {
                url,
                name: url,
                courseId: params.courseId
            }
        })

        return NextResponse.json(attachment)

    } catch (error) {
        console.log("course_id_attachemnt", error)
        return new NextResponse("Internal error", { status: 500 })
    }
}