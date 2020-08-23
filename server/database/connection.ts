import knex from 'knex';

const db = knex({
    client: 'pg',
    connection: {
        database: 'patrimonios',
        user: 'postgres',
        password: '0000',
      }
    });

export default db;
