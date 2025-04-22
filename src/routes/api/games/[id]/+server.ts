import { deleteGame } from "$lib/database/sheets";
import { error, json } from "@sveltejs/kit";

export async function DELETE({ params, cookies }) {
    const token = cookies.get('user-role');
    if (token !== 'score-keeper' && token !== 'admin' && token !== 'coach') {
        return error(403, "You don't have the right O you don't have the right");
    }
    const { id } = params;
    console.log(params);

    deleteGame(id);

    return json({message: `Game ${id} deleted successfully.`})
}