import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function createDirectMessagesTable(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE DirectMessages (
        message_id SERIAL PRIMARY KEY,
        sender_id INTEGER REFERENCES Users(user_id),
        receiver_id INTEGER REFERENCES Users(user_id),
        message_text TEXT,
        timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
