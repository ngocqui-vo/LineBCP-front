import { RouteBase } from "@/routes/routeUrl";

export const richMenu = [
  {
    name: "register",
    id: 1,
    // path: `${RouteBase.RegisterWithOnlyPoint}?channel_id=2006392495`,
    // path: `${RouteBase.RegisterTMN}?channel_id=2006392477&type=tmn`,
    path: `${RouteBase.RegisterArara}?channel_id=2007241185&type=arara`,
  },
  {
    name: "barcode TMN",
    id: 2,
    // path: `${RouteBase.BarcodeTMN}?channel_id=2006392477&type=tmn`,
    path: `${RouteBase.BarcodePointScreen}?channel_id=2007241185&type=arara`,
  },
  {
    name: "e money",
    id: 3,
    path: `${RouteBase.BarcodeEMoneyScreen}?channel_id=2007241185&type=arara`,
  },
  {
    name: "coupon",
    id: 5,
    path: `${RouteBase.CouponScreen}?channel_id=2007241185&type=tmn`,
  },
];
