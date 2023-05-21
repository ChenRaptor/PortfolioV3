import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
    const execSync = require('child_process').execSync;
    // import { execSync } from 'child_process';  // replace ^ if using ES modules

    const output = execSync('ls -la', { encoding: 'utf-8' });  // the default is 'buffer'
    const splitted = output.split(/\r?\n/);
    const filtered = splitted.filter( (e:any) => {
      return e !== '';
    });




  //const product = await res.json();
 
  return NextResponse.json(JSON.stringify(filtered));
}