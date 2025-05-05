export interface IResponse<T> {
  data: T;
  statusCode: number;
  messages?: string;
  success: boolean;
}
