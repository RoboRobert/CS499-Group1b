// This file contains a Library of functions designed to validate input on the frontend.

import { players } from "./data.svelte";

// Checks if the event target value is an integer.
export function IsNumber(event: any): boolean {
    const target = event.target as HTMLInputElement;

    if(isNaN(parseInt(target.value)) && target.value != "") {
        target.classList.add("error");
        target.setAttribute("title", "Value must be an integer.")
        return false;
    }

    target.classList.remove("error");
    target.removeAttribute("title");
    return true;
}

// Iterates through all player elements on the specified side and marks any that are the same.
export function CheckPlayerNumber(event: any, side: number) {
    const mainTarget = event.target as HTMLInputElement;

    mainTarget.classList.remove("error");
    mainTarget.removeAttribute("title");

    if(mainTarget.value == "") {
        return;
    }

    if(!IsNumber(event)) {
        return;
    }

    // Get a snapshot of the state of the player array
    const playerSnapshot = $state.snapshot(players);

    for(const player of playerSnapshot[side]) {
        if(playerSnapshot[side].some((e) => e.number === player.number)) {
            console.log("GG")
        }
    }

    // const length = playerSnapshot[side].length;

    // // Loop through them
    // for(let i = 0; i < length; i++) {
    //     for(let j = 0; j < length; i++) {
    //         if(i === j) {
    //             continue;
    //         }
    //         if(playerSnapshot[side][i].name === playerSnapshot[side][j].name) {
    //             // console.log(`playerNum_${side}_${i}`);
    //             let target = document.getElementById(`playerNum_${side}_${i}`);
    //             target.classList.add("error");
    //             target.setAttribute("title", "Duplicate player numbers are not allowed.")
    //         }
    //     }
    // }
}