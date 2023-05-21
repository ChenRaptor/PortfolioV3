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
    execPromise("cd ../../ && ls -la")
    return NextResponse.json({state: 'ok'})
}
