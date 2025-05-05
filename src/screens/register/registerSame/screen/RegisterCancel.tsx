import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { checkMoneyType } from "@/contants/functions";
import { showError, showSuccess } from "@/helpers/toast";
import { useAuth } from "@/providers/AuthProvider";
import { RouteBase } from "@/routes/routeUrl";
import registerServices from "@/services/Register/register.services";
import { useGetUserId } from "@/services/user/useGetUserId";
import { Fragment, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const RegisterCancel = () => {
  //! State
  const { user } = useAuth();
  const { t } = useTranslation("shared");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const { data, isLoading, refetch } = useGetUserId(user?.userId || "", channelId || "");
  const [loading, setLoading] = useState(false);

  //! Function
  const onSubmit = async () => {
    try {
      setLoading(true);
      const res = await registerServices.deleteRegister(data?.id);
      if (res?.status === 200 && res?.data?.data && res?.data?.success) {
        setLoading(false);
        showSuccess(t("toast.cancelSuccess"));
        refetch && refetch();
        const res = await registerServices.deleteRegister(data?.id);
        const reRegister = !res?.data?.data?.is_member;
        if (reRegister && data?.money_type) {
          navigate(`${checkMoneyType(data?.money_type)}?channel_id=${channelId}`);
        }
      }
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  //! Render
  const content = () => {
    if (loading || isLoading) return <Fragment />;
    return (
      <div className="flex flex-col justify-center items-center h-full">
        <div className=" mb-[36px]">
          <div className="text-2xl text-center mb-[12px]">{t("registerCancel.title")}</div>
          <div className="text-textGray text-center">{t("registerCancel.description")}</div>
        </div>
        <Button variant={"destructive"} type="submit" className="bg-destructive-color mb-[16px]" onClick={onSubmit}>
          {t("registerSuccess.cancel")}
        </Button>
        <div className="text-center" onClick={() => navigate(RouteBase.QAScreen)}>
          {t("register.questions")}
        </div>
      </div>
    );
  };
  return (
    <PageWrapper name="RegisterScreen" titlePage="Register Cancel" isLoading={isLoading || loading}>
      <Helmet>
        <title>{t("register.titleTMN")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};

export default RegisterCancel;
