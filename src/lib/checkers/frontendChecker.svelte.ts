// This file contains a Library of functions designed to validate input on the frontend.

import { metaStats } from "$lib/components/scoresheet/data.svelte";

// Object of error checks, with regex and error message to display if failed.
// export const errorChecks: {
//   playerno: {regex: },

// }

export function removeError(target: HTMLInputElement | HTMLElement | Element) {
  target.classList.remove("error");
  target.removeAttribute("title");
}

export function addError(target: any, message: string) {
  target.classList.add("error");
  target.setAttribute("title", message);
}

export function addIDError(elementId: string, message: string) {
  let target = document.getElementById(elementId);

  target.classList.add("error");
  target.setAttribute("title", message);
}

export function removeIDError(elementId: string) {
  let target = document.getElementById(elementId);

  removeError(target);
}

// Checks if the event target value is an integer.
export function IsNumber(event: any): boolean {
  const target = event.target as HTMLInputElement;

  if (isNaN(parseInt(target.value)) && target.value != "") {
    addError(target, "Value must be an integer.");
    return false;
  }

  removeError(target);
  return true;
}

// Iterates through all player elements on the specified side and marks any that are the same.
export function CheckPlayerNumber(event: any, side: number) {
  console.log(event.target.value);
  if (!IsNumber(event)) {
    return;
  }
}

export function readString(e): string | null {
  let target = e.target as HTMLInputElement;

  removeError(target);

  if(target.value == "") {
    return target.value;
  }

  if(target.value.length > 100) {
    addError(target, "String cannot be longer than 100 characters.")
  }

  return target.value;
}

// Validates time input and returns the string
export function readTime(e): string | null {
  let target = e.target as HTMLInputElement;

  removeError(target);

  if(target.value == "") {
    return target.value;
  } 

  let regex: RegExp = /^(\d{1,2}):(\d{2})$/;
  let matches = target.value.match(regex);
  if (!matches) {
    addError(target, "Please enter a time in the format mm:ss");
  }

  return target.value;
}

// Validates player number input
export function readPlayerno(e): number | null {
  let target = e.target as HTMLInputElement;

  removeError(target);

  if (target.value == "") {
    return null;
  }

  let regex: RegExp = /^\d{1,2}$/;
  let matches = target.value.match(regex);
  if (!matches) {
    addError(target, "Please enter a number in the range 0-99");
    return null;
  }

  return Number(matches[0]);
}

// Validates player number input
export function readNumber(e): number | null {
  let target = e.target as HTMLInputElement;

  removeError(target);

  if (target.value == "") {
    return null;
  }

  let regex: RegExp = /^\d{1,2}$/;
  let matches = target.value.match(regex);
  if (!matches) {
    addError(target, "Please enter a number.");
    return null;
  }

  return Number(matches[0]);
}

// Validates goal type
export function readGoalType(e): string | null {
  let target = e.target as HTMLInputElement;

  removeError(target);

  if (target.value == "") {
    return target.value;
  }

  let regex: RegExp = /^[BCFODX]$/;
  let matches = target.value.match(regex);
  if (!matches) {
    addError(target, "Please enter a valid goal type. Valid types are: B, C, F, O, D and X");
  }

  return target.value;
}

function validString(input: string): boolean {
  if(input.length < 100 && input) {
    return true;
  }

  return false;
}

export function checkMetaStat(e) {
  const target = e.target as HTMLInputElement;

  if(validString(metaStats.date) && validString(metaStats.gameStart) && validString(metaStats.scorekeeper)) {
    removeIDError("metaStatsButton");
  }
  
  removeError(target);
  
  if(!validString(target.value)) {
    addIDError("metaStatsButton", "There are errors in the Meta Game Stats." );
    addError(target, "Field cannot be empty or be longer than 100 characters.");
  }
}