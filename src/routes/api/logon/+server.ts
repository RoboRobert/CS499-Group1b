import { json, type RequestHandler } from '@sveltejs/kit';
import { addLogin, getLoginRole } from '$lib/logon/logins';



export const GET: RequestHandler = async ({request}) => {
	console.log(request);
	const url = new URL(request.url);
	const username = url.searchParams.get('username'); // Get the 'gameid' query paramete
	const password = url.searchParams.get('password'); // Get the 'gameid' query parameter
	const role = await getLoginRole(username, password);
	return json({role})
}

// export async function POST(event) {
// 	const { user, pass } = await event.request.json();
// 	const addedLogin = await addLogin({user, pass});

// 	return json(addedLogin);
// }