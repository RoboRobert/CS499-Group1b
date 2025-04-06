import type { PageServerLoad } from "./$types";
import type { Actions } from './$types';
import { getLoginPass } from '$lib/logon/logins';
import { getLoginUser } from "$lib/logon/logins";
import { getLoginRole } from "$lib/logon/logins";
import { addLogin } from '$lib/logon/logins';
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
	login: async ({ request, cookies }) => {
        //get the form data
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const role = await getLoginRole(username, password);

        console.log(`Username: ${username}, Password: ${password}, Role: ${role}`); // Log the values for debugging
    
        //check if the user exists
        if (username && password && role) {
            const user = getLoginUser(username);
            if (user != null) {
                if (getLoginPass(password, username) != null) {
                    //const sessionID = '${username}-${role}-${new Date().getTime()}';

                     // Set the session ID and role as cookies
                    //cookies.set('sessionID', sessionID, {
                    //    path: '/',  // The cookie is valid for all paths
                    //    sameSite: 'strict',  // Prevents the cookie from being sent on cross-site requests
                    //    httpOnly: true,  // For security, prevent access to the cookie via JavaScript
                    //    secure: process.env.NODE_ENV === 'production', // Set the secure flag in production
                    //    maxAge: 60 * 60 * 24,  // Cookie expires in 1 day (adjust as needed)
                    //});

                    //Set a cookie for the user's role
                    cookies.set('role', role, {
                        path: '/',  // The cookie is valid for all paths
                        sameSite: 'strict',  // Prevents the cookie from being sent on cross-site requests
                        httpOnly: true,  // For security, prevent access to the cookie via JavaScript
                        secure: process.env.NODE_ENV === 'production', // Set the secure flag in production
                        maxAge: 60 * 60 * 24,  // Cookie expires in 1 day (adjust as needed)
                    });

                    //Set a cookie for the user's username
                    cookies.set('username', username, {
                        path: '/',  // The cookie is valid for all paths
                        sameSite: 'strict',  // Prevents the cookie from being sent on cross-site requests
                        httpOnly: true,  // For security, prevent access to the cookie via JavaScript
                        secure: process.env.NODE_ENV === 'production', // Set the secure flag in production
                        maxAge: 60 * 60 * 24,  // Cookie expires in 1 day (adjust as needed)
                    });

                    // Return success and session ID in the response (if needed for client-side handling)
                    return { success: true, message: "Login successful." };
                }
            }
          
        }
        // If authentication fails, return a failure message
        return { success: false, message: "Invalid credentials or role." };
    },

    //Register action
	register: async ({ request }) => {
        //get the form data
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as string;

        //add login
        addLogin({user: username, pass: password, role: role});
        return { success: true };
	}


} satisfies Actions;