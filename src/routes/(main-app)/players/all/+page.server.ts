import type { player } from '../../rosters/rosters.svelte';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const response = await fetch("/api/players")
    const teams: player[] = await response.json()
    return {  teams }
};