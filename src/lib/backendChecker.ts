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
            
        }
    }

    return errors;
}