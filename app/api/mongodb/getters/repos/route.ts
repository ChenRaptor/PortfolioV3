import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const page = parseInt(<string>searchParams.get('page'))
    const nbByPage = parseInt(<string>searchParams.get('nbByPage'))

    const { db } = await connectToDatabase();
    const collection = db.collection("repos");

    const value = await collection.find().skip(0 + page * nbByPage).limit(nbByPage).toArray(function(err: any, result: any) {
        if (err) throw err;
        return result
    })

    const newCount = await collection.countDocuments();

    return NextResponse.json({value, count: newCount});
}