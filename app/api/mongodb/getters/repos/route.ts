import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';

export async function GET(request: Request) {

    const { db } = await connectToDatabase();
    const collection = db.collection("repos");

    const value = await collection.find({}).toArray(function(err: any, result: any) {
        if (err) throw err;
        return result
    })

    return NextResponse.json(value);
}