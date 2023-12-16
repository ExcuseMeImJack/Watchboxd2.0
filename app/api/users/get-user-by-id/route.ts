import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  try {
    if(!username) throw new Error('Username required');

    const userRaw = await sql`
      SELECT
        user_id,
        username,
        email,
        profile_picture,
        creation_date,
        last_login_date
      FROM Users
      WHERE username = ${username}
    `;

    const user = userRaw?.rows[0];

    if(!user) throw new Error(`Cannot find user with username: ${username}`)

    return NextResponse.json({ User: user }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
