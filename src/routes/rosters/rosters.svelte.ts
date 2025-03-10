export interface team {
	name: string,
	hometown: string,
	state: string,
	coach: string,
	players: string[],
}

export interface player {
	firstName: string,
	lastName: string,
	team: string,
	hometown: string,
	state: string,
	number: string,
	position: string,
	class: string,
	heightFeet: string,
	heightInches: string,
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


