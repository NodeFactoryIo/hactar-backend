const env = process.env;

/**
 * Stores all env configurations and their default values.
 */
const config = Object.freeze({
    db: {
        database: process.env.DB_NAME || "nodefactory",
        define: {
            underscored: true,
        },
        dialect: process.env.DB_DIALECT || "postgres",
        host: process.env.DB_HOST || "db",
        password: process.env.DB_PASSWORD || "nodefactory",
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || "nodefactory",
    },
    env: process.env.NODE_ENV || "dev",
    port: env.SERVER_PORT || 3000,
    jwtKey: process.env.JWT_KEY || "nodefactory",
    jwtExpiry: process.env.JWT_EXPIRY || '24h',
    rewardAmount: process.env.REWARD_AMOUNT || 5
});

export default config;
