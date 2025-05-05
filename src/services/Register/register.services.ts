import { AxiosRequestConfig } from "axios";
import { IBodyPostRegister, IBodyPostRegisterPoint, IBodyRegisterTMN, IBodyRequestUpdate } from "./register.interface";
import httpService from "../httpServices";
import { API_URLS } from "@/contants/apiUrls";

class RegisterService {
  postRegister(body: IBodyPostRegister, configs?: AxiosRequestConfig) {
    return httpService.post(API_URLS.register, body, configs);
  }
  postRegisterPoint(body: IBodyPostRegisterPoint, configs?: AxiosRequestConfig) {
    return httpService.post(API_URLS.registerPoint, body, configs);
  }
  getEMoney(id: number) {
    return httpService.get(API_URLS.getEMoneyUser(id));
  }
  getUser(id: string, channel_id: string) {
    return httpService.get(API_URLS.getUser(id, channel_id));
  }
  deleteRegister(id: number) {
    return httpService.delete(API_URLS.deleteRegister(id));
  }
  updateRegister(id: string, body: IBodyRequestUpdate) {
    return httpService.patch(API_URLS.updateInforUser(id), body);
  }
  postRegisterTMN(body: IBodyRegisterTMN, configs?: AxiosRequestConfig) {
    return httpService.post(API_URLS.registerTMN, body, configs);
  }
}

export default new RegisterService();
