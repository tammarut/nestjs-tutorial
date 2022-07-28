// global types can call directly without import
declare global {
  type Optional<T> = T | null | undefined;
}

export {};
