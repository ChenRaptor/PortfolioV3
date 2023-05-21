import { NextResponse } from 'next/server';
 export async function GET(request: Request) {
    const { exec } = require("child_process");
    let valid = null;
    exec("ls -la", (error: any, stdout: any, stderr:any) => {
        if (error) {
            valid = `error: ${error.message}`
            console.log(`error: ${error.message}`);
        }
        if (stderr) {
            valid = `stderr: ${stderr}`
            console.log(`stderr: ${stderr}`);
        }
        valid = `stdout: ${stdout}`
        console.log(`stdout: ${stdout}`);
    });
 
  return NextResponse.json(valid);
}