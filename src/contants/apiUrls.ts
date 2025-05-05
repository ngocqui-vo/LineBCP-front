export const ROOT_URL = `https://mistakes-manual-gold-equation.trycloudflare.com/api/v1`;

export const API_URLS = {
  register: `${ROOT_URL}/users`,
  getUser: (id: string, channel_id: string) => `${ROOT_URL}/users/${id}/user/${channel_id}`,
  registerPoint: `${ROOT_URL}/users/points`,
  getEMoneyUser: (id: string) => `${ROOT_URL}/users/${id}/e-money`,
  registerUserId: (id: number) => `${ROOT_URL}/users/${id}`,
  qa: `${ROOT_URL}/inquiries`,
  deleteRegister: (id: number) => `${ROOT_URL}/users/${id}/unsubscribe`,
  coupons: `${ROOT_URL}/coupons`,
  detailCoupon: (id: number, user_beam_id: string) => `${ROOT_URL}/coupons/${id}/${user_beam_id}`,
  postUserCoupons: `${ROOT_URL}/user-coupons`,
  getPoint: (id: number) => `${ROOT_URL}/users/${id}/point`,
  eMoneyHistories: (id: string) => `${ROOT_URL}/users/${id}/e-money-histories`,
  updateInforUser: (id: string) => `${ROOT_URL}/users/${id}`,
  useCoupon: `${ROOT_URL}/coupon-logs`,
  userCouponsUse: `${ROOT_URL}/user-coupons/use`,
};
