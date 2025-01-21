import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { User } from '$lib/UserData';
import * as db from '$lib/db';
 
export const load: PageServerLoad = async ({ params }) => {
	let id = params.slug;

	const res = (await db.pool.query('SELECT * FROM users WHERE id = $1', [id])).rows[0];

	if (res) {
		let user: User = {id: res.id, name: res.name, email: res.email}
		return user;
	}

	error(404, 'Not found');
};