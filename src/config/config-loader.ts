export const configLoader = () => ({
  DATABASE_URL: process.env.DATABASE_URL,

  JWT_SECRET: process.env.JWT_SECRET || 'zjP9h6ZI5LoSKCRj',

  PORT: parseInt(process.env.PORT, 10),

  EMAIL_FROM: process.env.EMAIL_FROM,

  EMAIL_HOST: process.env.EMAIL_HOST,

  EMAIL_PORT: parseInt(process.env.EMAIL_PORT),

  EMAIL_SECURE: process.env.EMAIL_SECURE === 'true' ? true : false,

  EMAIL_USER: process.env.EMAIL_USER,

  EMAIL_PASS: process.env.EMAIL_PASS,
});
