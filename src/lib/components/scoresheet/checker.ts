// This file contains a 
// Library of functions designed to validate input on the frontend.

import { players } from "./data.svelte";

// Checks if the event target value is an integer.
export function IsNumber(event: any) {
    const target = event.target as HTMLInputElement;

    console.log(target);

    if(target.value == "" || !isNaN(parseInt(target.value, 10))) {
        target.classList.remove("error");
        target.removeAttribute("title")
    }
    else {
        target.classList.add("error");
        target.setAttribute("title", "Value must be an integer.")
    }
}


export function IsPlayerNumber(event: any) {
    const target = event.target as HTMLInputElement;

    IsNumber(event);

    // if()
}