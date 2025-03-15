import { json } from '@sveltejs/kit';
import { addLogin } from '$lib/logon/logins';

export async function POST(event) {
	const { user, pass } = await event.request.json();
	const addedLogin = await addLogin({user, pass});

	return json(addedLogin);
}