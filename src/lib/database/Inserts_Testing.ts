// Purpose: To test the database inserts for the project.
import type {Game} from './Sheet';
import { addGame } from './sheets';
import type { SheetInfo } from './SheetInfo';
import { addSheet } from './sheets';
import type { Sheet } from './Sheet';
import { addSheetInfo } from './sheetinfos';
import type { GameStat } from '$lib/database/GameStats';
import { addGameStat } from '$lib/database/gamestat';
import type { IndividualScore } from '$lib/database/IndividualScores';
import { addIndividualScore } from './individualscore';
import type { Penalty } from './Penalty';
import { addPenalty } from './penalties';
import type { Team } from './Team';
import { addTeam } from './teams';
import type { Timeout } from './Timeout';
import { addTimeout } from './timeouts';
import type { Save } from './Save';
import { addSave } from './saves';
import type { Player } from './Team';
import { addPlayer } from './teams';

async function dbinsert_Players() {
  const players: Player[] = [
    
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Maple Hawks",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "River Raptors",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Sunset Stallions",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Oceanview Orcas",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Highland Wolves",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team: "Forest Falcons",
      name: "Terry Davis",
      number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
  ]
}

async function dbinsert_Teams() {
  const teams: Team[] = [
    {  name: "Maple Hawks" },
    {  name: "River Raptors" },
    {  name: "Sunset Stallions" },
    {  name: "Oceanview Orcas" },
    {  name: "Highland Wolves" },
    {  name: "Forest Falcons" }
  ];
  for (const team of teams) {
    await addTeam(team);
  }
}

async function dbinsert_Game() {
    const games : Game[] = [
        {
            gameid: "Maple Hawks vs River Raptors",
        },
        {
            gameid: "Sunset Stallions vs Oceanview Orcas",
        },
        {
            gameid: "Highland Wolves vs Forest Falcons",

        },
        {
            gameid: "Maple Hawks vs Sunset Stallions",
        },
        {
            gameid: "River Raptors vs Oceanview Orcas",
        },
        {
            gameid: "Highland Wolves vs Maple Hawks",
        },
    ]
    for (const game of games) {
        await addGame(game);
    }
}

async function dbinsert_Sheet() {
    const sheets: Sheet[] = [
      { gameid: "Maple Hawks vs River Raptors", 
        sheetid: "101" 
      },
      { gameid: "Sunset Stallions vs Oceanview Orcas",
        sheetid: "102"
      },
      { gameid: "Highland Wolves vs Forest Falcons",
        sheetid: "103"
      },
      { gameid: "Maple Hawks vs Sunset Stallions",
        sheetid: "104"
      },
      { gameid: "River Raptors vs Oceanview Orcas",
        sheetid: "105"
      },
      { gameid: "Highland Wolves vs Maple Hawks",
        sheetid: "106"
      }
    ];
    for (const sheet of sheets) {
      await addSheet(sheet);
    }
}



async function dbinsert_SheetInfo() {
    const sheetinfos: SheetInfo[] = [
      {
        sheetid: 101,
        date: "2022-01-01",
        site: "Maple College",
        start: 1200,
        scorekeeper: "John Doe",
        oppscorekeeper: "Jane Doe",
        timekeeper: "Alex Smith",
        headofficial: "Chris Nguyen",
        umpire: "Jake Lee",
        fieldjudge: "Ryan Lee"
      },
      {
        sheetid: 102,
        date: "2022-01-02",
        site: "Ocean College",
        start: 1200,
        scorekeeper: "John Doe",
        oppscorekeeper: "Jane Doe",
        timekeeper: "Alex Smith",
        headofficial: "Chris Nguyen",
        umpire: "Jake Lee",
        fieldjudge: "Ryan Lee"
      },
      {
        sheetid: 103,
        date: "2022-01-03",
        site: "Forest College",
        start: 1200,
        scorekeeper: "John Doe",
        oppscorekeeper: "Jane Doe",
        timekeeper: "Alex Smith",
        headofficial: "Chris Nguyen",
        umpire: "Jake Lee",
        fieldjudge: "Ryan Lee"
      },

      {
        sheetid: 104,
        date: "2022-01-04",
        site: "Sunset College",
        start: 1200,
        scorekeeper: "John Doe",
        oppscorekeeper: "Jane Doe",
        timekeeper: "Alex Smith",
        headofficial: "Chris Nguyen",
        umpire: "Jake Lee",
        fieldjudge: "Ryan Lee"
      },
      {
        sheetid: 105,
        date: "2022-01-05",
        site: "River College",
        start: 1200,
        scorekeeper: "John Doe",
        oppscorekeeper: "Jane Doe",
        timekeeper: "Alex Smith",
        headofficial: "Chris Nguyen",
        umpire: "Jake Lee",
        fieldjudge: "Ryan Lee"

      },
      {
          sheetid: 106,
          date: "2022-01-06",
          site: "Highland College",
          start: 1200,
          scorekeeper: "John Doe",
          oppscorekeeper: "Jane Doe",
          timekeeper: "Alex Smith",
          headofficial: "Chris Nguyen",
          umpire: "Jake Lee",
          fieldjudge: "Ryan Lee"
      },

    ];
    for (const stat of sheetinfos) {
      await addSheetInfo(stat);
    }
  }




async function dbinsert_Timeouts() {
  const timeouts: Timeout[] = [
    { sheetid: 101, side: "home", halfone: 1, halftwo: 1, otone: 0, ottwo: 0 },
    { sheetid: 101, side: "away", halfone: 1, halftwo: 0, otone: 1, ottwo: 0 },
    { sheetid: 102, side: "home", halfone: 1, halftwo: 0, otone: 0, ottwo: 0 }
  ];
  for (const stat of timeouts) {
    await addTimeout(stat);
  }
}

async function dbinsert_Saves() {
  const saves: Save[] = [
    {
      sheetid: 101,
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
      sheetid: 101,
      side: "away",
      player: "Jake Lee",
      playerno: 12,
      quarterone: 2,
      quartertwo: 3,
      quarterthree: 4,
      quarterfour: 3,
      ot: 0,
      total: 12
    }
  ];
  for (const stat of saves) {
    await addSave(stat);
  }
}

async function dbinsert_Penalties() {
  const penalties: Penalty[] = [
    { sheetid: 101, side: "home", pt: 1, playerno: 7, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 101, side: "away", pt: 2, playerno: 11, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 102, side: "home", pt: 3, playerno: 5, infraction: "Tripping", quarter: 2, time: 450 }
  ];
  for (const stat of penalties) {
    await addPenalty(stat);
  }
}

async function dbinsert_IndividualScore() {
  const individualScores: IndividualScore[] = [
    { sheetid: 101, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 101, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 101, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 }
  ];
  for (const stat of individualScores) {
    await addIndividualScore(stat);
  }
}

async function dbinsert_GameStat() {
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

