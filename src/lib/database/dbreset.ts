import { dbLoginReset } from '$lib/logon/logins'
import { dbGameStatReset } from '$lib/database/gamestat'
import { dbIndividualScoreReset } from '$lib/database/individualscore'
import { dbPenaltyReset } from '$lib/database/penalties'
import { dbSaveReset } from '$lib/database/saves'
import { dbGameReset } from '$lib/database/sheets'
import { dbSheetReset } from '$lib/database/sheets'
import { dbPlayersReset } from '$lib/database/teams'
import { dbTeamsReset } from '$lib/database/teams'
import { dbTimeoutReset } from '$lib/database/timeouts'

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
}