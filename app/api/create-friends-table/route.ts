import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function createFriendsTable(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE Friends (
        friendship_id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES Users(user_id),
        friend_id INTEGER REFERENCES Users(user_id)
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}