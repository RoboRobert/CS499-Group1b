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
      team_name: "Maple Hawks",
      player_name: "Terry Davis",
      player_number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Jarod Wong",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Tom Perry",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Charles Roy",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Donald Right",
      player_number: 40,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Jackson Kaleb",
      player_number: 36,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Terry Cones",
      player_number: 18,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Bob Sunny",
      player_number: 33,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Jerry Davidson",
      player_number: 12,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "William Elder",
      player_number: 23,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team_name: "River Raptors",
      player_name: "Leon Mack",
      player_number: 12,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Oscar Flin",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Sam Nickson",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Henry Schalds",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Cameron Mercer",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Rudy Mahoney",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Brett Malone",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Jared Mcclure",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Noel Wagner",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Emmanuel Hoffman",
      player_number: 62,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team_name: "Sunset Stallions",
      player_name: "Walter Hoffman",
      player_number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Mitchel Estrade",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Rex Walls",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Nick Reed",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Len Whitney",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Amos Noble",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "ALex Gillespire",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Ernestro Ritter",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Jerry Middleton",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Emmitt Coleman",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team_name: "Oceanview Orcas",
      player_name: "Roland Tapia",
      player_number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Wilfred Blackburn",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Andreas Rogers",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Rubin Leblanc",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Galen Rosales",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Felton Poole",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Herschel Warner",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "John David",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Nestor Dominguez",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Giovanni Frank",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team_name: "Highland Wolves",
      player_name: "Luis Lambert",
      player_number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Eugenio Howard",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Booker Harvey",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Mario Hendrix",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Jonas Dyer",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Richie Macdonald",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Cletus Berger",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Dalton Reynolds",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Elroy Morrow",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Adan Luna",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },

    {
      team_name: "Forest Falcons",
      player_name: "Cornell Arnold",
      player_number: 1,
      position: "Goalie",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Lonny Wyatt",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Earl Schaefer",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Robby Rollins",
      player_number: 1,
      position: "Defender",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Lawrence Boyer",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Elvin Harmon",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Sandy Edwards",
      player_number: 1,
      position: "Midfielder",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Ramon Conway",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Brent Cannon",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Gordon Blackburn",
      player_number: 1,
      position: "Attacker",
      quarter: 1,
      shots: 0,
      goals: 0,
      miss: 0,
      ground: 0,
    },
  ]
for (const player of players) {
    await addPlayer(player);
  }
}

