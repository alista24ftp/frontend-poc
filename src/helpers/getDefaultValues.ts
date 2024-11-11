import { isNull, isUndefined, Nullable } from "@/types/nullable";

/**
 * Gets the default non-null/non-undefined value from among a list of nullable values.
 * @param fallbackVal Fallback default value to be returned if all other params are null or undefined
 * @param vals Param values that can be nullable
 * @returns First non-null/non-undefined value, or fallback value
 */
export const getDefaultRequiredVal = <T>(
  fallbackVal: T,
  ...vals: Nullable<T>[]
): T => {
  const firstNonNullableIndex = vals.findIndex(
    (val) => !isUndefined(val) && !isNull(val)
  );
  return firstNonNullableIndex === -1
    ? fallbackVal
    : (vals[firstNonNullableIndex] as T);
};

/**
 * Apply an operation to a value when the value is not null/undefined.
 * @param applyFn Operation to apply to the value when the value is not null/undefined
 * @param val A nullable value to apply the operation on (when applicable)
 * @param fallbackVal A fallback value to return when val is null/undefined
 * @returns Result of the applied operation, or the default fallback value
 */
export const applyWhenNotNullable = <T, K>(
  applyFn: (val: T) => K,
  val: Nullable<T>,
  fallbackVal?: K
): Nullable<K> => {
  if (!isUndefined(val) && !isNull(val)) {
    return applyFn(val as T);
  }

  return fallbackVal ?? (val as null | undefined);
};
