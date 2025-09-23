"use Server";

import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
})

export async function generateCoverLetter(data){

}

export async function getCoverLetters(){

}

export async function getCoverLetter(id){

}

export async function deleteCoverLetter(id){
    
}