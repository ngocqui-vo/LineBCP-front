import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { MoneyType } from "@/contants/common";
import { useValidationEventSchema } from "@/contants/validation";
import DateTimePicker from "@/customField/DateTimePicker";
import FormikField from "@/customField/FormikField";
import InputField from "@/customField/InputFieldProps";
import { showError, showSuccess } from "@/helpers/toast";
import { useAuth } from "@/providers/AuthProvider";
import { RouteBase } from "@/routes/routeUrl";
import {
  IBodyPostRegister,
  IBodyRequestUpdate,
  IInitValueRegisterAraraFormik,
} from "@/services/Register/register.interface";
import registerServices from "@/services/Register/register.services";
import { useGetUserId } from "@/services/user/useGetUserId";
import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const initialValues = {
  pointId: "",
  password: "",
  date: "",
  eMoneyId: "",
};
const RegisterArara = () => {
  //! State
  const { t } = useTranslation("shared");
  const navigate = useNavigate();

  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const { data, isLoading, refetch } = useGetUserId(user?.userId || "", channelId || "");
  const [loading, setLoading] = useState(false);
  const { validationRegisterAraraSchema } = useValidationEventSchema();

  //! Function
  const postRegister = async (value: IInitValueRegisterAraraFormik) => {
    const body: IBodyPostRegister = {
      point_id: value?.pointId,
      money_id: value?.eMoneyId,
      is_member: true,
      line_channel_id: channelId || "",
      money_pin: value?.password,
      name: user?.displayName || "",
      line_id: user?.userId || "",
      user_beam_id: value?.pointId,
      money_type: MoneyType.ARARA,
      birthday: value.date,
    };
    try {
      setLoading(true);
      const res = await registerServices.postRegister(body);
      if (res?.status === 201 || (res?.status === 200 && res?.data?.data && res?.data?.success)) {
        setLoading(false);
        showSuccess(t("toast.registerSuccess"));
        refetch && refetch();
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
  const updateRegister = async (value: IInitValueRegisterAraraFormik) => {
    const body: IBodyRequestUpdate = {
      point_id: value?.pointId,
      money_id: value?.eMoneyId,
      money_pin: value?.password,
      is_member: true,
      line_channel_id: channelId || "",
      user_beam_id: value?.pointId,
      money_type: MoneyType.ARARA,
      line_id: user?.userId || "",
      birthday: value.date,
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
    try {
      if (data && data?.line_channel_id === channelId) {
        if (!data.is_member && data.line_id === user?.userId) {
          return updateRegister(value);
        }
        if (data.line_id !== user?.userId) {
          return postRegister(value);
        }
      }
      return postRegister(value);
    } catch (error: any) {
      showError(error);
    }
  };
  // !Effect
  useEffect(() => {
    if (data?.user_beam_id && data.is_member && data?.line_channel_id === channelId) {
      if (!data.money_id && !data.money_pin) {
        navigate(`${RouteBase.RegisterAraraCancel}?channel_id=${channelId}`);
      } else {
        navigate(`${RouteBase.RegisterCancel}?channel_id=${channelId}`);
      }
    }
  }, [data, channelId]);

  //! Render
  const content = () => {
    if (isLoading || loading) return <Fragment />;
    return (
      <Fragment>
        <div className="grid grid-cols gap-[12px]">
          <div className="size24W600H288 text-center">{t("registerWithOnlyPoint.title")}</div>
          <div className="size14W400H20 text-textGray text-center">{t("register.description")}</div>
        </div>
        <Formik initialValues={initialValues} validationSchema={validationRegisterAraraSchema} onSubmit={onSubmit}>
          {({ handleSubmit, errors, values, isSubmitting }) => {
            console.log(values, "values000");
            return (
              <Form>
                <div className="grid grid-cols gap-[16px] mt-10 mb-[36px]">
                  <FormikField
                    component={InputField}
                    name="pointId"
                    placeholder={t("register.id")}
                    label={t("register.id")}
                  />

                  <FormikField
                    component={DateTimePicker}
                    name="date"
                    label={t("register.date")}
                    placeholder={t("register.formatDate")}
                  />
                  <FormikField
                    component={InputField}
                    name="eMoneyId"
                    placeholder={t("registerWithBoth.cryptocurrencyId")}
                    label={t("registerWithBoth.cryptocurrencyId")}
                  />
                  <FormikField
                    component={InputField}
                    name="password"
                    placeholder={t("register.password")}
                    label={t("register.password")}
                    type="password"
                  />
                </div>
                <div className="text-center flex-1 mb-[16px]">
                  <Button
                    onClick={() => handleSubmit()}
                    disabled={Object.keys(errors).length > 0 || (isEmpty(values.pointId) && isEmpty(values.date))}
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    {t("register.submit")}
                  </Button>
                </div>
                <div
                  onClick={() => navigate(RouteBase.QAScreen)}
                  className="text-center size14W400H196 text-dark-dark200"
                >
                  {t("register.questions")}
                </div>
              </Form>
            );
          }}
        </Formik>
      </Fragment>
    );
  };

  return (
    <PageWrapper name="RegisterAraraScreen" titlePage="Register Arara" isLoading={isLoading || loading}>
      <Helmet>
        <title>{t("register.titleTMN")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};
export default RegisterArara;
