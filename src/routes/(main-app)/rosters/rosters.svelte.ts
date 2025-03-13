export interface team {
	teamId: string,
	name: string,
	hometown: string,
	state: string,
	coach: string,
	players: player[],
}

export interface player {
	playerId: string,
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
export const addPlayer = (team: team, player: player) => {
	team.players.push(player);
	players.push(player);
};
export const deletePlayer = (team: team, player: player) => {
	team.players.splice(team.players.indexOf(player), 1);
};

export const deleteTeam = (team: team) => {
	teams.splice(teams.indexOf(team), 1);
};

