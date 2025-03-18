// This file contains a 
// Library of functions designed to validate input on the frontend.

import { players } from "./data.svelte";

// Checks if the event target value is an integer.
export function IsNumber(target1: any): boolean {
    const target = target1 as HTMLInputElement;
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

    if(!IsNumber(mainTarget)) {
        return;
    }

    // Get a list of all the player elements on the specified side
    const playerNumbers = document.getElementsByClassName(`player${side}`) as HTMLCollectionOf<HTMLInputElement>;

    // Loop through them
    for(let i = 0; i < playerNumbers.length; i++) {
        // console.log(i);
        let target = playerNumbers[i];
            
        for(let j = 0; j < playerNumbers.length; i++) {
            if(i === j) {
                continue;
            }
            if(target.value == playerNumbers[j].value) {
                target.classList.add("error");
                target.setAttribute("title", "Duplicate player numbers are not allowed.")
            }
        }
    }
}