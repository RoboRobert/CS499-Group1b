import { error, json, type RequestHandler } from "@sveltejs/kit"
import type { Player } from "$lib/database/Team"


const regexPatterns = {
    playerName: /^[a-zA-Z ]{2,50}$/, // Letters and spaces, 2-50 characters
    hometown: /^[a-zA-Z ]{2,50}$/, // Letters and spaces, 2-50 characters
    state: /^[A-Z]{2}$/, // Two uppercase letters (e.g., AL, NY)
    playerNumber: /^(?:[1-9]?[0-9])$/, // 0-99 (allows 0)
    position: /^(Attack|Midfield|Defense|Goalie|Faceoff Specialist|Long Stick Midfielder)$/, // Valid positions
    playerClass: /^(Freshman|Sophomore|Junior|Senior)$/, // Valid class values
    heightFeet: /^[0-9]$/, // 0-9 (single digit, allows 0)
    heightInches: /^(?:0|[1-9]|10|11)$/, // 0-11 (allows 0)
    weight: /^(?:[0-9]{1,3})$/, // 0-999 (allows 0)
};

const validateTeam = (player: Player) => {
    console.log("Validating player:", player);
    const errors: { [key: string]: string } = {};
    
    if (!player.player_name || !regexPatterns.playerName.test(player.player_name)) {
        errors.player_name = "Player name must be 2-50 characters long and contain only letters and spaces.";
      }
      if (!player.hometown || !regexPatterns.hometown.test(player.hometown)) {
        errors.hometown = "Hometown must be 2-50 characters long and contain only letters and spaces.";
      }
      if (!player.state || !regexPatterns.state.test(player.state)) {
        errors.state = "State must be a valid two-letter abbreviation (e.g., AL, NY).";
      }
      if (!player.player_number || !regexPatterns.playerNumber.test(String(player.player_number))) {
        errors.player_number = "Player number must be a 1-2 digit number (0-99).";
      }
      if (!player.position || !regexPatterns.position.test(player.position)) {
        errors.position = "Position must be one of the following: Attack, Midfield, Defense, Goalie, Faceoff Specialist, Long Stick Midfielder.";
      }
      if (!player.player_class || !regexPatterns.playerClass.test(player.player_class)) {
        errors.playerClass = "Class must be one of the following: Freshman, Sophomore, Junior, Senior.";
      }
      if (!player.height_feet || !regexPatterns.heightFeet.test(String(player.height_feet))) {
        errors.height_feet = "Height feet must be a single digit (0-9).";
      }
      if (!player.height_inches || !regexPatterns.heightInches.test(String(player.height_inches))) {
        errors.height_inches = "Height inches must be a 1-2 digit number (0-11).";
      }
      if (!player.weight || !regexPatterns.weight.test(String(player.weight))) {
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
    if(formErrors == null){
        return json({ success: true });
    }

    return json({ formErrors });
};