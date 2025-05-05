import { AxiosRequestConfig } from "axios";
import httpService from "../httpServices";
import { API_URLS } from "@/contants/apiUrls";
import { IBodyCoupon, IBodyCouponLog, IBodyUserCoupons } from "./coupon.interface";

class CouponService {
  getListCoupons(configs?: AxiosRequestConfig) {
    return httpService.get(API_URLS.coupons, configs);
  }
  postCoupon(body: IBodyCoupon, configs?: AxiosRequestConfig) {
    return httpService.post(API_URLS.coupons, body, configs);
  }
  getDetailCoupon(id: number, user_beam_id: string, configs?: AxiosRequestConfig) {
    return httpService.get(API_URLS.detailCoupon(id, user_beam_id), configs);
  }
  postUserCoupons(body: IBodyUserCoupons) {
    return httpService.post(API_URLS.postUserCoupons, body);
  }
  postUseCoupon(body: IBodyCouponLog) {
    return httpService.post(API_URLS.postUserCoupons, body);
  }
  postUserCouponsUse(body: IBodyCouponLog) {
    return httpService.post(API_URLS.userCouponsUse, body);
  }
}
export default new CouponService();
