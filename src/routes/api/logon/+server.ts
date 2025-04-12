import { json, type RequestHandler } from '@sveltejs/kit';
import { addLogin, getLoginRole, getLoginPass } from '$lib/logon/logins';



export const GET: RequestHandler = async ({request, cookies}) => {
	console.log(request);
	const url = new URL(request.url);
	const username = url.searchParams.get('username');
	const password = url.searchParams.get('password');
	const form = url.searchParams.get('form');
	let role: string | null = null; // Declare role outside of the if statement
	if (form == "signin") {
		role = await getLoginRole(username, password);
	}
	else if (form == "register") {
		role = url.searchParams.get('role');
	}
	

	//SignIn action
	if (form == "signin") {
			//check if the user exists
			console.log("role: ", role);
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
						return json({ 
							logsuccess: true, 
							message: "Login successful.",
							username: username,
							password: password,
							role: role
						 });
					}
					else {// If the user doesn't exist, return a failure message
						return json({ 
							logsuccess: false, 
							message: "Incorrect username or password.",
							username: username,
							password: password,
							role: role
						});
					}
			  
			}
			else{// If authentication fails, return a failure message
				return json({ 
						logsuccess: false, 
						message: "Enter a valid username and password.",
						username: username,
						password: password,
						role: role
					});
			}
		}
	//Register action
	else if (form == "register") {
		//add login
        if (await getLoginPass(username, password) == null && password != "null") {
            addLogin({user: username, pass: password, role: role});
            return json({ 
                regsuccess: true, 
                message: "User registered successfully.",
                username: username,
                password: password,
                role: role
            });
        }
        else {
            return json({ 
                regsuccess: false, 
                message: "User already exists.",
                username: username,
                password: password,
                role: role
             });
        }
	}
	else if (form == "signout") {
		// Clear the cookies on signout
		cookies.delete('user-role', { path: '/' });
		cookies.delete('username', { path: '/' });
		return json({ 
			success: true, 
			message: "Signout successful."
		 });
	}
}

	

//Remnants of old API
// export async function POST(event) {
// 	const { user, pass, routes} = await event.request.json();
// 	const addedLogin = await addLogin({user, pass, routes});

// 	return json(addedLogin);
// }