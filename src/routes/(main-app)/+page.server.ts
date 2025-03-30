import type { PageServerLoad } from "./$types";
import type { Actions } from './$types';
import type { Login } from '$lib/logon/Login';
import { getLoginPass } from '$lib/logon/logins';
import { getLoginUser } from "$lib/logon/logins";
import { addLogin } from '$lib/logon/logins';
import type { Team } from "$lib/database/Team";
import type { Game } from "$lib/database/Sheet";


// Loads in all the teams from the api
export const load: PageServerLoad = async ({ fetch }) => {
    const response = await fetch("/api/games")
    const games: Game[] = await response.json()
    return {  games }
}

//Actions for the page
export const actions = {

    //Login action
	login: async ({ request }) => {
        //get the form data
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
    
        //check if the user exists
        if (username && password) {
          if (getLoginUser(username) != null) {
            if (getLoginPass(password, username) != null) {
              // Successful login logic
              return { success: true };
            }
          }
        }
    },

    //Register action
	register: async ({ request }) => {
        //get the form data
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;

        //add login
        addLogin({user: username, pass: password});
        return { success: true };
	}


} satisfies Actions;