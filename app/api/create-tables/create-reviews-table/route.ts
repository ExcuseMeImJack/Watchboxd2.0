import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE Reviews (
        review_id SERIAL PRIMARY KEY,
        review_text TEXT,
        rating INTEGER,
        user_id INTEGER REFERENCES Users(user_id),
        film_id INTEGER REFERENCES FilmsFromAPI(film_id),
        show_id INTEGER REFERENCES ShowsFromAPI(show_id)
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
