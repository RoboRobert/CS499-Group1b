import type { Penalty, Player, Save, Stat } from "./components/scoresheet/data.svelte";

export interface SheetErr {
    elementID: string,
    message: string,
}

export function checkSheet(data: any): SheetErr[] {
    let errors: SheetErr[] = [];

    // Check all the team names and make sure they're not empty.
    for(let i = 0; i < data.teamName.length; i++) {
        const name:string = data.teamName[i];
        if(!name) {
            errors.push({elementID: `teamName-${i}`, message: "Team name is invalid."});
        }
    }

    // Check all the players.
    for(let i = 0; i < data.players.length; i++) {
        for(let j = 0; j < data.players[i].length; j++) {
            let player: Player = data.players[i][j];
            // If the player is empty, ignore it.
            if(!player.name && !player.number && !player.position) {
                continue;
            }
            
            // Otherwise, if the player has some data, check all its fields
            if(!player.name) {
                errors.push({elementID: `playerName-${i}-${j}`, message: "Player name is invalid."});
            }
            if(!player.number) {
                errors.push({elementID: `playerNumber-${i}-${j}`, message: "Player number is invalid."});
            }
            if(!player.position) {
                errors.push({elementID: `playerPosition-${i}-${j}`, message: "Player position is invalid."});
            }
        }
    }

    // Check all the saves
    for(let i = 0; i < data.saves.length; i++) {
        for(let j = 0; j < data.saves[i].length; j++) {
            let save: Save = data.saves[i][j];
            // If the save is empty, ignore it.
            if(!save.goalie) {
                continue;
            }
            
            // Otherwise, if the save has some data, check all its fields
            if(save.qtr1 == null) {
                errors.push({elementID: `savesQ1-${i}-${j}`, message: "Field cannot be empty."});
            }
            if(save.qtr2 == null) {
                errors.push({elementID: `savesQ2-${i}-${j}`, message: "Field cannot be empty."});
            }
            if(save.qtr3 == null) {
                errors.push({elementID: `savesQ3-${i}-${j}`, message: "Field cannot be empty."});
            }
            if(save.qtr4 == null) {
                errors.push({elementID: `savesQ4-${i}-${j}`, message: "Field cannot be empty."});
            }
            if(save.ot == null) {
                errors.push({elementID: `savesOT-${i}-${j}`, message: "Field cannot be empty."});
            }
        }
    }

    // Check all the penalties
    for(let i = 0; i < data.penalties.length; i++) {
        for(let j = 0; j < data.penalties[i].length; j++) {
            let penalty: Penalty = data.penalties[i][j];
            // If the penalty is empty, ignore it.
            if(!penalty.interaction && penalty.playerno == null && !penalty.quarter && !penalty.time && !penalty.timeout) {
                continue;
            }

            if(!penalty.timeout) {
                errors.push({elementID: `penaltyTimeout-${i}-${j}`, message: "Field cannot be empty."});
            }

            if(penalty.playerno == null) {
                errors.push({elementID: `penaltyNumber-${i}-${j}`, message: "Field cannot be empty."});
            }

            if(!penalty.interaction) {
                errors.push({elementID: `penaltyInteraction-${i}-${j}`, message: "Field cannot be empty."});
            }

            if(!penalty.quarter) {
                errors.push({elementID: `penaltyQuarter-${i}-${j}`, message: "Field cannot be empty."});
            }

            if(!penalty.time) {
                errors.push({elementID: `penaltyTime-${i}-${j}`, message: "Field cannot be empty."});
            }
        }
    }

    // TODO: Check all the timeouts
    // for(let i = 0; i < data.penalties.length; i++) {
    //     for(let j = 0; j < data.penalties[i].length; j++) {
    // }

    // Check all the ground balls
    for(let i = 0; i < data.groundBalls.length; i++) {
        for(let j = 0; j < data.groundBalls[i].length; j++) {
            let groundBall: number = data.groundBalls[i][j];
            // If the groundBall field is empty, mark it on the sheet.
            if(groundBall == null) {
                errors.push({elementID: `groundBalls-${i}-${j}`, message: "Field cannot be empty."});
            }
        }
    }

    // Check all the shots
    for(let i = 0; i < data.shots.length; i++) {
        for(let j = 0; j < data.shots[i].length; j++) {
            let groundBall: number = data.shots[i][j];
            // If the groundBall field is empty, mark it on the sheet.
            if(groundBall == null) {
                errors.push({elementID: `shots-${i}-${j}`, message: "Field cannot be empty."});
            }
        }
    }

    // Check all the clears
    for(let i = 0; i < data.clears.length; i++) {
        for(let j = 0; j < data.clears[i].length; j++) {
            let clear: Stat = data.clears[i][j];
            // If the clear field is empty, mark it on the sheet.
            if(clear.won == null) {
                errors.push({elementID: `clearsWon-${i}-${j}`, message: "Field cannot be empty."});
            }

            if(clear.lost == null) {
                errors.push({elementID: `clearsLost-${i}-${j}`, message: "Field cannot be empty."});
            }
        }
    }

    // Check all the extra man
    for(let i = 0; i < data.extraMan.length; i++) {
        for(let j = 0; j < data.extraMan[i].length; j++) {
            let extraMan: Stat = data.extraMan[i][j];
            // If any extra man field is empty, mark it on the sheet.
            if(extraMan.won == null) {
                errors.push({elementID: `extraManWon-${i}-${j}`, message: "Field cannot be empty."});
            }

            if(extraMan.lost == null) {
                errors.push({elementID: `extraManLost-${i}-${j}`, message: "Field cannot be empty."});
            }
        }
    }

    // Check all the faceoffs
    for(let i = 0; i < data.faceoffs.length; i++) {
        for(let j = 0; j < data.faceoffs[i].length; j++) {
            let faceoff: Stat = data.faceoffs[i][j];
            // If any faceoff field is empty, mark it on the sheet.
            if(faceoff.won == null) {
                errors.push({elementID: `faceoffsWon-${i}-${j}`, message: "Field cannot be empty."});
            }

            if(faceoff.lost == null) {
                errors.push({elementID: `faceoffsLost-${i}-${j}`, message: "Field cannot be empty."});
            }
        }
    }

    return errors;
}