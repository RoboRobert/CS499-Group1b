import pg from 'pg'
const { Pool } = pg
import { PGUSER, PGPASSWORD, PGHOST, PGPORT, PGDATABASE } from '$env/static/private'

const pool = new Pool({
  user: PGUSER,
  password: PGPASSWORD,
  host: PGHOST,
  port: parseInt(PGPORT),
  database: PGDATABASE,
});

export default pool;