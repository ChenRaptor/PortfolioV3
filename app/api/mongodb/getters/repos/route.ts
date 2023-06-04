import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/libs/mongodb';

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const page = parseInt(<string>searchParams.get('page'))
    const nbByPage = parseInt(<string>searchParams.get('nbByPage'))
    const regex = searchParams.get('regex')

    const { db } = await connectToDatabase();
    const collection = db.collection("repos");

    const query = { name: { $regex: regex ?? "", $options: "i" } };

    const value = await collection
        .find(query)
        .skip(0 + page * nbByPage)
        .limit(nbByPage)
        .toArray();

    const valid = await collection.countDocuments(query);
    const total = await collection.countDocuments();

    return NextResponse.json({ value, valid, total });
}