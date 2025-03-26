import sql from '$lib/database/postgres';
import type { GameStat } from '$lib/database/GameStats';
import {addGameStat} from '$lib/database/gamestat';
import type { IndividualScore } from '$lib/database/IndividualScores';
import { addIndividualScore } from './individualscore'; 
import type { Penalty } from './Penalty';
import { addPenalty } from './penalties';
import type { Team } from './Team';
import { addTeam } from './teams';
import type {Timeout } from './Timeout';
import {addTimeout} from './timeouts';
import type {Save} from './Save';
import {addSave} from './saves';
import {Login} from './Login';
import {addLogin} from './login';


async function dbinsert_Saves(){
    const saves: Save[] = [ 

        {
          sheetid: 501,
          side: "home",
          player: "Alex Carter",
          playerno: 1,
          quarterone: 3,
          quartertwo: 4,
          quarterthree: 5,
          quarterfour: 2,
          ot: 1,
          total: 15
        },
        {
          sheetid: 502,
          side: "away",
          player: "Jake Lee",
          playerno: 12,
          quarterone: 2,
          quartertwo: 3,
          quarterthree: 4,
          quarterfour: 3,
          ot: 0,
          total: 12
        },
        {
          sheetid: 503,
          side: "home",
          player: "Chris Nguyen",
          playerno: 5,
          quarterone: 1,
          quartertwo: 2,
          quarterthree: 3,
          quarterfour: 2,
          ot: 0,
          total: 8
        }
    ];
    for (const stat of saves) {
        await addSave(stat);
    }

}
async function dbinsert_Timeouts(){
    const timeouts: Timeout[] = [

        {
          sheetid: 701,
          side: "home",
          halfone: 1,
          halftwo: 1,
          otone: 0,
          ottwo: 0
        },
        {
          sheetid: 702,
          side: "away",
          halfone: 1,
          halftwo: 0,
          otone: 1,
          ottwo: 0
        },
        {
          sheetid: 703,
          side: "home",
          halfone: 1,
          halftwo: 0,
          otone: 0,
          ottwo: 0
        }
    ];
        for (const stat of timeouts) {
            await addTimeout(stat);
        }
    
}



async function dbinsert_Teams(){
    const teams: Team[] = [
        {
          name: "Maple Hawks",
          id: "T001"
        },
        {
          name: "River Raptors",
          id: "T002"
        },
        {
          name: "Sunset Stallions",
          id: "T003"
        },
        {
          name: "Oceanview Orcas",
          id: "T004"
        },
        {
          name: "Highland Wolves",
          id: "T005"
        },
        {
          name: "Forest Falcons",
          id: "T006"
        }
    ];
    for (const stat of teams) {
        await addTeam(stat);

    }
}  

async function dbinsert_Penalties(){

    const penalties: Penalty[] = [
        {
          sheetid: 201,
          side: "home",
          pt: 1,
          playerno: 7,
          infraction: "Holding",
          quarter: 1,
          time: 120
        },
        {
          sheetid: 202,
          side: "away",
          pt: 2,
          playerno: 11,
          infraction: "Slashing",
          quarter: 2,
          time: 305
        },
        {
          sheetid: 203,
          side: "home",
          pt: 3,
          playerno: 5,
          infraction: "Tripping",
          quarter: 2,
          time: 450
        }
    ];
    for (const stat of penalties) {
        await addPenalty(stat);
    }
}

async function dbinsert_IndividualScore(){
    const individualScores: IndividualScore[] = [
        {
          sheetid: 101,
          side: "home",
          playerno: 7,
          player: "John Doe",
          goals: 3,
          attempts: 5,
          fails: 2
        },
        {
          sheetid: 101,
          side: "home",
          playerno: 12,
          player: "Alex Smith",
          goals: 1,
          attempts: 4,
          fails: 3
        },
        {
          sheetid: 101,
          side: "away",
          playerno: 9,
          player: "Ryan Lee",
          goals: 2,
          attempts: 3,
          fails: 1
        }
    ];
    for (const stat of individualScores) {
        await addIndividualScore(stat);
    }
}

async function dbinsert_gamestat(){
    const gameStats: GameStat[] = [
        {
        sheetid: 101,
        side: "home",
        quarter: 1,
        ground: 2,
        shots: 6,
        clearpass: 3,
        clearfail: 1,
        extrascore: 1,
        extrafail: 0,
        faceoffwin: 2,
        faceoffloss: 1
        },
        {
        sheetid: 101,
        side: "away",
        quarter: 1,
        ground: 1,
        shots: 4,
        clearpass: 2,
        clearfail: 2,
        extrascore: 0,
        extrafail: 1,
        faceoffwin: 1,
        faceoffloss: 3
        },
        {
        sheetid: 102,
        side: "home",
        quarter: 2,
        ground: 5,
        shots: 7,
        clearpass: 5,
        clearfail: 0,
        extrascore: 2,
        extrafail: 0,
        faceoffwin: 4,
        faceoffloss: 1
        }
    ];
    for (const stat of gameStats) {
        await addGameStat(stat);
    }
}