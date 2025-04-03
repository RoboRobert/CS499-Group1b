import { dbSavesToSaves, dbTimeoutsToTimeouts, dbStatsToStats, dbDataToSheetData, dbPenaltiesToPenalties, dbGoalsToGoals } from "$lib/conversion/dbToSheet";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ params, fetch }) => {
    const sheetId = params.sheetID;  // Extracts the slug from the URL

    try {
        const response = await fetch(`/api/scoresheet/get/${sheetId}`);
        let data = await response.json();
        console.log(data);

        dbStatsToStats(data.gameStats);
        dbDataToSheetData(data.sheetInfo);
        dbSavesToSaves(data.saves);
        dbTimeoutsToTimeouts(data.timeouts);
        dbPenaltiesToPenalties(data.penalties);
        dbGoalsToGoals(data.goals);

        return {};
    } catch (err) {
        console.error('Error loading data:', err);
    }
};