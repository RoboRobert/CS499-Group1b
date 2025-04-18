import postgres from 'postgres'
import { env } from '$env/dynamic/private'

export const sql = postgres({
  user: env.DBUSER,
  password: env.PGPASSWORD,
  host: env.PGHOST,
  port: parseInt(env.PGPORT),
  database: env.PGDATABASE,
});

export const testSQL = postgres({
  user: env.DBUSER,
  password: env.PGPASSWORD,
  host: env.PGHOST,
  port: parseInt(env.PGPORT),
  database: env.PGTESTDATABASE,
});

// const sql = postgres({
//   user: "postgres",
//   password: "test",
//   host: "localhost",
//   port: 5432,
//   database: "template1",
// });

export default sql;