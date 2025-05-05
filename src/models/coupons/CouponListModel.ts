import { IResponseGetListCoupon, IViewCoupon } from "@/services/Coupon/coupon.interface";

export class CouponListModel {
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
  views?: ViewModel[];
  usage_count?: string | number;

  constructor(props: IResponseGetListCoupon) {
    const {
      id,
      code,
      barcode,
      title_1,
      title_2,
      title_3,
      thumbnail,
      image,
      coupon_id,
      content,
      start_date,
      end_date,
      area_id,
      transfer_id,
      company_id,
      total_quantity,
      created_at,
      qr_code,
      is_active,
      views,
      usage_count,
    } = props;
    this.id = id;
    this.code = code;
    this.barcode = barcode;
    this.title_1 = title_1;
    this.title_2 = title_2;
    this.title_3 = title_3;
    this.thumbnail = thumbnail;
    this.image = image;
    this.coupon_id = coupon_id;
    this.content = content;
    this.start_date = start_date;
    this.end_date = end_date;
    this.area_id = area_id;
    this.transfer_id = transfer_id;
    this.company_id = company_id;
    this.total_quantity = total_quantity;
    this.created_at = created_at;
    this.qr_code = qr_code;
    this.is_active = is_active;
    this.views = views?.map((elm) => new ViewModel(elm));
    this.usage_count = usage_count;
  }
  static fromApiResponse(data: IResponseGetListCoupon): CouponListModel {
    return new CouponListModel(data);
  }
}
export class ViewModel {
  id?: number;
  user_id?: number;
  coupon_id?: string;
  created_at?: Date;
  constructor(props: IViewCoupon) {
    const { id, user_id, coupon_id, created_at } = props;
    this.id = id;
    this.user_id = user_id;
    this.coupon_id = coupon_id;
    this.created_at = created_at;
  }
  static fromApiResponse(data: IViewCoupon): ViewModel {
    return new ViewModel(data);
  }
}
