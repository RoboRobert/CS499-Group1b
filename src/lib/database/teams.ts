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
    INSERT INTO teams (id, name) VALUES
    ('T001', 'Maple Hawks'),
    ('T002', 'River Raptors'),
    ('T003', 'Sunset Stallions'),
    ('T004', 'Oceanview Orcas'),
    ('T005', 'Highland Wolves'),
    ('T006', 'Forest Falcons');
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
  INSERT INTO players (team, name, number, position, quarter, shots, goals, miss, ground) VALUES
  ('T001', 'Alex Carter', 7, 'Attack', 1, 5, 3, 2, 4),
  ('T001', 'Sam Jordan', 9, 'Midfield', 1, 3, 1, 2, 5),
  ('T002', 'Jake Lee', 11, 'Defense', 2, 2, 0, 2, 6),
  ('T002', 'Liam Davis', 14, 'Attack', 2, 6, 4, 2, 3),
  ('T003', 'Chris Nguyen', 5, 'Goalie', 3, 0, 0, 0, 1),
  ('T003', 'Daniel Smith', 3, 'Midfield', 3, 2, 1, 1, 5),
  ('T004', 'Noah Kim', 10, 'Attack', 4, 5, 3, 2, 4),
  ('T004', 'Ryan Moore', 8, 'Defense', 4, 3, 0, 3, 7);`

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