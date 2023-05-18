import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import path from 'path';
import fs from 'fs';

// Get my repositories

const pathFile = path.join(process.cwd(), 'data/github/' , 'repos.json');

function updateReposFile(content : any) {
  fs.writeFileSync( pathFile , JSON.stringify(content, null, 2));
}

export async function GET(request: Request) {

  const octokit = new Octokit({
    auth: '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'
  })

  const value = await octokit.request('GET /user/repos?type={type}', {
    type: 'owner',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    }
  })

  updateReposFile(value.data)
  return NextResponse.json(value.data);

}