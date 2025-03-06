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
for (let i = 0; i < 30; i++) {
    homeArr.push({ time: 0, type: "", main: 0, assist: 0 })
}

export const homeGoalTrack = $state(homeArr);

let awayArr: Goal[] = [];
for (let i = 0; i < 30; i++) {
    awayArr.push({ time: 0, type: "", main: 0, assist: 0 })
}

export const awayGoalTrack = $state(awayArr);