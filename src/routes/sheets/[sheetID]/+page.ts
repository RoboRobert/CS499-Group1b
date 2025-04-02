import { dbSavesToSaves, gameStatsToStats, sheetInfoToMetaData } from "$lib/conversion/dbToSheet";
import type { PageLoad } from "./$types";

export const ssr = false;

export const load: PageLoad = async ({ params, fetch }) => {
    const sheetId = params.sheetID;  // Extracts the slug from the URL

    try {
        const response = await fetch(`/api/scoresheet/get/${sheetId}`);
        let data = await response.json();
        console.log(data);

        gameStatsToStats(data.gameStats);
        sheetInfoToMetaData(data.sheetInfo);
        dbSavesToSaves(data.saves);

        return {};
    } catch (err) {
        console.error('Error loading data:', err);
    }
};