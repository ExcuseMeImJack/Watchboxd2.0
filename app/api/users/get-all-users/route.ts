import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";


export async function GET(request: Request) {
  try {
    const usersRaw = await sql`
      SELECT
        user_id,
        username,
        email,
        profile_picture,
        creation_date,
        last_login_date
      FROM Users
    `;

    const users = usersRaw?.rows || [];

    return NextResponse.json({ Users: users }, { status: 200 });
  } catch(error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
