import type { Player, Save } from "./components/scoresheet/data.svelte";

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

    return errors;
}