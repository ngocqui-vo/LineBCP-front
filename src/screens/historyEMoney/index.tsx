import PageWrapper from "@/components/PageWrapper/PageWrapper";
import ItemHistoryEMoney from "./component/ItemHistory";
import ScrollWrapper from "@/components/scrollWrapper/ScrollWrapper";
import EmptyComponent from "@/components/empty/EmptyComponent";
import { useTranslation } from "react-i18next";
import eMoneyServices from "@/services/EMoney/eMoney.services";
import { useGetUserId } from "@/services/user/useGetUserId";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useState } from "react";
import { showError } from "@/helpers/toast";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { HistoryModel } from "@/models/eMoney/GetHistoryModel";

const HistoryEMoney = () => {
  // !State
  const { t } = useTranslation();
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const { data, isLoading } = useGetUserId(user?.userId || "", channelId || "");

  const [loading, setLoading] = useState(false);
  const [dataHistory, setDataHistory] = useState<HistoryModel[]>([]);

  // ! Function
  const getHistory = async () => {
    const body = {
      limit: 50,
      offset: 0,
    };
    try {
      setLoading(true);
      const res = await eMoneyServices.postEMoneyHistories(data?.id, body);
      if (res?.data?.data && res?.status === (201 | 200) && res?.data?.success) {
        setLoading(false);
        setDataHistory(res?.data?.data);
      }
      setLoading(false);
    } catch (error) {
      showError(error);
      setLoading(false);
    }
  };

  // !Effect
  useEffect(() => {
    if (data?.id) {
      getHistory();
    }
  }, [data?.id]);

  // ! Render
  return (
    <PageWrapper name="HistoryEMoney" titlePage={t("eMoney.history.historyEMoney")} isLoading={isLoading || loading}>
      <Helmet>
        <title> {t("eMoney.history.historyEMoney")}</title>
      </Helmet>
      {dataHistory && dataHistory.length ? (
        <ScrollWrapper onScrollEnd={() => {}}>
          {dataHistory.map((item: HistoryModel, idx: number) => {
            return <ItemHistoryEMoney key={idx} data={item} />;
          })}
          <div className="size22W400H16 text-disable-disable200 text-center mt-[16px] ">
            {t("eMoney.history.checkLast50Item")}
          </div>
        </ScrollWrapper>
      ) : (
        <EmptyComponent title={t("eMoney.history.noUsageHistory")} subTitle={t("eMoney.history.checkLast50Item")} />
      )}
    </PageWrapper>
  );
};
export default HistoryEMoney;
