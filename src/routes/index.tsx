import BarcodeEMoneyScreen from "@/screens/barcodeEMoney";
import BarcodePointScreen from "@/screens/barcodePoint";
import BarcodeTMNScreen from "@/screens/barcodeTMN";
import CallbackScreen from "@/screens/callback";
import DetailCouponScreen from "@/screens/coupon/screen/DetailCoupon";
import QRCodeCouponScreen from "@/screens/coupon/screen/QRCodeCoupon";
import HomePageScreen from "@/screens/homepage";
import QAScreen from "@/screens/qa";
import React from "react";
import { RouteBase } from "./routeUrl";
import RegisterWithOnlyPoint from "@/screens/register/registerWithOnlyPoint";
import RegisterCancel from "@/screens/register/registerSame/screen/RegisterCancel";
import CouponScreen from "@/screens/coupon";
import RegisterTMN from "@/screens/register/registerTMN";
import RegisterSuccess from "@/screens/register/registerSame/screen/RegisterSuccess";
import HistoryEMoney from "@/screens/historyEMoney";
import RegisterArara from "@/screens/register/registerArara";
import RegisterAraraCancel from "@/screens/register/registerArara/screen/RegisterAraraCancel";

interface Route {
  name: string;
  path: string;
  exact?: boolean;
  component: typeof React.Component | React.FC;
}
export const routes: Route[] = [
  {
    path: RouteBase.Home,
    exact: true,
    name: "HomePageScreen",
    component: HomePageScreen,
  },
  {
    path: RouteBase.RegisterTMN,
    exact: true,
    name: "register",
    component: RegisterTMN,
  },
  {
    path: RouteBase.CouponScreen,
    exact: true,
    name: "CouponScreen",
    component: CouponScreen,
  },
  {
    path: RouteBase.HistoryEMoney,
    exact: true,
    name: "HistoryEMoney",
    component: HistoryEMoney,
  },
  {
    path: RouteBase.RegisterSuccess,
    exact: true,
    name: "RegisterSuccess",
    component: RegisterSuccess,
  },
  {
    path: RouteBase.RegisterCancel,
    exact: true,
    name: "RegisterCancel",
    component: RegisterCancel,
  },
  {
    path: RouteBase.RegisterArara,
    exact: true,
    name: "RegisterArara",
    component: RegisterArara,
  },
  {
    path: RouteBase.RegisterAraraCancel,
    exact: true,
    name: "RegisterAraraCancel",
    component: RegisterAraraCancel,
  },
  {
    path: RouteBase.QAScreen,
    exact: true,
    name: "QAScreen",
    component: QAScreen,
  },
  {
    path: RouteBase.BarcodePointScreen,
    exact: true,
    name: "BarcodePointScreen",
    component: BarcodePointScreen,
  },
  {
    path: RouteBase.BarcodeEMoneyScreen,
    exact: true,
    name: "BarcodeEMoneyScreen",
    component: BarcodeEMoneyScreen,
  },
  {
    path: RouteBase.DetailCouponScreen,
    exact: true,
    name: "DetailCouponScreen",
    component: DetailCouponScreen,
  },
  {
    path: RouteBase.QRCodeCouponScreen,
    exact: true,
    name: "QRCodeCouponScreen",
    component: QRCodeCouponScreen,
  },
  {
    path: RouteBase.BarcodeTMN,
    exact: true,
    name: "BarcodeTMNScreen",
    component: BarcodeTMNScreen,
  },
  {
    path: RouteBase.callback,
    exact: true,
    name: "BarcodeTMNScreen",
    component: CallbackScreen,
  },
  {
    path: RouteBase.RegisterWithOnlyPoint,
    exact: true,
    name: "RegisterWithOnlyPoint",
    component: RegisterWithOnlyPoint,
  },
];
