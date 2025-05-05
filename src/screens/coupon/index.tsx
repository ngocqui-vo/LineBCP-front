import { Helmet } from "react-helmet";
import EmptyComponent from "@/components/empty/EmptyComponent";
import { useTranslation } from "react-i18next";
import { useAuth } from "@/providers/AuthProvider";
import { useGetUserId } from "@/services/user/useGetUserId";
import ModalNoService from "@/components/modal/ModalNoService";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import useGetListCoupon from "@/services/Coupon/hooks/useGetListCoupon";
import useFiltersHandler from "@/hooks/useFiltersHandler";
import { useSearchParams } from "react-router-dom";
import { Fragment, useEffect } from "react";
import ScrollWrapper from "@/components/scrollWrapper/ScrollWrapper";
import ItemCoupon from "./components/ItemCoupon";
import { CouponListModel } from "@/models/coupons/CouponListModel";

const CouponScreen = () => {
  // !State
  const { user } = useAuth();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const moneyType = searchParams.get("type");
  const { data, isLoading } = useGetUserId(user?.userId || "", channelId || "");
  const { filters, setFilters } = useFiltersHandler({
    page: 1,
    pageSize: 20,
    user_id: data?.id || "",
  });
  const {
    data: listCoupon,
    hasMore,
    loading: loadingCoupon = false,
    loadingMore = false,
    refetching = false,
  } = useGetListCoupon(filters, { isTrigger: filters.user_id });

  // !Function
  const renderListCoupon = () => {
    return (
      <div className="grid gap-[16px]">
        {listCoupon && listCoupon.length > 0 ? (
          <ScrollWrapper
            onScrollEnd={() => {
              if (hasMore) {
                setFilters((prev: any) => ({
                  ...prev,
                  page: prev.page + 1,
                }));
              }
            }}
          >
            {listCoupon.map((item: CouponListModel, idx: number) => {
              return <ItemCoupon key={idx} data={item} channelId={channelId} />;
            })}
          </ScrollWrapper>
        ) : (
          <EmptyComponent
            className="px-[24px]"
            titleClassName="size24W600H288 mb-[12px]"
            subTitleClassName="size14W400H196"
            title={t("coupon.emptyCoupon")}
            subTitle={t("coupon.continueService")}
          />
        )}
      </div>
    );
  };

  // !Effect
  useEffect(() => {
    if (!data?.id) return;
    setFilters({ ...filters, user_id: data?.id });
  }, [data]);

  // ! Render
  const content = () => {
    if ((isLoading || loadingCoupon) && filters.page === 1) return <Fragment />;
    return data?.is_member && data.line_id ? (
      renderListCoupon()
    ) : (
      <ModalNoService moneyType={moneyType} channelId={channelId} />
    );
  };

  return (
    <PageWrapper
      classNameChildren={listCoupon && listCoupon.length > 0 ? undefined : "flex items-center"}
      className="bg-backgroundColor-qaBackground min-h-full h-auto"
      name="RegisterSameScreen"
      titlePage="Register"
      isLoading={isLoading || loadingCoupon || loadingMore || refetching}
    >
      <div className="bg-backgroundColor-qaBackground">
        <Helmet>
          <title>{t("coupon.title")}</title>
        </Helmet>
        {content()}
      </div>
    </PageWrapper>
  );
};
export default CouponScreen;
