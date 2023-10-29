export const configLoader = () => ({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET || 'zjP9h6ZI5LoSKCRj',
  PORT: parseInt(process.env.PORT, 10),
});
