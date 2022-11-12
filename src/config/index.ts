import Joi from 'joi';

// export function loadConfigsFromEnv() {
//   return {
//     DATABASE: {
//       HOST: process.env.DATABASE_HOST,
//       PORT: Number.parseInt(process.env.DATABASE_PORT),
//       USERNAME: process.env.DATABASE_USERNAME,
//       PASSWORD: process.env.DATABASE_PASSWORD,
//       DB_NAME: process.env.DATABASE_NAME,
//     },
//   } as const;
// }

enum Environment {
  DEVELOPMENT = 'development',
  PRODUCTION = 'production',
  LOCAL = 'local',
  TEST = 'test',
}

export interface ConfigSchema {
  readonly NODE_ENV: string;
  readonly PORT: number;
  readonly DATABASE_HOST: string;
  readonly DATABASE_PORT: string;
  readonly DATABASE_USERNAME: string;
  readonly DATABASE_PASSWORD: string;
  readonly DATABASE_NAME: string;
}

export const CONFIG_SCHEMA = Joi.object<Readonly<ConfigSchema>>({
  // ───────── NodeJS ─────────
  //   NODE_ENV: Joi.string().required().valid('production', 'development', 'local', 'test'),
  NODE_ENV: Joi.string()
    .required()
    .valid(...Object.values(Environment)),
  PORT: Joi.number().required(),

  // ───────── Database ─────────
  DATABASE_HOST: Joi.string().required(),
  DATABASE_PORT: Joi.number().required(),
  DATABASE_USERNAME: Joi.string().required(),
  DATABASE_PASSWORD: Joi.string().required(),
  DATABASE_NAME: Joi.string().required(),
});
