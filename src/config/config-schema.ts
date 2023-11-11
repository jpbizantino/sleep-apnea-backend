import * as Joi from 'joi';

export const configSchema = Joi.object({
  PORT: Joi.number().default(3000),

  JWT_SECRET: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),

  EMAIL_FROM: Joi.string().required(),

  EMAIL_HOST: Joi.string().required(),

  EMAIL_PORT: Joi.number().default(465),

  EMAIL_SECURE: Joi.boolean().required().default(true),

  EMAIL_USER: Joi.string().required(),

  EMAIL_PASS: Joi.string().required(),

  EMAIL_BCC: Joi.string().required(),
});
