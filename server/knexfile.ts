import path from 'path';

module.exports = {
  client: 'pg',

  connection: {
    database: 'patrimonios',
    user: 'postgres',
    password: '0000',
  },

  migrations: {
    directory: path.resolve(__dirname, 'database', 'migrations'),
  },
  
};
