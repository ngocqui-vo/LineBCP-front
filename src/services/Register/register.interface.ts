import { MoneyType } from "@/contants/common";

export interface IBodyPostRegister {
  name?: string;
  line_id?: string;
  point_id?: number | string;
  money_id?: number | string;
  money_pin: string;
  birthday?: Date | undefined;
  is_member?: boolean;
  line_channel_id?: string;
  user_beam_id?: string | number;
  money_type?: MoneyType;
}
export interface IBodyRequestUpdate {
  point_id: number | string;
  money_id?: number | string;
  money_pin?: string | number;
  is_member: boolean;
  line_channel_id: string;
  user_beam_id: string | number;
  money_type: MoneyType;
  line_id: string;
  point_pin?: string;
  birthday?: Date | undefined;
}

export interface IBodyPostRegisterPoint {
  name?: string;
  line_id?: string;
  point_id?: number;
  money_id?: number;
  money_pin: string;
  birthday?: Date | undefined;
  is_member?: boolean;
  line_channel_id?: string;
  user_beam_id?: string;
  money_type?: MoneyType;
  point_pin?: string;
}
export interface IBodyRegisterTMN {
  card_no: string;
  pin_cd: string;
  card_information_inquiry_kbn: number;
}
export interface IInitValueRegisterFormik {
  id: string;
  password: string;
}
export interface IInitValueRegisterWithOnlyFormik {
  id: string;
  date: string;
}
export interface IInitValueRegisterAraraFormik {
  pointId: string;
  password: string;
  date: string;
  eMoneyId: string;
}
