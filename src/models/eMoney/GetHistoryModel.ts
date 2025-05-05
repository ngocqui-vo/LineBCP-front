import { IHistoryEMoney } from "@/services/EMoney/eMoney.interface";

export class HistoryModel {
  charge_value_amount_sum: number;
  store_name: string;
  transaction_time: string;
  usage_value_amount_sum: number;
  constructor(props: IHistoryEMoney) {
    const { charge_value_amount_sum, store_name, transaction_time, usage_value_amount_sum } = props;
    this.charge_value_amount_sum = charge_value_amount_sum;
    this.store_name = store_name;
    this.transaction_time = transaction_time;
    this.usage_value_amount_sum = usage_value_amount_sum;
  }
  static fromApiResponse(data: IHistoryEMoney): HistoryModel {
    return new HistoryModel(data);
  }
}
