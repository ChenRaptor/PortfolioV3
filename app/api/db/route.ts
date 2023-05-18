import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

// Get my repositories

const pathFile = path.join(process.cwd(), 'data/github/' , 'repos.json');
const content = JSON.parse(fs.readFileSync(pathFile, 'utf8'));

export async function GET(request: Request) {
  return NextResponse.json(content);
}