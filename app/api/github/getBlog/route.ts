import { NextResponse } from 'next/server';
import { Octokit } from 'octokit';
import path from 'path';
import fs from 'fs';

// Get my repositories

const pathFile = path.join(process.cwd(), 'data/blog/');
const content = JSON.parse(fs.readFileSync(`${pathFile}register.json`, 'utf8'));

export async function GET(request: Request) {

    const blogName = 'newArticle.md'

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


    const decodedString = atob(value.data.content);

    console.log(decodedString)

    fs.writeFile(`${pathFile}content/${blogName}`, decodedString, function (err) {
        if (err) throw err;
        console.log('Saved!');
    })

    content.push(value.data)
    fs.writeFileSync( `${pathFile}register.json` , JSON.stringify(content, null, 2));
    // console.log(contents)
    // contents.push('ok')
    // // contents.push(value);

    // fs.writeFile(`${pathFile}register.json`, contents, function (err) {
    //     if (err) throw err;
    //     console.log('Saved!');
    // })

    
    return NextResponse.json(decodedString);
}