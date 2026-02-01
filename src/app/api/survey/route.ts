import { NextResponse } from "next/server";
import { Pool } from "pg";
// No fs import
// No path import

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // No ssl object
});

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Extract uid from the request URL query parameters
    const { searchParams } = new URL(request.url);
    const uid = searchParams.get('uid');

    // Combine formData with uid
    const dataToInsert: { [key: string]: any } = { ...formData };
    if (uid) {
      dataToInsert.uid = uid;
    }

    // Define the column names dynamically based on dataToInsert keys
    const columns = Object.keys(dataToInsert).join(', ');
    const values = Object.values(dataToInsert);

    // Create placeholders for the SQL query values (e.g., $1, $2, $3)
    const valuePlaceholders = Object.keys(dataToInsert).map((_, index) => `$${index + 1}`).join(', ');

    const client = await pool.connect();
    try {
      // Specify the schema in the INSERT query
      const query = `INSERT INTO satisfaction.survey_submissions(${columns}) VALUES(${valuePlaceholders}) RETURNING *;`;
      const result = await client.query(query, values);
      return NextResponse.json({ message: 'Survey submitted successfully', submission: result.rows[0] }, { status: 201 });
    } finally {
      client.release();
    }
  } catch (error) {
    console.error('Error submitting survey:', error);
    return NextResponse.json({ message: 'Error submitting survey', error: (error as Error).message }, { status: 500 });
  }
}
