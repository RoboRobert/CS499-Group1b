export interface game {
    gameId: string;
}

export interface scoresheet{
    sheetId: string;
    gameId: string;
}


export const games: game[] = $state<game[]>([]);
export const scoresheets: scoresheet[] = $state<scoresheet[]>([]);
export const addGame = (game: game) => {
    games.push(game);
};
export const addScoresheet = (scoresheet: scoresheet) => {
    scoresheets.push(scoresheet);
};
export const deleteGame = (game: game) => {
    games.splice(games.indexOf(game), 1);
};
export const deleteScoresheet = (scoresheet: scoresheet) => {
    scoresheets.splice(scoresheets.indexOf(scoresheet), 1);
};
