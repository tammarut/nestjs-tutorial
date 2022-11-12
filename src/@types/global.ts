import { ConfigSchema } from 'src/config';

// global types can call directly without import
declare global {
  type Optional<T> = T | null | undefined;

  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace NodeJS {
    interface ProcessEnv extends ConfigSchema {
      TZ?: string;
    }
  }
}

export {};
