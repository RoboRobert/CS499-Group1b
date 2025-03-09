export interface team {
	name: string,
	hometown: string,
	coach: string,
	players: string[],
}

export interface player {
	name: string,
	team: string,
	hometown: string,
	number: string,
	position: string,
	class: string,
	height: string,
	weight: string,
}

export const teams: team[] = $state<team[]>([]);
export const players: player[] = $state<player[]>([]);


export const addTeam = (team: team) => {
	teams.push(team);
};
export const addPlayer = (player: player) => {
	players.push(player);
};


