import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { connectToDatabase } from '@/libs/mongodb';
import { headers } from 'next/headers';


export async function GET(request: Request) {

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })

    const headersList = headers();
    const cache = headersList.get('cache-control');
    console.log(cache);
    const value = await octokit.request('GET /repos/{owner}/{repo}/git/trees/{branch}?recursive=1', {
        owner: 'ChenRaptor',
        repo: 'Blog',
        branch: 'main',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
    })

    const repos = await Promise.all(value.data.tree.map(async (item: any) => {
        const value2 = await octokit.request('GET /repos/{owner}/{repo}/contents/{path}', {
            owner: 'ChenRaptor',
            repo: 'Blog',
            path: item.path,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        })
      
        return value2.data
      }));
      
    const { db } = await connectToDatabase();
    const collection = db.collection("blog");
    await collection.deleteMany({})
    collection.insertMany(repos);

    
    const newHeaders = new Headers();
    newHeaders.append('cache-control','no-cache, no-store, max-age=0');
    NextResponse.next({
        request: {
          headers: newHeaders,
        }
    });
    return NextResponse.json({message: value, value: repos});
}