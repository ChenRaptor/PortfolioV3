import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import { connectToDatabase } from '@/libs/mongodb';

export async function GET(request: Request) {
    //dzd
    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
    })
      
    const value = await octokit.request('GET /user/repos?type={type}', {
        type: 'owner',
        headers: {
          'X-GitHub-Api-Version': '2022-11-28',
        }
    })
    
    const repos = await Promise.all(value.data.map(async (item: any) => {
        const languages_distribution = await octokit.request('GET /repos/ChenRaptor/{repo}/languages', {
          repo: item.name,
          headers: {
            'X-GitHub-Api-Version': '2022-11-28',
          }
        });
      
        return {
          name: item.name,
          full_name: item.name,
          private: item.private,
          html_url: item.html_url,
          description: item.description,
          fork: item.fork,
          created_at: item.name,
          updated_at: item.updated_at,
          pushed_at: item.pushed_at,
          obtained_at: new Date().getTime(),
          size: item.size,
          language: item.language,
          languages_distribution: languages_distribution.data,
          visibility: item.visibility,
          default_branch: item.default_branch
        };
      }));

    const { db } = await connectToDatabase();
    const collection = db.collection("repos");
    await collection.deleteMany({})
    collection.insertMany(repos);

    const newHeaders = new Headers();
    newHeaders.append('cache-control','no-cache, no-store, max-age=0');
    NextResponse.next({
        request: {
          headers: newHeaders,
        }
    });
    
    return NextResponse.json({message: 'successful', value: repos});
}
