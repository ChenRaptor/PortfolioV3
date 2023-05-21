import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';

// Get my repositories

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const repos = searchParams.get('repos');

    const octokit = new Octokit({
        auth: process.env.GITHUB_TOKEN
      })
    
      const value = await octokit.request('GET /repos/ChenRaptor/{repos}/languages', {
        repos,
        headers: {
          'X-GitHub-Api-Version': '2022-11-28'
        }
      })
    
      return NextResponse.json(value.data);
}