import { ICON_SOURCE } from "@/assets";
import BarcodeCommon from "@/components/barcode";
import QRCodeCommon from "@/components/QRCode";
import { Button } from "@/components/ui/button";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet";
import { useCallback, useEffect, useState } from "react";
import { useGetUserId } from "@/services/user/useGetUserId";
import { useAuth } from "@/providers/AuthProvider";
import { useNavigate, useSearchParams } from "react-router-dom";
import { GetEMoneyModel } from "@/models/eMoney/GetEMoneyModel";
import { RouteBase } from "@/routes/routeUrl";
import eMoneyServices from "@/services/EMoney/eMoney.services";
import { showError } from "@/helpers/toast";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ModalNoService from "@/components/modal/ModalNoService";
import ModalNoEmoney from "@/components/modal/ModalNoEmoney";

const BarcodeEMoneyScreen = () => {
  // !State
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [balance, setBalance] = useState<GetEMoneyModel>();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const { data, isLoading } = useGetUserId(user?.userId || "", channelId || "");
  const [loading, setLoading] = useState(false);
  const moneyType = searchParams.get("type");

  const formattedWalletBalance = balance?.wallet_balance
    ? new Intl.NumberFormat("en-US").format(Number(balance?.wallet_balance))
    : 0;

  // ! Function
  const handleRefresh = () => {
    getInforEmoney();
  };

  const handleClick = () => {
    navigate(`${RouteBase.HistoryEMoney}?channel_id=${channelId}`);
  };

  const getInforEmoney = async () => {
    try {
      setLoading(true);
      if (data?.id) {
        const res = await eMoneyServices.postDetailEMoney(data?.id);
        if (res?.data?.data && res?.status === (201 | 200) && res?.data?.success) {
          setLoading(false);
          setBalance(res?.data?.data);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  // !Effect
  useEffect(() => {
    if (data?.user_beam_id && data.is_member && data?.line_channel_id === channelId) {
      getInforEmoney();
    }
  }, [data, channelId]);

  // ! Render
  const renderBarcodeEMoney = () => {
    return (
      <Fragment>
        <div className="flex flex-col justify-center items-center ">
          {data?.line_channel.image ? (
            <img src={data?.line_channel.image} className="object-fill rounded-[8px] mb-[16px] w-full" />
          ) : (
            <Fragment />
          )}
          {data?.user_beam_id ? <BarcodeCommon value={data?.user_beam_id} /> : <Fragment />}
          {data?.user_beam_id ? <QRCodeCommon size={260} value={data?.user_beam_id} /> : <Fragment />}
          <div className="flex flex-1 w-full justify-between mt-[36px]">
            <div className="text-secondary-secondary300 size14W400H196">{t("eMoney.eMoneyBalance")}</div>
            <div className="flex flex-1 justify-end items-center">
              <div className="flex mr-[12px] items-center">
                <div className="size24W600H288 text-dark-dark100">{formattedWalletBalance}</div>
                <div className="ml-[4px] text-dark-dark100 size14W600H192">{t("eMoney.history.unit")}</div>
              </div>
              <img onClick={handleRefresh} src={ICON_SOURCE.REFRESH} className="h-[16px] w-[16px]" />
            </div>
          </div>
        </div>
        <div className="w-full mt-[36px]">
          <Button onClick={handleClick}>{t("eMoney.history.title")}</Button>
        </div>
      </Fragment>
    );
  };
  const content = useCallback(() => {
    if (isLoading || loading) return <Fragment />;
    if (
      data?.user_beam_id &&
      data.is_member &&
      data?.line_channel_id === channelId &&
      !data.money_id &&
      !data.money_pin
    )
      return <ModalNoEmoney channelId={channelId} />;
    return data?.user_beam_id && data.is_member && data?.line_channel_id === channelId ? (
      renderBarcodeEMoney()
    ) : (
      <ModalNoService channelId={channelId} moneyType={moneyType} />
    );
  }, [data, renderBarcodeEMoney, channelId, loading, isLoading]);

  return (
    <PageWrapper name="Barcode Emoney" titlePage="Barcode Emoney" isLoading={isLoading || loading}>
      <Helmet>
        <title>{t("arara.eMoney.title")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};
export default BarcodeEMoneyScreen;
