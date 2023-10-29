import * as Joi from 'joi';

export const configSchema = Joi.object({
  PORT: Joi.number().default(3000),

  JWT_SECRET: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),
});
