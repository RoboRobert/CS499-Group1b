interface Goal {
    time: number,
    type: string,
    main: number,
    assist: number,
}

export const homeGoals = $state([0,0,0,0,0,0]);
export const awayGoals = $state([0,0,0,0,0,0]);

export const homeGroundBalls = $state([0,0,0,0,0]);
export const awayGroundBalls = $state([0,0,0,0,0]);

export const homeShots = $state([0,0,0,0,0]);
export const awayShots = $state([0,0,0,0,0]);

let homeArr: Goal[] = [];
for(let i = 0; i < 30; i++) {
    homeArr.push({time:0, type:"", main:0, assist:0})
}

export const homeGoalTrack = $state(homeArr);

let awayArr: Goal[] = [];
for(let i = 0; i < 30; i++) {
    awayArr.push({time:0, type:"", main:0, assist:0})
}

export const awayGoalTrack = $state(awayArr);