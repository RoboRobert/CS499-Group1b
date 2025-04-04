import { dbGameStatReset } from '$lib/database/gamestat'
import { dbIndividualScoreReset } from '$lib/database/individualscore'
import { dbPenaltyReset } from '$lib/database/penalties'
import { dbSaveReset } from '$lib/database/saves'
import { dbGameReset, dbSheetReset } from '$lib/database/sheets'
import { dbPlayersReset, dbTeamsReset } from '$lib/database/teams'
import { dbTimeoutReset } from '$lib/database/timeouts'
import { dbLoginReset } from '$lib/logon/logins'
import { dbGoalReset } from './goals'
import { dbSheetInfoReset } from './sheetinfos'
import { dbSheetPlayersReset } from './sheetPlayers'

export async function dbReset() {
    await dbLoginReset();
    await dbGameStatReset();
    await dbTeamsReset();
    await dbIndividualScoreReset();
    await dbPenaltyReset();
    await dbSaveReset();
    await dbGameReset();
    await dbSheetReset();
    await dbPlayersReset();
    await dbTimeoutReset();
    await dbSheetInfoReset();
    await dbGoalReset();
    await dbSheetPlayersReset();
}