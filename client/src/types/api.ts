export type Message = {
  success: boolean;
  message: string;
};

export interface Many<T> {
  count: number;
  rows: T;
}
