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
    homeArr.push({ time: 0, type: "", main: 0, assist: 0 })
    awayArr.push({ time: 0, type: "", main: 0, assist: 0 })
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