import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { MoneyType } from "@/contants/common";
import { checkMoneyType } from "@/contants/functions";
import { useValidationEventSchema } from "@/contants/validation";
import FormikField from "@/customField/FormikField";
import InputField from "@/customField/InputFieldProps";
import { showError, showSuccess } from "@/helpers/toast";
import { useAuth } from "@/providers/AuthProvider";
import { RouteBase } from "@/routes/routeUrl";
import { IBodyRequestUpdate, IInitValueRegisterAraraFormik } from "@/services/Register/register.interface";
import registerServices from "@/services/Register/register.services";
import { useGetUserId } from "@/services/user/useGetUserId";
import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import { useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";
export interface IInitialValues {
  eMoneyId: string | number;
  password: string | number;
}
const initialValues = {
  eMoneyId: "",
  password: "",
};
const RegisterAraraCancel = () => {
  //! State
  const { user } = useAuth();
  const { t } = useTranslation("shared");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const { validationUpdateAraraSchema } = useValidationEventSchema();
  const [loading, setLoading] = useState(false);
  const { data, isLoading, refetch } = useGetUserId(user?.userId || "", channelId || "");

  // ! Function
  const updateRegister = async (value: IInitValueRegisterAraraFormik) => {
    const body: IBodyRequestUpdate = {
      point_id: data?.point_id,
      money_id: value?.eMoneyId,
      money_pin: value?.password,
      is_member: true,
      line_channel_id: channelId || "",
      user_beam_id: data.user_beam_id,
      money_type: MoneyType.ARARA,
      line_id: user?.userId || "",
      birthday: data?.birthday,
    };
    try {
      setLoading(true);
      const res = await registerServices.updateRegister(data?.id, body);
      if (res?.status === 201 || (res?.status === 200 && res?.data?.data && res?.data?.success)) {
        setLoading(false);
        showSuccess(t("toast.registerSuccess"));
        refetch && refetch();
        navigate(`${RouteBase.RegisterAraraCancel}?channel_id=${channelId}`);
        if (value && !value?.eMoneyId && !value?.password) {
          navigate(`${RouteBase.RegisterAraraCancel}?channel_id=${channelId}`);
        } else {
          navigate(`${RouteBase.RegisterSuccess}?channel_id=${channelId}`);
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };
  const onSubmit = async (value: IInitValueRegisterAraraFormik) => {
    if (!value) return;
    try {
      if (data && data.line_channel_id === channelId) {
        if (data.is_member && data.line_id === user?.userId) {
          await updateRegister(value);
        }
      }
    } catch (error: any) {
      showError(error);
    }
  };

  const handleDelete = async () => {
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
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  // ! Render
  const content = () => {
    if (isLoading || loading) return <Fragment />;

    return (
      <Fragment>
        <div className="size24W600H288 text-center mb-[12px]">{t("arara.cancel.title")}</div>
        <div className="size14W400H20 text-textGray text-center">{t("registerWithBothCancel.description")}</div>

        <Formik initialValues={initialValues} validationSchema={validationUpdateAraraSchema} onSubmit={onSubmit}>
          {({ handleSubmit, isSubmitting, errors, values }) => {
            console.log(values, "values123");
            return (
              <Form>
                <div className="grid grid-cols">
                  <div className="mt-10">
                    <div className="mt-2">
                      <FormikField
                        component={InputField}
                        name="eMoneyId"
                        placeholder={t("registerWithBoth.cryptocurrencyId")}
                        label={t("registerWithBoth.cryptocurrencyId")}
                      />
                    </div>
                    <div className="mt-4">
                      <FormikField
                        component={InputField}
                        name="password"
                        placeholder={t("register.password")}
                        label={t("register.password")}
                        type="password"
                      />
                    </div>
                  </div>
                  <Button
                    className="my-[36px]"
                    type="submit"
                    isLoading={isSubmitting}
                    onClick={() => handleSubmit()}
                    disabled={Object.keys(errors).length > 0 || (isEmpty(values.money_id) && isEmpty(values.password))}
                  >
                    {t("register.submit")}
                  </Button>
                  <div className="text-center text-dark-dark400 size14W400H20">
                    {t("registerWithBothCancel.confirm")}
                  </div>
                  <Button className="my-[16px]" variant={"destructive"} onClick={handleDelete}>
                    {t("registerSuccess.cancel")}
                  </Button>
                  <div
                    className="text-center text-dark-dark400 size14W400H20"
                    onClick={() => navigate(RouteBase.QAScreen)}
                  >
                    {t("register.questions")}
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </Fragment>
    );
  };

  return (
    <PageWrapper name="RegisterAraraCancelScreen" titlePage="Register Arara cancel" isLoading={isLoading || loading}>
      <Helmet>
        <title>{t("register.titleTMN")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};

export default RegisterAraraCancel;
