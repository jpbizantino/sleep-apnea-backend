import * as Joi from 'joi';

export const configSchema = Joi.object({
  PORT: Joi.number().default(3000),

  JWT_SECRET: Joi.string().required(),

  DATABASE_URL: Joi.string().required(),

  EMAIL: {
    FROM: Joi.string().required(),
    HOST: Joi.string().required(),
    PORT: Joi.number().default(465),
    SECURE: Joi.boolean().required().default(true),
    USER: Joi.string().required(),
    PASS: Joi.string().required(),
  },
});
