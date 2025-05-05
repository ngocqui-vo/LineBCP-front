import { AxiosRequestConfig } from "axios";
import httpService from "../httpServices";
import { API_URLS } from "@/contants/apiUrls";
import { IBodyEMoneyHistory } from "./eMoney.interface";

class EMoneyService {
  postDetailEMoney(id: string, configs?: AxiosRequestConfig) {
    return httpService.post(API_URLS.getEMoneyUser(id), configs);
  }
  postEMoneyHistories(id: string, body: IBodyEMoneyHistory, configs?: AxiosRequestConfig) {
    return httpService.post(API_URLS.eMoneyHistories(id), body, configs);
  }
}
export default new EMoneyService();
