export interface SheetData {
  teamName: string[];
  players: Player[][];
  saves: Save[][];
  homeGoals: number[];
  awayGoals: number[];
  homeGoalTrack: Goal[];
  awayGoalTrack: Goal[];
  groundBalls: number[][];
  shots: number[][];
  clears: Stat[][];
  faceoffs: Stat[][];
  extraMan: Stat[][];
  timeouts: Timeout[][];
  penalties: Penalty[][];
  metaStats: MetaStats;
}

export interface Time {
  minutes: number;
  seconds: number;
}

export function toTime(input: string): Time {
  let regex: RegExp = /^(\d{1,2}):(\d{2})$/;
  let matches = input.match(regex);

  let time: Time = { minutes: Number(matches[1]), seconds: Number(matches[2]) };
  return time;
}

export function toTimeString(time: Time): string {
  if (!time) {
    return "";
  }

  return `${time.minutes}:${time.seconds}`;
}

export interface Goal {
  time: Time;
  type: string;
  main: number;
  assist: number;
}

export interface Stat {
  won: number;
  lost: number;
}

export interface Timeout {
  time: Time;
  period: number;
}

export interface Penalty {
  timeout: Time;
  playerno: number;
  interaction: string;
  quarter: number;
  time: Time;
}

export interface Save {
  goalie: number;
  qtr1: number;
  qtr2: number;
  qtr3: number;
  qtr4: number;
  ot: number;
}

export interface Player {
  side: number;
  position: string;
  name: string;
  number: number;
  quarters: string;
  shots: number;
  goals: number;
  assists: number;
  groundBalls: number;
}

export const teamName = $state(["", ""]);

export const homeGoals = $state([0, 0, 0, 0, 0, 0]);
export const awayGoals = $state([0, 0, 0, 0, 0, 0]);

// Contains two arrays. groundBalls[0] is home, groundBalls[1] is away.
// I'll use this theme for the rest of the state variables.
export const groundBalls = $state([
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]);

export const shots = $state([
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]);

export const clears: Stat[][] = $state([
  [
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
  ],
  [
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
  ],
]);

export const faceoffs: Stat[][] = $state([
  [
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
  ],
  [
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
  ],
]);

export const extraMan: Stat[][] = $state([
  [
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
  ],
  [
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
    { won: 0, lost: 0 },
  ],
]);

export const timeouts: Timeout[][] = $state([
  [
    { time: null, period: 0 },
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
  ],
  [
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
    { time: null, seconds: 0, period: 0 },
  ],
]);

const numPenalties = 18;
let homePenalties: Penalty[] = [];
let awayPenalties: Penalty[] = [];
for (let i = 0; i < numPenalties; i++) {
  homePenalties.push({ timeout: null, playerno: null, interaction: "", quarter: null, time: null });
  awayPenalties.push({ timeout: null, playerno: null, interaction: "", quarter: null, time: null });
}

export const penalties = $state([homePenalties, awayPenalties]);

let homeArr: Goal[] = [];
let awayArr: Goal[] = [];
for (let i = 0; i < 30; i++) {
  homeArr.push({ time: null, type: "", main: undefined, assist: undefined });
  awayArr.push({ time: null, type: "", main: undefined, assist: undefined });
}

export const homeGoalTrack = $state(homeArr);
export const awayGoalTrack = $state(awayArr);

let homeSaves: Save[] = [];
let awaySaves: Save[] = [];
for (let i = 0; i < 3; i++) {
  homeSaves.push({ goalie: 0, qtr1: 0, qtr2: 0, qtr3: 0, qtr4: 0, ot: 0 });
  awaySaves.push({ goalie: 0, qtr1: 0, qtr2: 0, qtr3: 0, qtr4: 0, ot: 0 });
}

export const saves = $state([homeSaves, awaySaves]);

const defaultPlayers = [
  { side: 0, position: "", name: "", number: null, goals: 0, assists: 0, shots: 0, quarters: "", groundBalls: 0 },
  { side: 1, position: "", name: "", number: null, goals: 0, assists: 0, shots: 0, quarters: "", groundBalls: 0 },
];

let numPlayers = 31;
let homePlayers: Player[] = [];
let awayPlayers: Player[] = [];
for (let i = 0; i < numPlayers; i++) {
  homePlayers.push(defaultPlayers[0]);
  awayPlayers.push(defaultPlayers[1]);
}

export const emptyPlayers = [homePlayers, awayPlayers];

export const players = $state([homePlayers, awayPlayers]);

function makeMap(players: Player[]): Map<number, Player> {
  let map = new Map<number, Player>();
  players.forEach((player) => {
    if (player.number) map.set(player.number, player);
  });

  return map;
}

// Maps player # to player data
// Stored as an array where playerMap[0] is home team, playerMap[1] is away team
const playerMap = $derived.by(() => {
  let homeMap = makeMap($state.snapshot(players[0]));
  let awayMap = makeMap($state.snapshot(players[1]));

  homeGoalTrack.forEach((e) => {
    if (homeMap.has(e.main)) {
      let val = homeMap.get(e.main);
      val.goals += 1;
      homeMap.set(e.main, val);
    }
    if (homeMap.has(e.assist)) {
      let val = homeMap.get(e.assist);
      val.assists += 1;
      homeMap.set(e.assist, val);
    }
  });

  awayGoalTrack.forEach((e) => {
    if (awayMap.has(e.main)) {
      let val = awayMap.get(e.main);
      val.goals += 1;
      awayMap.set(e.main, val);
    }
    if (awayMap.has(e.assist)) {
      let val = awayMap.get(e.assist);
      val.assists += 1;
      awayMap.set(e.assist, val);
    }
  });

  return [homeMap, awayMap];
});

export function getPlayerMap(side: number) {
  return $state.snapshot(playerMap[side]);
}

export function getPlayer(side: number, player: number): Player {
  if (playerMap[side].get(player)) {
    return playerMap[side].get(player);
  } else return defaultPlayers[side];
}

export interface MetaStats {
  date: string;
  site: string;
  gameStart: string;
  scorekeeper: string;
  oppScorekeeper: string;
  timeKeeper: string;
  headOfficial: string;
  umpire: string;
  fieldJudge: string;
  lengthOfQuarters: string;
  weatherCondition: string;
}

export const metaStats = $state<MetaStats>({
  date: "",
  site: "",
  gameStart: "",
  scorekeeper: "",
  oppScorekeeper: "",
  timeKeeper: "",
  headOfficial: "",
  umpire: "",
  fieldJudge: "",
  lengthOfQuarters: "",
  weatherCondition: "",
});
