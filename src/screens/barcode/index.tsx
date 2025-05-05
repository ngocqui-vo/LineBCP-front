import { ICON_SOURCE, IMAGE_SOURCE } from "@/assets";
import BarcodeCommon from "@/components/barcode";
import QRCodeCommon from "@/components/QRCode";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import ModalNoService from "@/components/modal/ModalNoService";
import { useGetUserId } from "@/services/user/useGetUserId";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import { RouteBase } from "@/routes/routeUrl";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

const MemberBarcodeScreen = () => {
  // !State
  const { t } = useTranslation();
  const eMoneyBalance = "9,999,999";
  const pointBalance = "9,999,988";
  const existQrCode = false;
  const { user } = useAuth();
  const { data, isLoading } = useGetUserId(user?.userId || "", "");
  const navigate = useNavigate();

  // ! Function
  const handleRefreshEMoney = () => {};
  const handleRefreshPoint = () => {};

  const handleClick = () => {
    navigate(RouteBase.HistoryEMoney);
  };
  const renderBarcodeMember = () => {
    return (
      <div className="px-[24px]">
        <div className="flex flex-col justify-center items-center gap-[36px] ">
          <img src={IMAGE_SOURCE.LOGO_BLUECHIP} />
          <BarcodeCommon value="978156592764" />
          {existQrCode ? <QRCodeCommon size={260} value="http://facebook.github.io/react/" /> : undefined}
          <div className="flex flex-1 w-full items-center">
            <div className="text-secondary-secondary300 size14W400H196">{t("eMoney.eMoneyBalance")}</div>
            <div className="flex flex-1 justify-end items-center">
              <div className="flex mr-[12px] items-center">
                <div className="size24W600H288 text-dark-dark100">{eMoneyBalance}</div>
                <div className="ml-[4px] text-dark-dark100 size14W600H192">{t("eMoney.history.unit")}</div>
              </div>
              <img onClick={handleRefreshEMoney} src={ICON_SOURCE.REFRESH} className="h-[16px] w-[16px]" />
            </div>
          </div>
          <div className="flex flex-1 w-full justify-between ">
            <div className="text-secondary-secondary300 size14W400H196">{t("point.pointBalance")}</div>
            <div className="flex flex-1 justify-end items-center">
              <div className="flex mr-[12px] items-center">
                <div className="size24W600H288 text-dark-dark100">{pointBalance}</div>
                <div className="ml-[4px] text-dark-dark100 size14W600H192">{t("point.unit")}</div>
              </div>
              <img onClick={handleRefreshPoint} src={ICON_SOURCE.REFRESH} className="h-[16px] w-[16px]" />
            </div>
          </div>
          <div className="w-full">
            <Button onClick={handleClick}>{t("register.submit")}</Button>
          </div>
        </div>
      </div>
    );
  };
  // ! Render
  return (
    <PageWrapper name="RegisterSameScreen" titlePage="Register" isLoading={isLoading}>
      <Helmet>
        <title>{t("memberBarcode.header")}</title>
      </Helmet>
      {data?.user_beam_id && data.line_id ? renderBarcodeMember() : <ModalNoService />}
    </PageWrapper>
  );
};
export default MemberBarcodeScreen;
