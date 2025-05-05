import { RouteBase } from "@/routes/routeUrl";
import { MoneyType } from "./common";

export const checkMoneyType = (type: string) => {
  switch (type) {
    case MoneyType.BEAM:
      return RouteBase.RegisterWithOnlyPoint;
    case MoneyType.TMN:
      return RouteBase.RegisterTMN;
    case MoneyType.ARARA:
      return RouteBase.RegisterArara;
  }
};
export const checkType = (type: string) =>
  type.replace(/[a-z]/g, (char) => String.fromCharCode(char.charCodeAt(0) - 32));
