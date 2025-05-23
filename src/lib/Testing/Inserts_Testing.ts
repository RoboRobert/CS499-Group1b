// Purpose: To test the database inserts for the project.
import type {Game} from '../database/Sheet';
import { addGame } from '../database/sheets';
import type { SheetInfo } from '../database/SheetInfo';
import { addSheet } from '../database/sheets';
import type { Sheet } from '../database/Sheet';
import { addSheetInfo } from '../database/sheetinfos';
import type { GameStat } from '$lib/database/GameStats';
import { addGameStat } from '$lib/database/gamestat';
import type { IndividualScore } from '$lib/database/IndividualScores';
import { addIndividualScore } from '../database/individualscore';
import type { Penalty } from '../database/Penalty';
import { addPenalty } from '../database/penalties';
import type { Team } from '../database/Team';
import { addTeam } from '../database/teams';
import type { Timeout } from '../database/Timeout';
import { addTimeout } from '../database/timeouts';
import type { Save } from '../database/Save';
import { addSave } from '../database/saves';
import type { Player } from '../database/Team';
import { addPlayer } from '../database/teams';


export async function Complete_Insert_test(){
  dbinsert_Game();
  dbinsert_Sheet();
  dbinsert_Teams();
  dbinsert_Players();
  dbinsert_SheetInfo();
  dbinsert_Timeouts();
  dbinsert_Saves();
  dbinsert_Penalties();
  dbinsert_IndividualScore();
  dbinsert_GameStat();
  
}

async function dbinsert_Players() {
  const players: Player[] = [
    
    {
      team_name: "Maple Hawks",
      player_name: "Terry Davis",
      player_number: 1,
      position: "Goalie",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Jarod Wong",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Tom Perry",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Charles Roy",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Donald Right",
      player_number: 40,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Jackson Kaleb",
      player_number: 36,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Terry Cones",
      player_number: 18,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Bob Sunny",
      player_number: 33,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "Jerry Davidson",
      player_number: 12,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Maple Hawks",
      player_name: "William Elder",
      player_number: 23,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },

    {
      team_name: "River Raptors",
      player_name: "Leon Mack",
      player_number: 12,
      position: "Goalie",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Oscar Flin",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Sam Nickson",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Henry Schalds",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Cameron Mercer",
      player_number: 11,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Rudy Mahoney",
      player_number: 5,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Brett Malone",
      player_number: 13,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Jared Mcclure",
      player_number: 23,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Noel Wagner",
      player_number: 9,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "River Raptors",
      player_name: "Emmanuel Hoffman",
      player_number: 62,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },

    {
      team_name: "Sunset Stallions",
      player_name: "Walter Hoffman",
      player_number: 1,
      position: "Goalie",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Mitchel Estrade",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Rex Walls",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Nick Reed",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Len Whitney",
      player_number: 67,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Amos Noble",
      player_number: 17,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Alex Gillespire",
      player_number: 12,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Ernestro Ritter",
      player_number: 32,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Jerry Middleton",
      player_number: 1,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Sunset Stallions",
      player_name: "Emmitt Coleman",
      player_number: 1,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },

    {
      team_name: "Oceanview Orcas",
      player_name: "Roland Tapia",
      player_number: 1,
      position: "Goalie",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Wilfred Blackburn",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Andreas Rogers",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Rubin Leblanc",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Galen Rosales",
      player_number: 45,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Felton Poole",
      player_number: 19,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Herschel Warner",
      player_number: 1,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "John David",
      player_number: 8,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Nestor Dominguez",
      player_number: 26,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Oceanview Orcas",
      player_name: "Giovanni Frank",
      player_number: 6,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },

    {
      team_name: "Highland Wolves",
      player_name: "Luis Lambert",
      player_number: 1,
      position: "Goalie",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Eugenio Howard",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Booker Harvey",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Mario Hendrix",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Jonas Dyer",
      player_number: 1,
      position: "Midfielder",
      num_games: 10,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Richie Macdonald",
      player_number: 2,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Cletus Berger",
      player_number: 13,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Dalton Reynolds",
      player_number: 50,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Elroy Morrow",
      player_number: 16,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Highland Wolves",
      player_name: "Adan Luna",
      player_number: 9,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },

    {
      team_name: "Forest Falcons",
      player_name: "Cornell Arnold",
      player_number: 1,
      position: "Goalie",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Lonny Wyatt",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Earl Schaefer",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Robby Rollins",
      player_number: 1,
      position: "Defender",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Lawrence Boyer",
      player_number: 1,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Elvin Harmon",
      player_number: 21,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Sandy Edwards",
      player_number: 1,
      position: "Midfielder",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Ramon Conway",
      player_number: 14,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Brent Cannon",
      player_number: 62,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
    },
    {
      team_name: "Forest Falcons",
      player_name: "Gordon Blackburn",
      player_number: 3,
      position: "Attacker",
      num_games: 1,
      attempted_shots: 0,
      goals: 0,
      failed_shots: 0,
      ground_balls: 0,
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
            game_id: "Maple Hawks vs River Raptors",
        },
        {
            game_id: "Sunset Stallions vs Oceanview Orcas",
        },
        {
            game_id: "Highland Wolves vs Forest Falcons",

        },
        {
            game_id: "Maple Hawks vs Sunset Stallions",
        },
        {
            game_id: "River Raptors vs Oceanview Orcas",
        },
        {
            game_id: "Highland Wolves vs Maple Hawks",
        },
    ]
    for (const game of games) {
        await addGame(game);
    }
}

