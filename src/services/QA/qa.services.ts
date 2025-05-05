import httpService from "../httpServices";
import { API_URLS } from "@/contants/apiUrls";
import { IParamsGetListQA } from "./qa.interface";

class QAServices {
  getListQA(params: IParamsGetListQA) {
    return httpService.get(API_URLS.qa, { params });
  }
}

export default new QAServices();
