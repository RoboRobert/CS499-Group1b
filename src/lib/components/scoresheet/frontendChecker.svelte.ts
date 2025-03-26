// This file contains a Library of functions designed to validate input on the frontend.

import { players, type Time } from "./data.svelte";

export function removeError(target: HTMLInputElement) {
  target.classList.remove("error");
  target.removeAttribute("title");
}

export function addError(target: HTMLInputElement, message: string) {
  target.classList.add("error");
  target.setAttribute("title", message);
}

export function addIDError(elementId: string, message: string) {
  let target = document.getElementById(elementId);

  target.classList.add("error");
  target.setAttribute("title", message);
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
  const mainTarget = event.target as HTMLInputElement;

  mainTarget.classList.remove("error");
  mainTarget.removeAttribute("title");

  if (mainTarget.value == "") {
    return;
  }

  if (!IsNumber(event)) {
    return;
  }

  // Get a snapshot of the state of the player array
  const playerSnapshot = $state.snapshot(players);
}

export function notEmpty(e) {
  let target = e.target as HTMLInputElement;

  if(target.value != "") {
    removeError(target);
  }
  else addError(target, "Team Name Cannot be Empty");
}

// Validates time input
export function readTime(e): Time | null {
  let target = e.target as HTMLInputElement;

  removeError(target);

  if (target.value == "") {
    return null;
  }

  let regex: RegExp = /^(\d{1,2}):(\d{2})$/;
  let matches = target.value.match(regex);
  if (!matches) {
    addError(target, "Please enter a time in the format mm:ss");
    return null;
  }

  let time: Time = {minutes: Number(matches[1]), seconds: Number(matches[2])};
  return time;
}

// Validates time input
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
