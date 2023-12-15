import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function createListMediaTable(request: Request) {
  try {
    const result = await sql`
      CREATE TABLE ListMedia (
        list_id INTEGER REFERENCES Lists(list_id),
        film_id INTEGER REFERENCES FilmsFromAPI(film_id),
        show_id INTEGER REFERENCES ShowsFromAPI(show_id),
        PRIMARY KEY (list_id, film_id, show_id)
      );
    `;
    return NextResponse.json({ result }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}
