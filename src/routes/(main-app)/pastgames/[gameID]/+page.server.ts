import type { PageServerLoad } from './$types';
import type {game, scoresheet} from '../pastgames.svelte'


export const load: PageServerLoad = async ({ params, fetch }) => {
    const gameId = params.gameID;  // Extracts the slug from the URL

    const response = await fetch(`/api/games`);
    const games: game[] = await response.json();
    const game: game = games.find((game) => game.gameId === gameId);

    const response2 = await fetch(`/api/scorsheets`);
    const scorsheets: scoresheet[] = await response2.json();
    const gameScoresheets: scoresheet[] = scorsheets.filter((scorsheet) => scorsheet.gameId === gameId);


    return {
        game,
        gameScoresheets
    };
};
