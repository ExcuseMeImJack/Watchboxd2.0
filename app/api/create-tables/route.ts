import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

async function createFilmsFromAPITable() {
  await sql`
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
}

async function createShowsFromAPITable() {
  await sql`
    CREATE TABLE ShowsFromAPI (
      show_id SERIAL PRIMARY KEY,
      api_show_id VARCHAR(255),
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
      type VARCHAR(20),
      total_seasons INTEGER
    );
  `;
}

async function createUsersTable() {
  await sql`
    CREATE TABLE Users (
      user_id SERIAL PRIMARY KEY,
      username VARCHAR(255) UNIQUE,
      email VARCHAR(255) UNIQUE,
      password_hash VARCHAR(255),
      profile_picture VARCHAR(255),
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      last_login_date TIMESTAMP
    );
  `;
}

async function createReviewsTable() {
  await sql`
    CREATE TABLE Reviews (
      review_id SERIAL PRIMARY KEY,
      review_text TEXT,
      rating INTEGER,
      user_id INTEGER REFERENCES Users(user_id),
      film_id INTEGER REFERENCES FilmsFromAPI(film_id),
      show_id INTEGER REFERENCES ShowsFromAPI(show_id)
    );
  `;
}

async function createDirectMessagesTable() {
  await sql`
    CREATE TABLE DirectMessages (
      message_id SERIAL PRIMARY KEY,
      sender_id INTEGER REFERENCES Users(user_id),
      receiver_id INTEGER REFERENCES Users(user_id),
      message_text TEXT,
      timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

async function createFriendsTable() {
  await sql`
    CREATE TABLE Friends (
      friendship_id SERIAL PRIMARY KEY,
      user_id INTEGER REFERENCES Users(user_id),
      friend_id INTEGER REFERENCES Users(user_id)
    );
  `;
}

async function createListMediaTable() {
  await sql`
    CREATE TABLE ListMedia (
      list_id INTEGER REFERENCES Lists(list_id),
      film_id INTEGER REFERENCES FilmsFromAPI(film_id),
      show_id INTEGER REFERENCES ShowsFromAPI(show_id),
      PRIMARY KEY (list_id, film_id, show_id)
    )
  `;
}

async function createListsTable() {
  await sql`
    CREATE TABLE Lists (
      list_id SERIAL PRIMARY KEY,
      list_name VARCHAR(255),
      description TEXT,
      creation_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;
}

export async function GET(request: Request) {
  try {
  await sql`
    DROP TABLE IF EXISTS DirectMessages CASCADE;
  `;
  await sql`
    DROP TABLE IF EXISTS Reviews CASCADE;
  `;
  await sql`
    DROP TABLE IF EXISTS Users CASCADE;
  `;
  await sql`
    DROP TABLE IF EXISTS Lists CASCADE;
  `;
  await sql`
    DROP TABLE IF EXISTS ShowsFromAPI CASCADE;
  `;
  await sql`
    DROP TABLE IF EXISTS FilmsFromAPI CASCADE;
  `;

  await sql`
    DROP TABLE IF EXISTS Friends CASCADE;
  `;

  await sql`
    DROP TABLE IF EXISTS ListMedia CASCADE;
  `;


    await createFilmsFromAPITable();
    await createShowsFromAPITable();
    await createUsersTable();
    await createListsTable();
    await createReviewsTable();
    await createDirectMessagesTable();
    await createFriendsTable();
    await createListMediaTable();

    return NextResponse.json({ message: 'Tables created successfully' }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
