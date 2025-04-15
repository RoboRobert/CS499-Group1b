export interface SheetData {
  game_id: string,
  teamName: string[];
  coachName: string[];
  players: ScoresheetPlayer[][];
  saves: SheetSave[][];
  goals: number[][]
  goalTrack: SheetGoal[][];
  groundBalls: number[][];
  shots: number[][];
  clears: Stat[][];
  faceoffs: Stat[][];
  extraMan: Stat[][];
  timeouts: SheetTimeout[][];
  penalties: SheetPenalty[][];
  metaStats: MetaStats;
}

export interface SheetGoal {
  index: number;
  time: string;
  type: string;
  main: number;
  assist: number;
}

export interface Stat {
  won: number;
  lost: number;
}

export interface SheetTimeout {
  time: string;
  period: number;
}

export interface SheetPenalty {
  index: number,
  timeout: string;
  playerno: number;
  infraction: string;
  quarter: number;
  time: string;
}

export interface SheetSave {
  goalie: number;
  qtr1: number;
  qtr2: number;
  qtr3: number;
  qtr4: number;
  ot: number;
}

export interface ScoresheetPlayer {
  side: number;
  index: number;
  position: string;
  name: string;
  number: number;
  quarters: string;
  shots: number;
  goals: number;
  assists: number;
  groundBalls: number;
}

export const game_quarter = $state({quarter: 0});

export const game_id = $state({game_id: "", sheet_id: ""});

export const teamName = $state(["", ""]);

export const coachName = $state(["", ""]);

export const goals = $state([
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
])

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

export const timeouts: SheetTimeout[][] = $state([
  [
    { time: null, period: null },
    { time: null, period: null },
    { time: null, period: null },
    { time: null, period: null },
    { time: null, period: null },
    { time: null, period: null },
  ],
  [
    { time: null, period: null },
    { time: null, period: null },
    { time: null, period: null },
    { time: null, period: null },
    { time: null, period: null },
    { time: null, period: null },
  ],
]);

const numPenalties = 18;
let homePenalties: SheetPenalty[] = [];
let awayPenalties: SheetPenalty[] = [];
for (let i = 0; i < numPenalties; i++) {
  homePenalties.push({ index: i, timeout: null, playerno: null, infraction: "", quarter: null, time: null });
  awayPenalties.push({ index: i, timeout: null, playerno: null, infraction: "", quarter: null, time: null });
}

export const penalties = $state([homePenalties, awayPenalties]);

let homeArr: SheetGoal[] = [];
let awayArr: SheetGoal[] = [];
for (let i = 0; i < 30; i++) {
  homeArr.push({ index: i, time: null, type: "", main: null, assist: null });
  awayArr.push({ index: i, time: null, type: "", main: null, assist: null });
}

export const goalTrack = $state([homeArr, awayArr]);

let homeSaves: SheetSave[] = [];
let awaySaves: SheetSave[] = [];
for (let i = 0; i < 3; i++) {
  homeSaves.push({ goalie: 0, qtr1: 0, qtr2: 0, qtr3: 0, qtr4: 0, ot: 0 });
  awaySaves.push({ goalie: 0, qtr1: 0, qtr2: 0, qtr3: 0, qtr4: 0, ot: 0 });
}

export const saves = $state([homeSaves, awaySaves]);

function makePlayer(side: number, index: number): ScoresheetPlayer {
  return { side: side, index: index, position: "", name: "", number: null, goals: 0, assists: 0, shots: 0, quarters: "", groundBalls: 0 }
}

let numPlayers = 31;
let homePlayers: ScoresheetPlayer[] = [];
let awayPlayers: ScoresheetPlayer[] = [];
for (let i = 0; i < numPlayers; i++) {
  homePlayers.push(makePlayer(0, i));
  awayPlayers.push(makePlayer(1, i));
}

export const emptyPlayers = [homePlayers, awayPlayers];

export const players = $state([homePlayers, awayPlayers]);

function makeMap(players: ScoresheetPlayer[]): Map<number, ScoresheetPlayer> {
  let map = new Map<number, ScoresheetPlayer>();
  players.forEach((player) => {
    if (player.number != null) map.set(player.number, player);
  });

  return map;
}

// Maps player # to player data
// Stored as an array where playerMap[0] is home team, playerMap[1] is away team
const playerMap = $derived.by(() => {
  let homeMap = makeMap($state.snapshot(players[0]));
  let awayMap = makeMap($state.snapshot(players[1]));

  goalTrack[0].forEach((e) => {
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

  goalTrack[1].forEach((e) => {
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

export function getPlayer(side: number, player: number): ScoresheetPlayer {
  if (playerMap[side].get(player)) {
    return playerMap[side].get(player);
  } else return makePlayer(0, 0);
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


// Error checking
export const numMetaErrors = $state({errors: 0});