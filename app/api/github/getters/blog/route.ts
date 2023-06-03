import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { connectToDatabase } from '@/libs/mongodb';

export async function GET(request: Request) {

    const blogName = 'mongosh.md'

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })
      
    const value = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
        owner: 'ChenRaptor',
        repo: 'Blog',
        path: blogName,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    const { db } = await connectToDatabase();
    const collection = db.collection("blog");
    collection.insertOne(value.data);

    return NextResponse.json({message: 'successful', value: value.data});
}