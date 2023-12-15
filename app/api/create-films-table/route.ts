import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function createFilmsFromAPITable(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE FilmsFromAPI (
        film_id SERIAL PRIMARY KEY,
        api_film_id VARCHAR(255),
        title VARCHAR(255),
        year VARCHAR(10),
        rated VARCHAR(20),
        released VARCHAR(50),
        runtime VARCHAR(20),
        genre VARCHAR(255),
        director VARCHAR(255),
        writer VARCHAR(255),
        actors TEXT,
        plot TEXT,
        language VARCHAR(100),
        country VARCHAR(100),
        awards VARCHAR(255),
        poster VARCHAR(255),
        imdb_rating VARCHAR(10),
        imdb_votes VARCHAR(20),
        type VARCHAR(20)
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
