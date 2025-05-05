import ButtonCommon from "@/components/Client/CommonStyles/Button";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { DateTimeFormat } from "@/helpers/common";
import { showError } from "@/helpers/toast";
import { CouponListModel } from "@/models/coupons/CouponListModel";
import { useAuth } from "@/providers/AuthProvider";
import { RouteBase } from "@/routes/routeUrl";
import couponServices from "@/services/Coupon/coupon.services";
import { useGetUserId } from "@/services/user/useGetUserId";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const DetailCouponScreen = () => {
  // !State
  const { user } = useAuth();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const couponId = searchParams.get("coupon_id");
  const channelId = searchParams.get("channel_id");
  const [dataDetail, setDataDetail] = useState<CouponListModel | undefined>(undefined);
  const titleCoupon = dataDetail?.title_1 || dataDetail?.title_2 || dataDetail?.title_3;
  const navigate = useNavigate();
  const { data, isLoading } = useGetUserId(user?.userId || "", channelId || "");
  const [loading, setLoading] = useState(false);
  const formattedDate = moment(dataDetail?.end_date).format(DateTimeFormat.FullYearFormatDashJpn);
  // !Function
  const handleUseCoupon = async () => {
    try {
      const body = {
        user_id: data?.id,
        coupon_id: dataDetail?.coupon_id,
        user_beam_id: data?.user_beam_id,
      };
      setLoading(true);
      const res = await couponServices.postUserCouponsUse(body);
      if (res?.status === 201 || (res?.status === 200 && res?.data?.data && res?.data?.success)) {
        setLoading(false);

        let useQrCode = `${RouteBase.QRCodeCouponScreen}?channel_id=${channelId}`;
        if (titleCoupon) {
          useQrCode += `&title=${titleCoupon}`;
        }
        if (dataDetail?.image) {
          useQrCode += `&image=${dataDetail?.image}`;
        }
        navigate(encodeURI(useQrCode));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  const getDetailCoupon = async () => {
    if (!data?.user_beam_id || !couponId) return;

    try {
      setLoading(true);
      const res = await couponServices.getDetailCoupon(Number(couponId), data?.user_beam_id);
      if (res?.status === 201 || (res?.status === 200 && res?.data?.data && res?.data?.success)) {
        setLoading(false);
        setDataDetail(res?.data?.data);
      }
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  // !Effect
  useEffect(() => {
    getDetailCoupon();
  }, [data?.user_beam_id, couponId]);

  // !Render
  return (
    <PageWrapper name="Detail coupon" titlePage="Detail" isLoading={loading || isLoading}>
      <Helmet>
        <title>{t("coupon.detailTitle")}</title>
      </Helmet>
      <div>
        {dataDetail?.image ? (
          <img src={dataDetail?.image} className="object-fill rounded-[8px] mb-[16px] w-full" />
        ) : (
          <Fragment />
        )}
        <div className="justify-center text-black text-center size24W600H288 mb-[16px] ">{titleCoupon}</div>
        <div className="grid gap-[16px]">
          <div className="text-secondary-secondary600 size14W600H196">商品/販促内容説明文</div>
          <div className="text-secondary-secondary600 size14W600H196">商品/販促内容説明文</div>
          <div className="text-secondary-secondary600 size14W600H196">商品/販促内容説明文</div>
          <div className="flex">
            <div className="text-secondary-secondary600 size14W600H196">有効期間 :</div>
            {formattedDate ? (
              <div className="text-secondary-secondary400 size14W400H196 ml-[4px]">{formattedDate}</div>
            ) : (
              <Fragment />
            )}
          </div>
          <div className="flex">
            <div className="text-secondary-secondary600 size14W600H196">他クーポンとの併用 :</div>
            <div className="text-secondary-secondary400 size14W400H196 ml-[4px]">可</div>
          </div>
          <div className="flex items-center">
            <div className="text-secondary-secondary600 size14W600H196">利用可能回数 :</div>
            <div className="text-secondary-secondary400 size14W400H196 ml-[4px]">{dataDetail?.usage_count}回</div>
          </div>
        </div>
        <div className="w-full mt-[36px]">
          <ButtonCommon onClick={handleUseCoupon}>{t("coupon.useCoupon")}</ButtonCommon>
        </div>
      </div>
    </PageWrapper>
  );
};
export default DetailCouponScreen;
