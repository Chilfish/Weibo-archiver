/**
 * Get the return type of a method
 */
export type MethodReturnTypeMap<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => infer R ? R : never
}
