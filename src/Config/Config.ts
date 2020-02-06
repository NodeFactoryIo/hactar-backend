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
    rewardAmount: process.env.REWARD_AMOUNT || 5,
    sendinblue: {
        // eslint-disable-next-line max-len
        apiKey: process.env.EMAIL_API_KEY || "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",
        apiUrl: process.env.EMAIL_API_URL || "https://api.sendinblue.com/v3/smtp/email",
        templateId: process.env.EMAIL_TEMPLATE_ID || "2",
    }
});

export default config;
