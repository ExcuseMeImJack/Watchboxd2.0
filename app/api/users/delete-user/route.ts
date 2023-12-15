import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  try {
    if(!username) throw new Error('Username required');

    await sql`
      DELETE FROM Users
      WHERE username = ${username}
    `;

    return NextResponse.json({ message: 'User deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message}, { status: 500});
  }
}
