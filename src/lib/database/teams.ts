import sql from '$lib/database/postgres';
// import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'
import type { Team } from '$lib/database/Team';
import type { Player } from '$lib/database/Team';

export async function getTeams(): Promise<Team[]> {
  const players = await sql<Team[]>`
      SELECT * FROM teams
    `

  return players
}

export async function getPlayers(): Promise<Player[]> {
  const players = await sql<Player[]>`
      SELECT * FROM players
    `

  return players
}

export async function getTeam(name: string): Promise<Team> {
  const players = await sql<Team[]>`
      SELECT * FROM teams WHERE name = ${name}
    `

  return players[0]
}

export async function getPlayer(name: string): Promise<Player> {
  const players = await sql<Player[]>`
      SELECT * FROM players WHERE name = ${name}
    `

  return players[0]
}

export async function addTeam(teams: Team) {
  let name = teams.name;
  let id = teams.id;
  const result = await sql`
    INSERT INTO teams (name) (id) VALUES (${name}) (${id}) RETURNING *
  `

  return result
}

export async function addPlayer(players: Player) {
  let team = players.team;
  let name = players.name;
  let number = players.number;
  let position = players.position;
  let quarter = players.quarter;
  let shots = players.shots;
  let goals = players.goals;
  let miss = players.miss;
  let ground = players.ground;
  const result = await sql`
    INSERT INTO teams (team, name, number, position, quarter, shots, goals, miss, ground) VALUES (${team}, ${name}, ${number}, ${position}, ${quarter}, ${shots}, ${goals}, ${miss}, ${ground}) RETURNING *
  `

  return result
}

export async function deleteTeam(name: string) {
  const result = await sql`
      DELETE FROM teams WHERE name = ${name}
    `

  return result
}

export async function deletePlayer(name: string) {
  const result = await sql`
      DELETE FROM players WHERE name = ${name}
    `

  return result
}

export async function dbTeamsReset() {
  await sql`DO $$ 
            DECLARE
              table_name text := 'teams';
            BEGIN
              EXECUTE 'DROP TABLE IF EXISTS public.' || table_name || ' CASCADE';
            END $$;
    `;

  await sql`CREATE TABLE teams(
            TEAM_NAME varchar(25),
            TEAM_ID varchar(25),
            Primary key (TEAM_NAME));`

  const res = await sql`INSERT INTO teams (TEAM_NAME)
    VALUES ('UAH');`

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

  await sql`CREATE TABLE players (
            PLAYER_NAME varchar(25),
            PLAYER_NUMBER INT NOT NULL,
            TEAM_NAME varchar(25),
            POSITION varchar(25),
            QUARTERS INT,
            ATTEMPTED_SHOTS INT,
            GOALS INT,
            FAILED_SHOTS INT,
            GROUND_BALLS INT,
            primary key(PLAYER_NAME, PLAYER_NUMBER),
            foreign key(TEAM_NAME) references Team_Name ON DELETE CASCADE ON UPDATE CASCADE);`

  const res = await sql`INSERT INTO players (PLAYER_NAME, PLAYER_NUMBER, TEAM_NAME, POSITION, QUARTERS, ATTEMPTED_SHOTS, GOALS, FAILED_SHOTS, GROUND_BALLS)
    VALUES ('Dudebro', '0', 'UAH', 'GOALIE', '0', '0', '0', '0', '0', '0');`

  return res;
}