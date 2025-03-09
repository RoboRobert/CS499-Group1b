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
    position: string,
    name: string,
    number:number,
    quarters: string,
    shots:number,
    goals:number,
    assists:number,
    groundBalls:number,
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

let numPlayers = 31;
let homePlayers: Player[] = [];
let awayPlayers: Player[] = [];
for (let i = 0; i < numPlayers; i++) {
    homePlayers.push({position:"", name:"", number:undefined, quarters:"", shots:undefined, goals:undefined, assists:undefined, groundBalls:undefined});
    awayPlayers.push({position:"", name:"", number:undefined, quarters:"", shots:undefined, goals:undefined, assists:undefined, groundBalls:undefined});
}

export const players = $state([homePlayers,awayPlayers]);

// Maps player # to goals.
// Stored as an array where goalMap[0] is home team, goalMap[1] is away team
const goalMap = $derived.by(() => {
    let homeMap = new Map<number, number>();
    let awayMap = new Map<number, number>();
    homeGoalTrack.forEach((e) => {
        if(homeMap.has(e.main)) {
            let val = homeMap.get(e.main);
            val += 1;
            homeMap.set(e.main,val);
        }
        else {
            homeMap.set(e.main,1);
        }
    });

    awayGoalTrack.forEach((e) => {
        if(awayMap.has(e.main)) {
            let val = awayMap.get(e.main);
            val += 1;
            awayMap.set(e.main,val);
        }
        else {
            awayMap.set(e.main,1);
        }
    });

    return [homeMap,awayMap];
})

// Maps player # to assists.
// Stored as an array where assistMap[0] is home team, assistMap[1] is away team
const assistMap = $derived.by(() => {
    let homeMap = new Map<number, number>();
    let awayMap = new Map<number, number>();
    homeGoalTrack.forEach((e) => {
        if(homeMap.has(e.assist)) {
            let val = homeMap.get(e.assist);
            val += 1;
            homeMap.set(e.assist,val);
        }
        else {
            homeMap.set(e.assist,1);
        }
    });

    awayGoalTrack.forEach((e) => {
        if(awayMap.has(e.assist)) {
            let val = awayMap.get(e.assist);
            val += 1;
            awayMap.set(e.assist,val);
        }
        else {
            awayMap.set(e.assist,1);
        }
    });

    return [homeMap,awayMap];
})