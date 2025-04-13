import type { PageServerLoad } from "./$types";
import type { Actions } from './$types';
import { getLoginPass } from '$lib/logon/logins';
import { getLoginUser } from "$lib/logon/logins";
import { getLoginRole } from "$lib/logon/logins";
import { addLogin } from '$lib/logon/logins';
import type { Game } from "$lib/database/Sheet";
import { redirect } from "@sveltejs/kit";

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

        //check if the user exists
        if (username && password && role) {
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
                    cookies.set('user-role', role, {
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
                    return { 
                        logsuccess: true, 
                        message: "Login successful.",
                        username: username,
                        password: password,
                        role: role
                     };
                }
                else {// If the user doesn't exist, return a failure message
                    return { 
                        logsuccess: false, 
                        message: "Incorrect username or password.",
                        username: username,
                        password: password,
                        role: role
                    };
                }
          
        }
        else{// If authentication fails, return a failure message
            return { 
                    logsuccess: false, 
                    message: "Enter a username and password.",
                    username: username,
                    password: password,
                    role: role
                };
        }
    },

    //Register action
	register: async ({ request }) => {
        //get the form data
        const formData = await request.formData();
        const username = formData.get('username') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as string;

        //add login
        if (await getLoginPass(username, password) == null && password != "null") {
            addLogin({user: username, pass: password, role: role});
            return { 
                regsuccess: true, 
                message: "User registered successfully.",
                username: username,
                password: password,
                role: role
            };
        }
        else {
            return { 
                regsuccess: false, 
                message: "User already exists.",
                username: username,
                password: password,
                role: role
             };
        }
	},
    setTheme: async ({url, cookies}) => {
        const theme = url.searchParams.get("theme");
        const redirectTo = url.searchParams.get("redirectTo");
        console.log(redirectTo);
    
        if(theme){
          cookies.set("colortheme", theme, {
            path: '/',
            maxAge: 60 *60 * 24*365,
          })
        }
        throw redirect(303, redirectTo ?? '/');
      },


} satisfies Actions;