async function dbinsert_Sheet() {
    const sheets: Sheet[] = [
      { game_id: "Maple Hawks vs River Raptors", 
        sheet_id: "101" 
      },
      { game_id: "Sunset Stallions vs Oceanview Orcas",
        sheet_id: "102"
      },
      { game_id: "Highland Wolves vs Forest Falcons",
        sheet_id: "103"
      },
      { game_id: "Maple Hawks vs Sunset Stallions",
        sheet_id: "104"
      },
      { game_id: "River Raptors vs Oceanview Orcas",
        sheet_id: "105"
      },
      { game_id: "Highland Wolves vs Maple Hawks",
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
    { sheetid: 101, side: "home", pt: 1, playerno: 23, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 101, side: "home", pt: 2, playerno: 33, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 101, side: "away", pt: 3, playerno: 62, infraction: "Tripping", quarter: 2, time: 450 },
    { sheetid: 101, side: "away", pt: 1, playerno: 9, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 102, side: "home", pt: 2, playerno: 1, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 102, side: "home", pt: 3, playerno: 27, infraction: "Tripping", quarter: 2, time: 450 },
    { sheetid: 102, side: "away", pt: 1, playerno: 6, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 102, side: "away", pt: 2, playerno: 26, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 103, side: "home", pt: 3, playerno: 9, infraction: "Tripping", quarter: 2, time: 450 },
    { sheetid: 103, side: "home", pt: 1, playerno: 16, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 103, side: "away", pt: 2, playerno: 3, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 103, side: "away", pt: 3, playerno: 62, infraction: "Tripping", quarter: 2, time: 450 },
    { sheetid: 104, side: "home", pt: 1, playerno: 23, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 104, side: "home", pt: 2, playerno: 12, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 104, side: "away", pt: 3, playerno: 1, infraction: "Tripping", quarter: 2, time: 450 },
    { sheetid: 104, side: "away", pt: 1, playerno: 27, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 105, side: "home", pt: 2, playerno: 62, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 105, side: "home", pt: 3, playerno: 9, infraction: "Tripping", quarter: 2, time: 450 },
    { sheetid: 105, side: "away", pt: 1, playerno: 6, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 105, side: "away", pt: 2, playerno: 26, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 106, side: "home", pt: 3, playerno: 9, infraction: "Tripping", quarter: 2, time: 450 },
    { sheetid: 106, side: "home", pt: 1, playerno: 16, infraction: "Holding", quarter: 1, time: 120 },
    { sheetid: 106, side: "away", pt: 2, playerno: 23, infraction: "Slashing", quarter: 2, time: 305 },
    { sheetid: 106, side: "away", pt: 3, playerno: 12, infraction: "Tripping", quarter: 2, time: 450 }
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
    { sheetid: 101, side: "away", playerno: 23, player: "Jared Mcclure", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 101, side: "away", playerno: 13, player: "Brett Malone", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 101, side: "away", playerno: 5, player: "Rudy Mahoney", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 101, side: "away", playerno: 11, player: "Cameron Mercer", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "home", playerno: 1, player: "Emmitt Coleman", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 102, side: "home", playerno: 27, player: "Jerry Middleton", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 102, side: "home", playerno: 32, player: "Ernestro Ritter", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 102, side: "home", playerno: 12, player: "Alex Gillespire", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 102, side: "home", playerno: 17, player: "Amos Noble", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 102, side: "home", playerno: 67, player: "Len Whitney", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 102, side: "away", playerno: 6, player: "Giovanni Frank", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 26, player: "Nestor Dominguez", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 8, player: "John David", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 67, player: "Herschel Warner", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 19, player: "Felton Poole", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 102, side: "away", playerno: 45, player: "Galen Rosales", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "home", playerno: 9, player: "Adan Luna", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 103, side: "home", playerno: 16, player: "Elroy Morrow", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 103, side: "home", playerno: 50, player: "Dalton Reynolds", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 103, side: "home", playerno: 13, player: "Cletus Berger", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 103, side: "home", playerno: 2, player: "Richie Macdonald", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 103, side: "home", playerno: 10, player: "Jonas Dyerh", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 103, side: "away", playerno: 3, player: "Gordon Blackburn", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 62, player: "Brent Cannon", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 14, player: "Ramon Conway", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 70, player: "Sandy Edwards", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 21, player: "Elvin Harmon", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 103, side: "away", playerno: 31, player: "Lawrence Boyer", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 104, side: "home", playerno: 23, player: "William Elder", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "home", playerno: 12, player: "Jerry Davidson", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 104, side: "home", playerno: 33, player: "Bob Sunny", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "home", playerno: 18, player: "Terry Cones", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 104, side: "home", playerno: 36, player: "Jackson Kaleb", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "home", playerno: 40, player: "Donald Right", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 104, side: "away", playerno: 1, player: "Emmitt Coleman", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "away", playerno: 27, player: "Jerry Middleton", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 104, side: "away", playerno: 32, player: "Ernestro Ritter", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "away", playerno: 12, player: "Alex Gillespire", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 104, side: "away", playerno: 17, player: "Amos Noble", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 104, side: "away", playerno: 67, player: "Len Whitney", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 105, side: "home", playerno: 62, player: "Emmanuel Hoffman", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "home", playerno: 9, player: "Noel Wagner", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "home", playerno: 23, player: "Jared Mcclure", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "home", playerno: 13, player: "Brett Malone", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "home", playerno: 5, player: "Rudy Mahoney", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "home", playerno: 11, player: "Cameron Mercer", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 6, player: "Giovanni Frank", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 26, player: "Nestor Dominguez", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 8, player: "John David", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 67, player: "Herschel Warner", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 19, player: "Felton Poole", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 105, side: "away", playerno: 45, player: "Galen Rosales", goals: 2, attempts: 3, fails: 1 },
    { sheetid: 106, side: "home", playerno: 9, player: "Adan Luna", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "home", playerno: 16, player: "Elroy Morrow", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 106, side: "home", playerno: 50, player: "Dalton Reynolds", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "home", playerno: 13, player: "Cletus Berger", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 106, side: "home", playerno: 2, player: "Richie Macdonald", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "home", playerno: 10, player: "Jonas Dyerh", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 106, side: "away", playerno: 23, player: "William Elder", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "away", playerno: 12, player: "Jerry Davidson", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 106, side: "away", playerno: 33, player: "Bob Sunny", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "away", playerno: 18, player: "Terry Cones", goals: 1, attempts: 4, fails: 3 },
    { sheetid: 106, side: "away", playerno: 36, player: "Jackson Kaleb", goals: 3, attempts: 5, fails: 2 },
    { sheetid: 106, side: "away", playerno: 40, player: "Donald Right", goals: 1, attempts: 4, fails: 3 },
    
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

