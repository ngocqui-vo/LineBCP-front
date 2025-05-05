export type IBodyEMoneyHistory = {
  limit: number;
  offset: number;
};
export interface IHistoryEMoney {
  charge_value_amount_sum: number;
  store_name: string;
  transaction_time: string;
  usage_value_amount_sum: number;
}
