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
    sendinblue: {
        // eslint-disable-next-line max-len
        apiKey: process.env.EMAIL_API_KEY || "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",
        apiPartnerKey: "" || "YOUR-PARTNER-API-KEY",
        templateId: process.env.EMAIL_TEMPLATE_ID || "1",
    }
});

export default config;
