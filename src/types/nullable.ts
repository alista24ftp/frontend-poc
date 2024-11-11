export type RequiredOrNull<T> = T | null;
export type Optional<T> = T | undefined;
export type Nullable<T> = Optional<RequiredOrNull<T>>;

export const isUndefined = <T>(val: T) => {
  return typeof val === "undefined";
};

export const isNull = <T>(val: T) => {
  return val == null && typeof val !== "undefined";
};
