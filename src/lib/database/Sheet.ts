export interface Sheet {
    game_id: string,
    sheet_id: string,
    scorekeeper: string,
}

export interface Game {
    game_id: string,
    hometeam: string,
    awayteam: string,
    date: string,
    time: string,
    homescore: number,
    awayscore: number,
}