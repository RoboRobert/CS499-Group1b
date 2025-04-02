export interface GameStat {
    sheet_id: number,
    side: number,
    quarter: number,
    ground: number,
    shots: number,
    clears_pass: number,
    clears_fail: number,
    extra_man_score: number,
    extra_man_fail: number,
    faceoff_win: number,
    faceoff_loss: number,
}