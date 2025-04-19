import sql from "$lib/database/postgres.server";
import type { Team } from "$lib/database/Team";
import type { Player } from "$lib/database/Team";
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
    await dbGameReset();
    await dbSheetReset();
    await dbGameStatReset();
    await dbTeamsReset();
    await dbIndividualScoreReset();
    await dbPenaltyReset();
    await dbSaveReset();
    await dbPlayersReset();
    await dbTimeoutReset();
    await dbSheetInfoReset();
    await dbGoalReset();
    await dbSheetPlayersReset();

    await sql<Team[]>`
        INSERT INTO teams (TEAM_NAME, TEAM_ID, HOMETOWN, STATE, COACH) VALUES 
    (${'Notre Dame'}, ${1}, ${'Notre Dame'}, ${'Indiana'}, ${'Kevin Corrigan'})`

    await sql<Team[]>`
        INSERT INTO teams (TEAM_NAME, TEAM_ID, HOMETOWN, STATE, COACH) VALUES 
    (${'Michigan'}, ${2}, ${'Georgetown'}, ${'Michigan'}, ${'Kevin Conroy'})
    `

    await sql<Player[]>`
        INSERT INTO players (
    team_id, player_id, team_name, player_name, player_number, position, player_class, hometown,
    state, height_feet, height_inches, weight, quarters, attempted_shots, failed_shots, goals, ground_balls) 
    VALUES
    (1, 101, 'Notre Dame', 'Jake Taylor', 13, 'Attack', 'Senior', 'South Bend', 'Indiana', 6, 1, 210, 4, 6, 2, 3, 5),
    (1, 102, 'Notre Dame', 'Chris Kavanagh', 50, 'Attack', 'Junior', 'Glen Ridge', 'New Jersey', 5, 11, 185, 4, 7, 1, 4, 4),
    (1, 103, 'Notre Dame', 'Pat Kavanagh', 51, 'Attack', 'Senior', 'Glen Ridge', 'New Jersey', 6, 0, 190, 4, 8, 3, 5, 6),
    (1, 104, 'Notre Dame', 'Jordan Faison', 14, 'Midfield', 'Junior', 'Denver', 'Colorado', 6, 2, 200, 4, 4, 1, 2, 8),
    (1, 105, 'Notre Dame', 'Eric Dobson', 8, 'Midfield', 'Senior', 'Charlotte', 'North Carolina', 5, 10, 180, 4, 5, 2, 3, 7),
    (1, 106, 'Notre Dame', 'Devon McLane', 29, 'Midfield', 'Sophomore', 'Albany', 'New York', 5, 11, 175, 4, 3, 1, 1, 6),
    (1, 107, 'Notre Dame', 'Chris Conlin', 20, 'Defense', 'Junior', 'Boston', 'Massachusetts', 6, 3, 210, 4, 0, 0, 0, 9),
    (1, 108, 'Notre Dame', 'Marco Napolitano', 30, 'Defense', 'Senior', 'Long Island', 'New York', 6, 4, 215, 4, 1, 0, 1, 8),
    (1, 109, 'Notre Dame', 'Shawn Lyght', 90, 'Defense', 'Senior', 'Washington D.C.', 'District of Columbia', 6, 1, 195, 4, 2, 1, 0, 7),
    (1, 110, 'Notre Dame', 'Liam Entenmann', 44, 'Goalie', 'Junior', 'New York City', 'New York', 6, 3, 210, 4, 15, 3, 0, 4),
    (1, 111, 'Notre Dame', 'Jeffery Ricciardelli', 0, 'Attack', 'Freshman', 'Jersey City', 'New Jersey', 5, 10, 180, 2, 3, 1, 1, 2),
    (1, 112, 'Notre Dame', 'Fulton Bayman', 2, 'Attack', 'Sophomore', 'Baltimore', 'Maryland', 6, 0, 195, 3, 4, 2, 2, 3),
    (1, 113, 'Notre Dame', 'Colin Hagstrom', 4, 'Midfield', 'Freshman', 'Chicago', 'Illinois', 5, 11, 170, 1, 2, 0, 0, 1),
    (1, 114, 'Notre Dame', 'Vryce Walker', 5, 'Midfield', 'Junior', 'Denver', 'Colorado', 6, 1, 185, 3, 3, 1, 1, 4),
    (1, 115, 'Notre Dame', 'Fisher Finley', 6, 'Midfield', 'Sophomore', 'Charlotte', 'North Carolina', 5, 9, 175, 2, 2, 1, 0, 3),
    (1, 116, 'Notre Dame', 'Will Angrick', 10, 'Midfield', 'Senior', 'Pittsburgh', 'Pennsylvania', 6, 2, 200, 4, 5, 2, 2, 6),
    (1, 117, 'Notre Dame', 'Tyler Buchner', 12, 'Midfield', 'Freshman', 'San Diego', 'California', 6, 4, 210, 1, 1, 0, 0, 1),
    (1, 118, 'Notre Dame', 'Reilly Gray', 17, 'Defense', 'Sophomore', 'Pittsburgh', 'Pennsylvania', 6, 0, 205, 2, 0, 0, 0, 3),
    (1, 119, 'Notre Dame', 'Christian Alacqua', 19, 'Defense', 'Junior', 'Long Island', 'New York', 6, 2, 200, 3, 1, 0, 0, 4),
    (1, 120, 'Notre Dame', 'Carter Parlette', 21, 'Defense', 'Senior', 'Bethesda', 'Maryland', 6, 1, 215, 2, 1, 0, 0, 5),
    (1, 121, 'Notre Dame', 'Will Lynch', 22, 'Defense', 'Junior', 'Boston', 'Massachusetts', 6, 3, 210, 4, 0, 0, 0, 7),
    (1, 122, 'Notre Dame', 'Max Busenkell', 23, 'Defense', 'Sophomore', 'South Bend', 'Indiana', 6, 2, 190, 1, 0, 0, 0, 2),
    (1, 123, 'Notre Dame', 'Ben Ramsey', 24, 'Midfield', 'Freshman', 'Chicago', 'Illinois', 5, 10, 180, 2, 2, 1, 1, 3),
    (1, 124, 'Notre Dame', 'Will Maheras', 25, 'Midfield', 'Junior', 'Philadelphia', 'Pennsylvania', 5, 11, 190, 4, 4, 2, 2, 5),
    (1, 125, 'Notre Dame', 'Jalen Seymour', 26, 'Attack', 'Sophomore', 'Orlando', 'Florida', 6, 0, 185, 2, 3, 0, 1, 4),
    (1, 126, 'Notre Dame', 'Ross Burgmaster', 27, 'Defense', 'Freshman', 'Richmond', 'Virginia', 6, 1, 200, 3, 0, 0, 0, 4),
    (1, 127, 'Notre Dame', 'Nate Schwitzenber', 37, 'Attack', 'Junior', 'Pittsburgh', 'Pennsylvania', 6, 3, 195, 1, 2, 1, 1, 2),
    (1, 128, 'Notre Dame', 'Will Gallagher', 47, 'Midfield', 'Senior', 'Boston', 'Massachusetts', 6, 2, 210, 3, 4, 2, 2, 5),
    (1, 129, 'Notre Dame', 'Nick Harris', 77, 'Midfield', 'Sophomore', 'Charlotte', 'North Carolina', 5, 10, 175, 2, 1, 1, 0, 3),
    (1, 130, 'Notre Dame', 'Will Donnovan', 81, 'Defense', 'Freshman', 'Long Island', 'New York', 6, 3, 210, 1, 0, 0, 0, 2);
    `

    await sql<Player[]>`
    INSERT INTO players (
    team_id, player_id, team_name, player_name, player_number, position, player_class, hometown,
    state, height_feet, height_inches, weight, quarters, attempted_shots, failed_shots, goals, ground_balls) 
    VALUES
    (2, 201, 'Maryland', 'Eric Spanos', 7, 'Attack', 'Junior', 'Baltimore', 'Maryland', 6, 1, 200, 3, 5, 1, 3, 4),
    (2, 202, 'Maryland', 'Daniel Kelly', 45, 'Attack', 'Senior', 'Phoenixville', 'Pennsylvania', 6, 0, 210, 4, 7, 2, 4, 6),
    (2, 203, 'Maryland', 'Daniel Maltz', 37, 'Attack', 'Sophomore', 'Baltimore', 'Maryland', 6, 4, 215, 3, 6, 2, 2, 5),
    (2, 204, 'Maryland', 'Ryan Siracusa', 38, 'Midfield', 'Senior', 'Rockville', 'Maryland', 6, 0, 190, 4, 4, 1, 1, 4),
    (2, 205, 'Maryland', 'Eric Malever', 4, 'Midfield', 'Junior', 'Mamaroneck', 'New York', 6, 1, 185, 3, 5, 1, 2, 5),
    (2, 206, 'Maryland', 'Jack Koras', 22, 'Midfield', 'Freshman', 'Annapolis', 'Maryland', 6, 2, 195, 2, 3, 0, 1, 3),
    (2, 207, 'Maryland', 'Ajax Zappitello', 1, 'Defense', 'Senior', 'Philadelphia', 'Pennsylvania', 5, 11, 195, 4, 1, 0, 0, 6),
    (2, 208, 'Maryland', 'Will Schaller', 27, 'Defense', 'Junior', 'Dallas', 'Texas', 6, 1, 210, 3, 0, 0, 0, 7),
    (2, 209, 'Maryland', 'Colin Burlace', 40, 'Defense', 'Junior', 'Virginia Beach', 'Virginia', 6, 3, 215, 4, 1, 0, 0, 8),
    (2, 210, 'Maryland', 'Logan McNaney', 30, 'Goalie', 'Senior', 'Ellicott City', 'Maryland', 6, 3, 215, 4, 12, 3, 0, 5),
    (2, 211, 'Maryland', 'Marco Signorello', 3, 'Defense', 'Freshman', 'Stamford', 'Connecticut', 6, 2, 200, 1, 0, 0, 0, 2),
    (2, 212, 'Maryland', 'Eric Kolar', 8, 'Midfield', 'Sophomore', 'Elkridge', 'Maryland', 6, 0, 190, 2, 1, 0, 0, 3),
    (2, 213, 'Maryland', 'Braden Erksa', 10, 'Attack', 'Freshman', 'Denver', 'Colorado', 6, 3, 205, 2, 3, 1, 1, 4),
    (2, 214, 'Maryland', 'Zack Whittier', 13, 'Midfield', 'Sophomore', 'Washington', 'D.C.', 5, 11, 175, 1, 2, 0, 1, 2),
    (2, 215, 'Maryland', 'Charlie Koras', 14, 'Attack', 'Junior', 'Annapolis', 'Maryland', 6, 0, 185, 3, 4, 1, 2, 4),
    (2, 216, 'Maryland', 'Colin Sharkey', 24, 'Defense', 'Junior', 'Lutherville', 'Maryland', 6, 2, 210, 3, 0, 0, 0, 5),
    (2, 217, 'Maryland', 'AJ Larkin', 26, 'Midfield', 'Freshman', 'Richmond', 'Virginia', 5, 9, 175, 1, 1, 0, 0, 2),
    (2, 218, 'Maryland', 'Geordy Holmes', 34, 'Midfield', 'Sophomore', 'Lutherville', 'Maryland', 6, 1, 190, 2, 2, 1, 1, 3),
    (2, 219, 'Maryland', 'Jack Brennan', 41, 'Defense', 'Senior', 'Bethesda', 'Maryland', 6, 3, 215, 3, 1, 0, 0, 6),
    (2, 220, 'Maryland', 'Griffin Kinge', 42, 'Midfield', 'Freshman', 'Silver Spring', 'Maryland', 6, 2, 200, 2, 3, 1, 1, 3),
    (2, 221, 'Maryland', 'Elijah Stobaugh', 44, 'Defense', 'Sophomore', 'Towson', 'Maryland', 6, 0, 210, 3, 0, 0, 0, 4),
    (2, 222, 'Maryland', 'Nick Redd', 47, 'Attack', 'Junior', 'Columbus', 'Ohio', 5, 11, 180, 1, 2, 0, 1, 2),
    (2, 223, 'Maryland', 'Jackson Canfield', 50, 'Goalie', 'Freshman', 'South Orange', 'New Jersey', 6, 4, 210, 2, 8, 2, 0, 4),
    (2, 224, 'Maryland', 'Jack McDonald', 51, 'Defense', 'Senior', 'Fallston', 'Maryland', 6, 3, 220, 3, 1, 0, 0, 7),
    (2, 225, 'Maryland', 'Luke Wierman', 52, 'Midfield', 'Sophomore', 'Annapolis', 'Maryland', 6, 1, 200, 4, 4, 2, 2, 5),
    (2, 226, 'Maryland', 'George Stamos', 54, 'Midfield', 'Junior', 'Towson', 'Maryland', 6, 2, 190, 2, 3, 1, 1, 4),
    (2, 227, 'Maryland', 'Owen Murphy', 55, 'Attack', 'Freshman', 'Baltimore', 'Maryland', 5, 10, 170, 1, 2, 0, 1, 2),
    (2, 228, 'Maryland', 'Nick Alviti', 77, 'Defense', 'Sophomore', 'Garden City', 'New York', 6, 2, 205, 3, 0, 0, 0, 5);`
}