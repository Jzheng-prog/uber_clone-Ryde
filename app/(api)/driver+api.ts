import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    // console.log("Inside driver API call");

    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not defined in the environment variables."
      );
    }

    const sql = neon(`${process.env.DATABASE_URL}`);

    const response = await sql("SELECT * FROM drivers");

    // console.log("Query executed successfully:", response);

    return new Response(JSON.stringify({ data: response }), { status: 200 });
  } catch (error) {
    console.error("Error fetching drivers:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
