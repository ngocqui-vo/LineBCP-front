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
  IBodyPostRegisterPoint,
  IBodyRequestUpdate,
  IInitValueRegisterWithOnlyFormik,
} from "@/services/Register/register.interface";
import registerServices from "@/services/Register/register.services";
import { useGetUserId } from "@/services/user/useGetUserId";
import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Fragment } from "react/jsx-runtime";

const initialValues = {
  id: "",
  date: "",
};
const RegisterWithOnlyPoint = () => {
  //! State
  const { user } = useAuth();
  const { t } = useTranslation("shared");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const { data, isLoading, refetch } = useGetUserId(user?.userId || "", channelId || "");
  const [loading, setLoading] = useState(false);
  const { validationRegisterWithOnlyPointSchema } = useValidationEventSchema();

  // ! Function
  const postRegister = async (value: any) => {
    const body: IBodyPostRegisterPoint = {
      point_id: value?.id.toString(),
      money_id: undefined,
      is_member: true,
      line_channel_id: channelId || "",
      money_pin: "",
      name: user?.displayName || "",
      line_id: user?.userId || "",
      user_beam_id: value?.id,
      money_type: MoneyType.BEAM,
      birthday: value?.date,
      point_pin: undefined,
    };
    try {
      setLoading(true);
      const res = await registerServices.postRegister(body);
      if (res?.status === 201 || (res?.status === 200 && res?.data?.data && res?.data?.success)) {
        setLoading(false);
        showSuccess(t("toast.registerSuccess"));
        refetch && refetch();
        navigate(`${RouteBase.RegisterSuccess}?channel_id=${channelId}`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };
  const updateRegister = async (value: any) => {
    const body: IBodyRequestUpdate = {
      point_id: value?.id,
      money_id: undefined,
      money_pin: undefined,
      is_member: true,
      line_channel_id: channelId || "",
      user_beam_id: value?.id,
      money_type: MoneyType.BEAM,
      line_id: user?.userId || "",
      birthday: value?.date,
      point_pin: undefined,
    };
    try {
      setLoading(true);
      const res = await registerServices.updateRegister(data?.id, body);
      if (res?.status === 201 || (res?.status === 200 && res?.data?.data && res?.data?.success)) {
        setLoading(false);
        showSuccess(t("toast.registerSuccess"));
        refetch && refetch();
        navigate(`${RouteBase.RegisterSuccess}?channel_id=${channelId}`);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      showError(error);
    }
  };

  const onSubmit = async (value: IInitValueRegisterWithOnlyFormik) => {
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
      navigate(`${RouteBase.RegisterCancel}?channel_id=${channelId}`);
    }
  }, [data, channelId]);

  // ! Render
  const content = () => {
    if (isLoading || loading) return <Fragment />;
    return (
      <div>
        <div className="size24W600H288 text-center mb-[12px]">{t("registerWithOnlyPoint.title")}</div>
        <div className="size14W400H20 text-textGray text-center">{t("register.description")}</div>
        <Formik
          initialValues={initialValues}
          validationSchema={validationRegisterWithOnlyPointSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, errors, values }) => {
            return (
              <Form>
                <div className="grid grid-cols">
                  <div className="mt-10">
                    <div className="mt-2">
                      <FormikField
                        component={InputField}
                        name="id"
                        placeholder={t("register.id")}
                        label={t("register.id")}
                      />
                    </div>
                    <div className="mt-4">
                      <FormikField
                        component={DateTimePicker}
                        name="date"
                        label={t("register.date")}
                        placeholder={t("register.formatDate")}
                      />
                    </div>
                  </div>
                  <Button
                    className="mt-[36px] mb-[16px]"
                    onClick={() => handleSubmit()}
                    disabled={Object.keys(errors).length > 0 || (isEmpty(values.date) && isEmpty(values.id))}
                  >
                    {t("register.submit")}
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
      </div>
    );
  };

  return (
    <PageWrapper name="RegisterSameScreen" titlePage="RegisterWithOnlyPoint" isLoading={isLoading}>
      <Helmet>
        <title>{t("register.titleTMN")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};

export default RegisterWithOnlyPoint;
