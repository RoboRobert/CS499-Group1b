export interface SheetData {
  game_id: string;
  turnovers: SheetTurnover[];
  substitutions: SheetTurnover[];
  teamName: string[];
  coachName: string[];
  players: ScoresheetPlayer[][];
  saves: SheetSave[][];
  goalTrack: SheetGoal[][];
  goals: number[][];
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
  quarter: number;
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
  index: number;
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
  quarters: Quarters;
  goals: number;
  assists: number;
  groundBalls: number[];
  shots: number[];
}

export interface Quarters {
  q1: boolean;
  q2: boolean;
  q3: boolean;
  q4: boolean;
  ot: boolean;
}

export interface SheetTurnover {
  half1: number;
  half2: number;
}

export const turnovers: SheetTurnover[] = $state([
  { half1: 0, half2: 0 },
  { half1: 0, half2: 0 },
]);
export const substitutions: SheetTurnover[] = $state([
  { half1: 0, half2: 0 },
  { half1: 0, half2: 0 },
]);

export const game_quarter = $state({ quarter: 0 });

export const game_id = $state({ game_id: "", sheet_id: "" });

export const teamName = $state(["", ""]);

export const coachName = $state(["", ""]);

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
  homeArr.push({
    index: i, time: null, type: "", main: null, assist: null,
    quarter: 0
  });
  awayArr.push({
    index: i, time: null, type: "", main: null, assist: null,
    quarter: 0
  });
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
  return {
    side: side,
    index: index,
    position: "",
    name: "",
    number: null,
    goals: 0,
    assists: 0,
    quarters: { q1: false, q2: false, q3: false, q4: false, ot: false },
    shots: [0, 0, 0, 0, 0],
    groundBalls: [0, 0, 0, 0, 0],
  };
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
      val.shots[0] += 1;
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
      val.shots[0] += 1;
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
export const numMetaErrors = $state({ errors: 0 });

const shots = $derived([
  [
    getPlayerMap(0)
      .values()
      .map((e) => e.shots[0])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(0)
      .values()
      .map((e) => e.shots[1])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(0)
      .values()
      .map((e) => e.shots[2])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(0)
      .values()
      .map((e) => e.shots[3])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(0)
      .values()
      .map((e) => e.shots[4])
      .reduce((c, p) => c + p, 0),
  ],
  [
    getPlayerMap(1)
      .values()
      .map((e) => e.shots[0])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(1)
      .values()
      .map((e) => e.shots[1])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(1)
      .values()
      .map((e) => e.shots[2])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(1)
      .values()
      .map((e) => e.shots[3])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(1)
      .values()
      .map((e) => e.shots[4])
      .reduce((c, p) => c + p, 0),
  ],
]);

export function getShots(side: number): number[] {
  return $state.snapshot(shots[side]);
}

const groundBalls = $derived([
  [
    getPlayerMap(0)
      .values()
      .map((e) => e.groundBalls[0])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(0)
      .values()
      .map((e) => e.groundBalls[1])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(0)
      .values()
      .map((e) => e.groundBalls[2])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(0)
      .values()
      .map((e) => e.groundBalls[3])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(0)
      .values()
      .map((e) => e.groundBalls[4])
      .reduce((c, p) => c + p, 0),
  ],
  [
    getPlayerMap(1)
      .values()
      .map((e) => e.groundBalls[0])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(1)
      .values()
      .map((e) => e.groundBalls[1])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(1)
      .values()
      .map((e) => e.groundBalls[2])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(1)
      .values()
      .map((e) => e.groundBalls[3])
      .reduce((c, p) => c + p, 0),
    getPlayerMap(1)
      .values()
      .map((e) => e.groundBalls[4])
      .reduce((c, p) => c + p, 0),
  ],
]);

export function getGroundBalls(side: number): number[] {
  return $state.snapshot(groundBalls[side]);
}

const goals = $derived([
  [
    goalTrack[0].filter((g)=>g.main!=null && g.quarter==0).length,
    goalTrack[0].filter((g)=>g.main!=null && g.quarter==1).length,
    goalTrack[0].filter((g)=>g.main!=null && g.quarter==2).length,
    goalTrack[0].filter((g)=>g.main!=null && g.quarter==3).length,
    goalTrack[0].filter((g)=>g.main!=null && g.quarter==4).length,
  ],
  [
    goalTrack[1].filter((g)=>g.main!=null && g.quarter==0).length,
    goalTrack[1].filter((g)=>g.main!=null && g.quarter==1).length,
    goalTrack[1].filter((g)=>g.main!=null && g.quarter==2).length,
    goalTrack[1].filter((g)=>g.main!=null && g.quarter==3).length,
    goalTrack[1].filter((g)=>g.main!=null && g.quarter==4).length,
  ]
]);

export function getGoals(side: number): number[] {
  return $state.snapshot(goals[side]);
}