import BarcodeCommon from "@/components/barcode";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useAuth } from "@/providers/AuthProvider";
import { useGetUserId } from "@/services/user/useGetUserId";
import { useGet } from "@/stores/useStores";
import { useCallback } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const QRCodeCouponScreen = () => {
  // !State
  const { user } = useAuth();
  const { t } = useTranslation();
  const dataCoupon = useGet("dataDetailCoupon");
  const [searchParams] = useSearchParams();
  const titleCoupon = searchParams.get("title");
  const image = searchParams.get("image");
  const channelId = searchParams.get("channel_id");
  const title = dataCoupon?.title_1 || dataCoupon?.title_2 || dataCoupon?.title_3;
  const { data, isLoading } = useGetUserId(user?.userId || "", channelId || "");

  // !Render
  const content = useCallback(() => {
    if (isLoading) return <Fragment />;
    return (
      <div className="flex flex-col justify-center items-center">
        {!image ? undefined : <img src={image} className="object-cover rounded-[8px] mb-[36px]" />}
        {/* <QRCodeCommon size={260} value="http://facebook.github.io/react/" /> */}
        {data?.user_beam_id ? <BarcodeCommon value={data?.user_beam_id} /> : <Fragment />}
        {titleCoupon ? (
          <div className="justify-center text-black text-center size24W600H288">{titleCoupon}</div>
        ) : (
          <Fragment />
        )}
      </div>
    );
  }, [dataCoupon, isLoading, title, data]);
  return (
    <PageWrapper name="QRCode Coupon Screen" titlePage="QRCode Coupon Screen" isLoading={isLoading}>
      <Helmet>
        <title>{t("coupon.detailTitle")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};
export default QRCodeCouponScreen;
