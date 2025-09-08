"use server";
import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/dist/types/server";

export async function updateUser(data){
    const {userId} = await auth();
    if(!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
        where:{
            clerkUserId: userId,
        },
    });

    if(!user) throw new Error("User not found");

    try{

        const result = await db.$transaction(
            async()=>{},{
                timeout:10000,
            }
        );

        return result.user;

    }
    catch(error){
        console.error("Error updating user and industry:", error.message);
        throw new Error("failed to update profile");
    }
}