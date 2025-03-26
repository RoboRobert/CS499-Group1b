export interface Team {
    team_id: string, //Player Inherits
	team_name: string,
	hometown: string,
	state: string,
	coach: string,
}

export interface Player {
    team_name: string, //Inherited from Team
    player_name: string,
    player_number: number,
    position: string,
    quarter: number,
    shots: number,
    goals: number,
    miss: number,
    ground: number,
}