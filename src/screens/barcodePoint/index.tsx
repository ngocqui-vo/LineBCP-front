import { ICON_SOURCE } from "@/assets";
import BarcodeCommon from "@/components/barcode";
import QRCodeCommon from "@/components/QRCode";
import { useTranslation } from "react-i18next";
import { Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet";
import { useCallback, useEffect, useState } from "react";
import { GetEMoneyModel } from "@/models/eMoney/GetEMoneyModel";
import { useSearchParams } from "react-router-dom";
import { useGetUserId } from "@/services/user/useGetUserId";
import { useAuth } from "@/providers/AuthProvider";
import eMoneyServices from "@/services/EMoney/eMoney.services";
import { showError } from "@/helpers/toast";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ModalNoService from "@/components/modal/ModalNoService";

const BarcodePointScreen = () => {
  // !State
  const { t } = useTranslation();
  const { user } = useAuth();
  const [balance, setBalance] = useState<GetEMoneyModel>();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const moneyType = searchParams.get("type");
  const [loading, setLoading] = useState(false);
  const { data, isLoading } = useGetUserId(user?.userId || "", channelId || "");

  const formattedPointBalance = balance?.point_value
    ? new Intl.NumberFormat("en-US").format(Number(balance?.point_value))
    : 0;
  // ! Function
  const handleRefreshPoint = () => {
    getInforEmoney();
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
    if (data?.is_member && data.line_id) {
      getInforEmoney();
    }
  }, [data]);
  // ! Render
  const renderBarcodePoint = () => {
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
            <div className="text-secondary-secondary300 size14W400H196">{t("point.pointBalance")}</div>
            <div className="flex flex-1 justify-end items-center">
              <div className="flex mr-[12px] items-center">
                <div className="size24W600H288 text-dark-dark100">{formattedPointBalance}</div>
                <div className="ml-[4px] text-dark-dark100 size14W600H192">{t("point.unit")}</div>
              </div>
              <img onClick={handleRefreshPoint} src={ICON_SOURCE.REFRESH} className="h-[16px] w-[16px]" />
            </div>
          </div>
        </div>
      </Fragment>
    );
  };
  const content = useCallback(() => {
    if (isLoading || loading) return <Fragment />;
    return data?.user_beam_id && data.is_member && data?.line_channel_id === channelId ? (
      renderBarcodePoint()
    ) : (
      <ModalNoService channelId={channelId} moneyType={moneyType} />
    );
  }, [data, renderBarcodePoint, channelId, loading, isLoading]);

  return (
    <PageWrapper name="BarcodePointScreen" titlePage="Barcode Point" isLoading={isLoading || loading}>
      <Helmet>
        <title>{t("barcodepoint.title")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};
export default BarcodePointScreen;
