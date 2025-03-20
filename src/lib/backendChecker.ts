export interface SheetErr {
    elementID: string,
    message: string,
}

export function checkSheet(data: any): SheetErr[] {
    let errors: SheetErr[] = [];

    // Check all the team names.
    for(let i = 0; i < data.teamName.length; i++) {
        const name:string = data.teamName[i];
        if(!name) {
            errors.push({elementID: `teamName-${i}`, message: "Team name is invalid."});
        }
    }

    return errors;
}