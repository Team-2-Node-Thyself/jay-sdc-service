const { Client } = require('pg');
const client = new Client({
  user: 'root',
  database: 'sdc',
  password: 'SQLiseasy1313',
  port: 5432,
});
await client.connect();

const res = await client.query('SELECT $1:: text as message', ['Hello World!'])
console.log(res.rows[0].message);
await client.end();