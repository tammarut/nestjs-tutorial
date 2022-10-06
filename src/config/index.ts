export function loadConfigsFromEnv() {
  return {
    DATABASE: {
      HOST: process.env.DATABASE_HOST,
      PORT: Number.parseInt(process.env.DATABASE_PORT),
      USERNAME: process.env.DATABASE_USERNAME,
      PASSWORD: process.env.DATABASE_PASSWORD,
      DB_NAME: process.env.DATABASE_NAME,
    },
  } as const;
}
