import sql from "$lib/database/postgres.server";
import type { Team } from "$lib/database/Team";
import type { Player } from "$lib/database/Team";
import { auburnLacrosseRoster, uahLacrosseRoster } from "./teamData";

export async function getTeams(): Promise<Team[]> {
  const players = await sql<Team[]>`
      SELECT * FROM teams
    `;

  return players;
}

export async function getPlayers(): Promise<Player[]> {
  const players = await sql<Player[]>`
      SELECT * FROM players
    `;

  return players;
}

export async function getTeam(id: string): Promise<Team> {
  const players = await sql<Team[]>`
      SELECT * FROM teams WHERE team_id = ${id}
    `;

  return players[0];
}

export async function getPlayer(id: string): Promise<Player> {
  const players = await sql<Player[]>`
      SELECT * FROM players WHERE name = ${id}
    `;

  return players[0];
}

export async function getPlayerByName(name: string): Promise<Player> {
  const players = await sql<Player[]>`
      SELECT * FROM players WHERE player_name = ${name}
    `;

  return players[0];
}

export async function getPlayersByTeam(team_id: string): Promise<Player[]> {
  const players = await sql<Player[]>`
      SELECT * FROM players WHERE team_id = ${team_id}
    `;

  return players;
}

export async function addTeam(team: Team) {
  //console.log(team);
  console.log(team);
  const result = await sql`
    INSERT INTO teams (TEAM_NAME, TEAM_ID, HOMETOWN, STATE, COACH) VALUES 
    (${team.team_name}, ${team.team_id}, ${team.hometown}, ${team.state}, ${team.coach})
    RETURNING *;
  `;

  return result;

}

// Same as addTeam for now
export async function updateTeam(team: Team) {
  console.log(team);
  const result = await sql`
    UPDATE teams 
    SET 
      TEAM_NAME = ${team.team_name}, 
      HOMETOWN = ${team.hometown}, 
      STATE = ${team.state}, 
      COACH = ${team.coach}
    WHERE TEAM_ID = ${team.team_id}
    RETURNING *;
  `;

  return result;
}

export async function addPlayer(players: Player) {
  let team_id = players.team_id;
  let team_name = players.team_name;
  let name = players.player_name;
  let number = players.player_number;
  let position = players.position;
  let player_class = players.player_class;
  let hometown = players.hometown;
  let state = players.state;
  let height_feet = players.height_feet || 0;
  let height_inches = players.height_inches || 0;
  let weight = players.weight || 0;
  let quarter = players.quarter;
  let shots = players.shots;
  let goals = players.goals;
  let miss = players.miss;
  let ground = players.ground;
  const result = await sql`
    INSERT INTO players (PLAYER_NAME, PLAYER_NUMBER, TEAM_ID, TEAM_NAME, POSITION, PLAYER_CLASS, HOMETOWN, STATE, HEIGHT_FEET, HEIGHT_INCHES, WEIGHT, QUARTERS, ATTEMPTED_SHOTS, GOALS, FAILED_SHOTS, GROUND_BALLS) VALUES (${name}, ${number}, ${team_id}, ${team_name}, ${position},${player_class}, ${hometown}, ${state}, ${height_feet}, ${height_inches}, ${weight}, ${quarter}, ${shots}, ${goals}, ${miss}, ${ground}) RETURNING *
  `;

  return result;
}

export async function updatePlayer(player: Player) {
  console.log(player);
  const result = await sql`
    UPDATE players
    SET 
      PLAYER_NAME = ${player.player_name},
      PLAYER_NUMBER = ${player.player_number},
      TEAM_ID = ${player.team_id},
      TEAM_NAME = ${player.team_name},
      POSITION = ${player.position},
      PLAYER_CLASS = ${player.player_class},
      HOMETOWN = ${player.hometown},
      STATE = ${player.state},
      HEIGHT_FEET = ${player.height_feet || 0},
      HEIGHT_INCHES = ${player.height_inches || 0},
      WEIGHT = ${player.weight || 0}
    WHERE PLAYER_NAME = ${player.player_name} 
    RETURNING *;
  `;

  return result;
}

export async function deleteTeam(teamId: string) {
  const result = await sql`
      DELETE FROM teams WHERE TEAM_ID = ${teamId}
    `;

  return result;
}

export async function deletePlayer(name: string) {
  const result = await sql`
      DELETE FROM players WHERE PLAYER_NAME = ${name}
    `;

  return result;
}

export async function dbTeamsReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'teams';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  const res = await sql`CREATE TABLE teams(
            TEAM_NAME varchar(100),
            TEAM_ID varchar(100),
            HOMETOWN varchar(100),
            STATE varchar(100),
            COACH varchar(100),
            Primary key (TEAM_ID));`;

  addTeam({
    team_id: "uah-mlax-001",
    team_name: "UAH Men's Lacrosse",
    hometown: "Huntsville",
    state: "AL",
    coach: "Mark Frey",
  });

  addTeam({
    team_id: "auburn-mlax-001",
    team_name: "Auburn University Men's Lacrosse",
    hometown: "Auburn",
    state: "AL",
    coach: "JJ Arminio",
  });

  return res;
}

export async function dbPlayersReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'players';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  const res = await sql`CREATE TABLE players (
            PLAYER_NAME varchar(100),
            PLAYER_NUMBER INT NOT NULL,
            TEAM_ID varchar(100),
            TEAM_NAME varchar(100),
            POSITION varchar(100),
            PLAYER_CLASS varchar(100),
            HOMETOWN varchar(100),
            STATE varchar(100),
            HEIGHT_FEET INT,
            HEIGHT_INCHES INT,
            WEIGHT INT,
            QUARTERS INT,
            ATTEMPTED_SHOTS INT,
            GOALS INT,
            FAILED_SHOTS INT,
            GROUND_BALLS INT,
            primary key(PLAYER_NAME, PLAYER_NUMBER),
            foreign key(TEAM_ID) references teams(TEAM_ID) ON DELETE CASCADE);`;

  for(const player of auburnLacrosseRoster) {
    addPlayer(player);
  }

  for(const player of uahLacrosseRoster) {
    addPlayer(player);
  }

  return res;
}
