import { deleteGame } from "$lib/database/sheets";
import { json } from "@sveltejs/kit";

export async function DELETE({ params }) {
    const { id } = params;
    console.log(params);

    deleteGame(id);

    return json({message: `Game ${id} deleted successfully.`})
}