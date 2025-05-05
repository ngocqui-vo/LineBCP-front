import { CommonResponseAPI } from "@/interfaces/common.interface";
import { AxiosResponse } from "axios";

export type IBodyCoupon = object;
export type IBodyUserCoupons = object;
export interface IResponseGetListCoupon {
  id?: number;
  code?: null;
  barcode?: string;
  title_1?: string;
  title_2?: string;
  title_3?: string;
  thumbnail?: string;
  image?: string;
  coupon_id?: string;
  content?: string;
  start_date?: Date;
  end_date?: Date;
  area_id?: string;
  transfer_id?: null;
  company_id?: string;
  total_quantity: number;
  created_at?: Date;
  qr_code?: null;
  is_active?: boolean;
  views?: IViewCoupon[];
  usage_count?: string | number;
}
export type IResponseGetListCouponRoute = AxiosResponse<CommonResponseAPI<IResponseGetListCoupon>>;
export type IBodyCouponLog = {
  user_id: string | undefined;
  coupon_id: string | undefined;
  user_beam_id: string | undefined;
};
export interface IViewCoupon {
  id?: number;
  user_id?: number;
  coupon_id?: string;
  created_at?: Date;
}
