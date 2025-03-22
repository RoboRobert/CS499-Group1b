import type { PageServerLoad } from './$types';
import type {game} from './pastgames.svelte'

export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch(`/api/games`);
    const games:game = await response.json();

    return {
        games
    };
}