async function dbinsert_Teams() {
  const teams: Team[] = [
    {  
      team_id: "3",
	    team_name: "Maple Hawks",
	    hometown: "Maple City",
	    state: "Arkansas",
	    coach: "John Rutherford",
    },
    { 
      team_id: "4",
	    team_name: "River Raptors",
	    hometown: "River City",
	    state: "Arizona",
	    coach: "John Rutherford",

     },
    {  
      team_id: "5",
	    team_name: "Sunset Stallions",
	    hometown: "Sunset City",
	    state: "California",
	    coach: "Ron Cassey",
    },
    {
      team_id: "5",
	    team_name: "Oceanview Orcas",
	    hometown: "Oceanview City",
	    state: "Florida",
	    coach: "Derek Smith",
     },
    {  
      team_id: "6",
	    team_name: "Highland Wolves",
	    hometown: "Highland City",
	    state: "Georgia",
	    coach: "Paul Jackson",
     },
    { 
      team_id: "7",
	    team_name: "Forest Falcons",
	    hometown: "Forest City",
	    state: "Illinois",
	    coach: "River Ross",

     }
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
        sheet_id: "101" 
      },
      { gameid: "Sunset Stallions vs Oceanview Orcas",
        sheet_id: "102"
      },
      { gameid: "Highland Wolves vs Forest Falcons",
        sheet_id: "103"
      },
      { gameid: "Maple Hawks vs Sunset Stallions",
        sheet_id: "104"
      },
      { gameid: "River Raptors vs Oceanview Orcas",
        sheet_id: "105"
      },
      { gameid: "Highland Wolves vs Maple Hawks",
        sheet_id: "106"
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
        scorekeeper: "Zachery Bowen",
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
        scorekeeper: "Ernie Mayer",
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
        scorekeeper: "Johnnie Knapp",
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
        scorekeeper: "Sherman Alexander",
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
        scorekeeper: "Darrick Macdonald",
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
          scorekeeper: "Jonas Bryant",
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
    { sheetid: 102, side: "home", halfone: 1, halftwo: 0, otone: 0, ottwo: 0 },
    { sheetid: 102, side: "home", halfone: 1, halftwo: 1, otone: 0, ottwo: 0 },
    { sheetid: 103, side: "away", halfone: 1, halftwo: 0, otone: 1, ottwo: 0 },
    { sheetid: 103, side: "home", halfone: 1, halftwo: 0, otone: 0, ottwo: 0 },
    { sheetid: 104, side: "home", halfone: 1, halftwo: 1, otone: 0, ottwo: 0 },
    { sheetid: 104, side: "away", halfone: 1, halftwo: 0, otone: 1, ottwo: 0 },
    { sheetid: 105, side: "home", halfone: 1, halftwo: 0, otone: 0, ottwo: 0 },
    { sheetid: 105, side: "home", halfone: 1, halftwo: 1, otone: 0, ottwo: 0 },
    { sheetid: 106, side: "away", halfone: 1, halftwo: 0, otone: 1, ottwo: 0 },
    { sheetid: 106, side: "home", halfone: 1, halftwo: 0, otone: 0, ottwo: 0 }
    
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
      player: "Terry Davis",
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
      player: "Leon Mack",
      playerno: 12,
      quarterone: 2,
      quartertwo: 3,
      quarterthree: 4,
      quarterfour: 3,
      ot: 0,
      total: 12
    },
    {
      sheetid: 102,
      side: "home",
      player: "Walter Hoffman",
      playerno: 1,
      quarterone: 3,
      quartertwo: 4,
      quarterthree: 5,
      quarterfour: 2,
      ot: 1,
      total: 15
    },
    {
      sheetid: 102,
      side: "away",
      player: "Roland Tapia",
      playerno: 12,
      quarterone: 2,
      quartertwo: 3,
      quarterthree: 4,
      quarterfour: 3,
      ot: 0,
      total: 12
    },
    {
      sheetid: 103,
      side: "home",
      player: "Luis Lambert",
      playerno: 1,
      quarterone: 3,
      quartertwo: 4,
      quarterthree: 5,
      quarterfour: 2,
      ot: 1,
      total: 15
    },
    {
      sheetid: 103,
      side: "away",
      player: "Cornell Arnold",
      playerno: 12,
      quarterone: 2,
      quartertwo: 3,
      quarterthree: 4,
      quarterfour: 3,
      ot: 0,
      total: 12
    },
    {
      sheetid: 104,
      side: "home",
      player: "Terry Davis",
      playerno: 1,
      quarterone: 3,
      quartertwo: 4,
      quarterthree: 5,
      quarterfour: 2,
      ot: 1,
      total: 15
    },
    {
      sheetid: 104,
      side: "away",
      player: "Walter Hoffman",
      playerno: 12,
      quarterone: 2,
      quartertwo: 3,
      quarterthree: 4,
      quarterfour: 3,
      ot: 0,
      total: 12
    },
    {
      sheetid: 105,
      side: "home",
      player: "Leon Mack",
      playerno: 1,
      quarterone: 3,
      quartertwo: 4,
      quarterthree: 5,
      quarterfour: 2,
      ot: 1,
      total: 15
    },
    {
      sheetid: 105,
      side: "away",
      player: "Roland Tapia",
      playerno: 12,
      quarterone: 2,
      quartertwo: 3,
      quarterthree: 4,
      quarterfour: 3,
      ot: 0,
      total: 12
    },
    {
      sheetid: 106,
      side: "home",
      player: "Luis Lambert",
      playerno: 1,
      quarterone: 3,
      quartertwo: 4,
      quarterthree: 5,
      quarterfour: 2,
      ot: 1,
      total: 15
    },
    {
      sheetid: 106,
      side: "away",
      player: "Terry Davis",
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
    { sheetid: 101, side: "home", playerno: 23, player: "William Elder", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 101, side: "home", playerno: 12, player: "Jerry Davidson", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 101, side: "home", playerno: 33, player: "Bob Sunny", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 101, side: "home", playerno: 18, player: "Terry Cones", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 101, side: "home", playerno: 36, player: "Jackson Kaleb", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 101, side: "home", playerno: 40, player: "Donald Right", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 101, side: "away", playerno: 62, player: "Emmanuel Hoffman", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 101, side: "away", playerno: 9, player: "Noel Wagner", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 101, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 101, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 101, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 101, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 102, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 102, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 102, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 102, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 102, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 102, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: , player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 103, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 103, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 103, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 103, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 103, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 103, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 104, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 104, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 104, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 104, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 104, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 104, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 104, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 104, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 104, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 105, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 105, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 105, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 105, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 105, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 105, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 106, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 106, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 106, side: "home", playerno: 7, player: "John Doe", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "home", playerno: 12, player: "Alex Smith", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 106, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 106, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 106, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 106, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 106, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 106, side: "away", playerno: 9, player: "Ryan Lee", goals: 2, attempts: 3, fails: 1 },
    
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
    },
    {
      sheetid: 102,
      side: "away",
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
      sheetid: 103,
      side: "home",
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
      sheetid: 103,
      side: "away",
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
      sheetid: 104,
      side: "home",
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
      sheetid: 104,
      side: "away",
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
      sheetid: 105,
      side: "home",
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
      sheetid: 105,
      side: "away",
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
      sheetid: 106,
      side: "home",
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
      sheetid: 106,
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
  ];
  for (const stat of gameStats) {
    await addGameStat(stat);
  }
}

