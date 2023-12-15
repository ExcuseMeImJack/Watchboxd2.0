import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE Users (
        user_id SERIAL PRIMARY KEY,
        username VARCHAR(255),
        email VARCHAR(255),
        password_hash VARCHAR(255),
        profile_picture VARCHAR(255),
        creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login_date TIMESTAMP
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
