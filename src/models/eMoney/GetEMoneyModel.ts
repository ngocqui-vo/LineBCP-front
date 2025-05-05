export class GetEMoneyModel {
  point_value?: number;
  wallet_balance: number | undefined;
  card_no?: string;
  card_type_cd?: string;
  card_status?: string;

  constructor(
    point_value?: number,
    wallet_balance?: number,
    card_no?: string,
    card_type_cd?: string,
    card_status?: string,
  ) {
    this.point_value = point_value;
    this.wallet_balance = wallet_balance;
    this.card_no = card_no;
    this.card_type_cd = card_type_cd;
    this.card_status = card_status;
  }
  static fromApiResponse(data: any): GetEMoneyModel {
    const { point_value, wallet_balance, card_no, card_type_cd, card_status } = data;
    return new GetEMoneyModel(point_value, wallet_balance, card_no, card_type_cd, card_status);
  }
}
