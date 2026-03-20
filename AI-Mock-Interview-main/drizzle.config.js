/** @type { import {"drizzle-kit"}.Config} */
export default {
    schema: "./utils/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: 'postgresql://neondb_owner:npg_A6F9lqnMfxOH@ep-wispy-mode-a5qs46pc-pooler.us-east-2.aws.neon.tech/Ai-mocker?sslmode=require',
    }
};