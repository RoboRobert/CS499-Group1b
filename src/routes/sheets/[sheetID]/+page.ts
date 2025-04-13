import { dbDataToSheetData, dbGoalsToGoals, dbMetaToMeta, dbPenaltiesToPenalties, dbPlayersToPlayers, dbSavesToSaves, dbStatsToStats, dbTimeoutsToTimeouts } from "$lib/conversion/dbToSheet";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ params, fetch }) => {
    const sheetId = params.sheetID;  // Extracts the slug from the URL

    try {
        const response = await fetch(`/api/scoresheet/${sheetId}`);
        let data = await response.json();
        console.log(JSON.stringify(data.timeouts));
        
        dbMetaToMeta(data.sheet);
        dbStatsToStats(data.gameStats);
        dbDataToSheetData(data.sheetInfo);
        dbSavesToSaves(data.saves);
        dbTimeoutsToTimeouts(data.timeouts);
        dbPenaltiesToPenalties(data.penalties);
        dbGoalsToGoals(data.goals);
        dbPlayersToPlayers(data.sheetPlayers);

        return {};
    } catch (err) {
        console.error('Error loading data:', err);
    }
};