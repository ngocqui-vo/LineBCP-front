import { IResponse } from "src/models/response";

export interface IUser {
  userId: string;
  displayName: string;
}
export type IResponseGetUserDetail = IResponse<IUser>;
