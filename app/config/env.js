const env = {
    database: 'mvc_app',
    username: 'testuser',
    password: 'poop',
    host: '192.168.1.251',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
