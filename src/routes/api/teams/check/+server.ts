import { error, json, type RequestHandler } from "@sveltejs/kit"
import type { Team } from "$lib/database/Team"
import { getTeams, addTeam, deleteTeam, updateTeam } from "$lib/database/teams"

const regexPatterns = {
    name: /^[a-zA-Z0-9 ]{3,50}$/, // Alphanumeric, 3-50 characters
    hometown: /^[a-zA-Z ]{2,50}$/, // Letters and spaces, 2-50 characters
    state: /^[A-Z]{2}$/, // Two uppercase letters
    coach: /^[a-zA-Z ]{3,50}$/, // Letters and spaces, 3-50 characters
};

const validateTeam = (team: Team) => {
    console.log("Validating team:", team);
    const formErrors = { name: "", hometown: "", state: "", coach: "" };

    if (!team.team_name || !regexPatterns.name.test(team.team_name)) {
        formErrors.name = "Invalid name. Must be 3-50 alphanumeric characters.";
    }

    if (!team.hometown || !regexPatterns.hometown.test(team.hometown)) {
        formErrors.hometown = "Invalid hometown. Must be 2-50 letters and spaces.";
    }

    if (!team.state || !regexPatterns.state.test(team.state)) {
        formErrors.state = "Invalid state. Must be 2 uppercase letters.";
    }

    if (!team.coach || !regexPatterns.coach.test(team.coach)) {
        formErrors.coach = "Invalid coach name. Must be 3-50 letters and spaces.";
    }

    // Check if there are any errors
    const hasErrors = Object.values(formErrors).some((error) => error !== "");
    return hasErrors ? formErrors : null;
};

// I dont know what to do with this yet
export const POST: RequestHandler = async ({ request, cookies }) => {
    const token = cookies.get("user-role");
    const team = await request.json();
    
    // console.log("Received team:", team);

    const formErrors = validateTeam(team);

    // console.log("Validation errors:", formErrors);
    if(formErrors == null){
        return json({ success: true });
    }

    return json({ formErrors });
};