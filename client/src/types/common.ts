export type EmptyObj = Record<string, never>;

export interface Resp<T> {
  data: T;
}
