import { AxiosRequestConfig } from "axios";
import httpService from "../httpServices";
import { API_URLS } from "@/contants/apiUrls";

class PointService {
  postDetailPoint(id: number, configs?: AxiosRequestConfig) {
    return httpService.post(API_URLS.getPoint(id), configs);
  }
}
export default new PointService();
