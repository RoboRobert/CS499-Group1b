import { error, json, type RequestHandler } from "@sveltejs/kit";

export const POST = async ({ request }) => {
  // Parse incoming JSON data from the request body
  const data = await request.json();

  // Example validation
  if (data.players[0][0].number != 1) {
    throw error(400, "First number must be 1");
  }

  // Simulate processing the data (e.g., save to a database or perform calculations)
  // For example, return the received name as part of the response
  return json({ message: "No errors were detected in the scoresheet.", data: data.players });
};
