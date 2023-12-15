import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');
  const email = searchParams.get('email');
  const password = searchParams.get('password');
  const profile_picture = "https://d3ki9tyy5l5ruj.cloudfront.net/obj/3d4665c7cf119dc9dc38232301b18fa68b9bb17c/avatar.svg";

  try {
    if(!username || !email || !password) throw new Error('Username, email, and password required');

    const hashedPassword = await bcrypt.hash(password, 10);

    await sql`
      INSERT INTO Users (username, email, password_hash, profile_picture, creation_date, last_login_date)
      VALUES (${username}, ${email}, ${hashedPassword}, ${profile_picture}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `;

    const newUser = await sql`
    SELECT * FROM Users
    WHERE username = ${username}
    `;

    const newUserData = newUser?.rows[0] || null;

    return NextResponse.json({ newUserData }, { status: 200 })

  } catch(error: any) {
    return NextResponse.json({ error: error.message}, { status: 500});
  }
}
