export interface Goal {
    time: number,
    type: string,
    main: number,
    assist: number,
}

export interface Stat {
    won: number,
    lost: number
}

export interface Timeout {
    minutes: number,
    seconds: number,
    period: number,
}

export interface Save {
    goalie: number,
    qtr1: number,
    qtr2: number,
    qtr3: number,
    qtr4:number,
    ot:number,
}

export interface Player {
    side:number;
    position: string;
    name: string;
    number: number;
    quarters: string;
    shots:number;
    goals: number;
    assists: number;
    groundBalls:number;
}

export const homeGoals = $state([0, 0, 0, 0, 0, 0]);
export const awayGoals = $state([0, 0, 0, 0, 0, 0]);

// Contains two arrays. groundBalls[0] is home, groundBalls[1] is away.
// I'll use this theme for the rest of the state variables.
export const groundBalls = $state([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);

export const shots = $state([[0, 0, 0, 0, 0], [0, 0, 0, 0, 0]]);

export const clears: Stat[][] = $state([[{ won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }],
[{ won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }]]
);

export const faceoffs: Stat[][] = $state([[{ won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }],
[{ won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }]]
);

export const extraMan: Stat[][] = $state([[{ won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }],
[{ won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }, { won: 0, lost: 0 }]]
);

export const timeouts: Timeout[][] = $state([[{ minutes: 0, seconds: 0, period: 0 }, { minutes: 0, seconds: 0, period: 0 }, { minutes: 0, seconds: 0, period: 0 }, { minutes: 0, seconds: 0, period: 0 }],
[{ minutes: 0, seconds: 0, period: 0 }, { minutes: 0, seconds: 0, period: 0 }, { minutes: 0, seconds: 0, period: 0 }, { minutes: 0, seconds: 0, period: 0 }]]);

let homeArr: Goal[] = [];
let awayArr: Goal[] = [];
for (let i = 0; i < 30; i++) {
    homeArr.push({ time: undefined, type: "", main: undefined, assist: undefined })
    awayArr.push({ time: undefined, type: "", main: undefined, assist: undefined })
}

export const homeGoalTrack = $state(homeArr);
export const awayGoalTrack = $state(awayArr);

let homeSaves: Save[] = [];
let awaySaves: Save[] = [];
for (let i = 0; i < 3; i++) {
    homeSaves.push({goalie:0, qtr1:0, qtr2:0, qtr3:0,qtr4:0,ot:0});
    awaySaves.push({goalie:0, qtr1:0, qtr2:0, qtr3:0,qtr4:0,ot:0});
}

export const saves = $state([homeSaves,awaySaves]);

const defaultPlayers = [{side:0, position:"", name:"", number:null, goals:0, assists:0, shots:0, quarters:"", groundBalls:0},
                        {side:1, position:"", name:"", number:null, goals:0, assists:0, shots:0, quarters:"", groundBalls:0}]

let numPlayers = 31;
let homePlayers: Player[] = [];
let awayPlayers: Player[] = [];

for (let i = 0; i < numPlayers; i++) {
    homePlayers.push(defaultPlayers[0]);
    awayPlayers.push(defaultPlayers[1]);
}

export const players = $state([homePlayers,awayPlayers]);

function makeMap(players: Player[]): Map<number,Player> {
    let map = new Map<number, Player>();
    players.forEach((player) => {
        if(player.number)
        map.set(player.number, player);
    });

    return map;
}

// Maps player # to goals and assists
// Stored as an array where goalMap[0] is home team, goalMap[1] is away team
const playerMap = $derived.by(() => {
    let homeMap = makeMap(players[0])
    let awayMap = makeMap(players[1])
    
    homeGoalTrack.forEach((e) => {
        if(homeMap.has(e.main)) {
            let val = homeMap.get(e.main);
            val.goals += 1;
            homeMap.set(e.main,val);
        }
        if(homeMap.has(e.assist)) {
            let val = homeMap.get(e.assist);
            val.assists += 1;
            homeMap.set(e.assist,val);
        }
    });

    awayGoalTrack.forEach((e) => {
        if(awayMap.has(e.main)) {
            let val = awayMap.get(e.main);
            val.goals += 1;
            awayMap.set(e.main,val);
        }
        if(awayMap.has(e.assist)) {
            let val = awayMap.get(e.assist);
            val.assists += 1;
            awayMap.set(e.assist,val);
        }
    });

    console.log(homeMap);
    console.log(awayMap);

    return [homeMap,awayMap];
})

export function getPlayerMap(side:number) {
    return $state.snapshot(playerMap[side]);
}

export function getPlayer(side: number, player: number): Player {
    if(playerMap[side].get(player)) {
        return playerMap[side].get(player);
    }
    else return defaultPlayers[side];
}