import { error, json, type RequestHandler } from "@sveltejs/kit"
import type { Player } from "$lib/database/Team"


const regexPatterns = {
    playerName: /^[a-zA-Z ]{2,50}$/, // Letters and spaces, 2-50 characters
    hometown: /^[a-zA-Z ]{2,50}$/, // Letters and spaces, 2-50 characters
    state: /^[A-Z]{2}$/, // Two uppercase letters (e.g., AL, NY)
    playerNumber: /^[0-9]{1,2}$/, // 1-2 digit numbers (0-99)
    position: /^(Attack|Midfield|Defense|Goalie|Faceoff Specialist|Long Stick Midfielder)$/, // Valid positions
    playerClass: /^(Freshman|Sophomore|Junior|Senior)$/, // Valid class values
    heightFeet: /^[0-9]{1}$/, // 1 digit (0-9)
    heightInches: /^[0-9]{1,2}$/, // 1-2 digits (0-11)
    weight: /^[0-9]{1,3}$/, // 1-3 digits (e.g., 100-999 lbs)
    };

const validateTeam = (player: Player) => {
    console.log("Validating team:", player);
    const errors: { [key: string]: string } = {};
    
    if (!regexPatterns.playerName.test(player.player_name)) {
        errors.player_name = "Player name must be 2-50 characters long and contain only letters and spaces.";
      }
      if (!regexPatterns.hometown.test(player.hometown)) {
        errors.hometown = "Hometown must be 2-50 characters long and contain only letters and spaces.";
      }
      if (!regexPatterns.state.test(player.state)) {
        errors.state = "State must be a valid two-letter abbreviation (e.g., AL, NY).";
      }
      if (!regexPatterns.playerNumber.test(player.player_number.toString())) {
        errors.player_number = "Player number must be a 1-2 digit number (0-99).";
      }
      if (!regexPatterns.position.test(player.position)) {
        errors.position = "Position must be one of the following: Attack, Midfield, Defense, Goalie, Faceoff Specialist, Long Stick Midfielder.";
      }
      if (!regexPatterns.playerClass.test(player.player_class)) {
        errors.playerClass = "Class must be one of the following: Freshman, Sophomore, Junior, Senior.";
      }
      if (!regexPatterns.heightFeet.test(player.height_feet.toString())) {
        errors.height = "Height feet must be a single digit (0-9).";
      }
      if (!regexPatterns.heightInches.test(player.height_inches.toString())) {
        errors.height = "Height inches must be a 1-2 digit number (0-11).";
      }
      if (!regexPatterns.weight.test(player.weight.toString())) {
        errors.weight = "Weight must be a 1-3 digit number (e.g., 100-999 lbs).";
      }

    // Check if there are any errors
    const hasErrors = Object.values(errors).some((error) => error !== "");
    return hasErrors ? errors : null;
};

// I dont know what to do with this yet
export const POST: RequestHandler = async ({ request, cookies }) => {
    const token = cookies.get("user-role");
    const player = await request.json();
    
    console.log("Received team:", player);

    const formErrors = validateTeam(player);

    console.log("Validation errors:", formErrors);

    return json({ formErrors });
};