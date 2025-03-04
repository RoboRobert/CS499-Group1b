export interface Team {
    name: string, //Player inherits
}

export interface Player {
    team: string, //Inherited from Team
    name: string,
    number: number,
    position: string,
    quarter: number,
    shots: number,
    goals: number,
    miss: number,
    ground: number,
}