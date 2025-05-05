import { CommonPagingParams, CommonResponseAPI } from "@/interfaces/common.interface";
import { AxiosResponse } from "axios";

// Request
export interface IParamsGetListQA extends CommonPagingParams {
  company_id?: number;
}

// Response

export interface IResponseGetListQA {
  id?: number;
  question?: string;
  answer?: string;
  company_id?: number;
}

export type IResponseGetListRoute = AxiosResponse<CommonResponseAPI<IResponseGetListQA>>;
