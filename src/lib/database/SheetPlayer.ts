interface SheetPlayer {
  sheet_id: string;
  side: number;
  index: number;
  name: string;
  position: string,
  playerno: number;
  quarter_1: boolean;
  quarter_2: boolean;
  quarter_3: boolean;
  quarter_4: boolean;
  ot: boolean;
  shots: number[];
  groundballs: number[];
}
