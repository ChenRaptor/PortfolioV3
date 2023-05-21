import { NextResponse } from 'next/server';
import { exec } from 'child_process';

function execPromise(command: string) {
    return new Promise(function(resolve, reject) {
        exec(command, (error: any, stdout: any, stderr: any) => {
            if (error) {
                console.log(error)
                reject(error);
                return;
            }
            console.log(stdout);
            resolve('ok');
        });
    });
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const name = searchParams.get('name');
    console.log(name);
    execPromise(`cd ../../ && git clone https://ChenRaptor:${process.env.GITHUB_TOKEN}@github.com/ChenRaptor/${name} ${name}`)
    return NextResponse.json({state: 'ok'})
}