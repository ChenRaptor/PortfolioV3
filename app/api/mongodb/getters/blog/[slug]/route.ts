import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';

export async function GET(request: Request) {

    const { pathname } = new URL(request.url)
    const array = pathname.split('/')
    const name = array[array.length - 1];

    const { db } = await connectToDatabase();
    const collection = db.collection("blog");

    const value = await collection.findOne({name})

    return NextResponse.json(value);
}