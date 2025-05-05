import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { Button } from "@/components/ui/button";
import { MoneyType } from "@/contants/common";
import { useValidationEventSchema } from "@/contants/validation";
import FormikField from "@/customField/FormikField";
import InputField from "@/customField/InputFieldProps";
import { showError, showSuccess } from "@/helpers/toast";
import { useAuth } from "@/providers/AuthProvider";
import { RouteBase } from "@/routes/routeUrl";
import {
  IBodyPostRegister,
  IBodyRequestUpdate,
  IInitValueRegisterFormik,
} from "@/services/Register/register.interface";
import registerServices from "@/services/Register/register.services";
import { useGetUserId } from "@/services/user/useGetUserId";
import { Form, Formik } from "formik";
import { isEmpty } from "lodash";
import { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";

const initialValues: IInitValueRegisterFormik = {
  id: "",
  password: "",
};
const RegisterTMN = () => {
  // !State
  const { user } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  const { data, isLoading, refetch } = useGetUserId(user?.userId || "", channelId || "");
  const [loading, setLoading] = useState(false);
  const { validationRegisterTMNSchema } = useValidationEventSchema();

  // !Function
  const postRegister = async (value: any) => {
    const body: IBodyPostRegister = {
      point_id: value?.id,
      money_id: value?.id,
      is_member: true,
      line_channel_id: channelId || "",
      money_pin: value?.password,
      name: user?.displayName || "",
      line_id: user?.userId || "",
      user_beam_id: value?.id,
      money_type: MoneyType.TMN,
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
      money_id: value?.id,
      money_pin: value?.password,
      is_member: true,
      line_channel_id: channelId || "",
      user_beam_id: value?.id,
      money_type: MoneyType.TMN,
      line_id: user?.userId || "",
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

  const onSubmit = async (value: IInitValueRegisterFormik) => {
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

  // !Render
  const content = () => {
    if (isLoading || loading) return <Fragment />;
    return (
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationRegisterTMNSchema}
        onSubmit={onSubmit}
      >
        {({ errors, isSubmitting, values }) => {
          return (
            <Form>
              <div className="text-dark-dark200 size24W600H288 text-center mb-[12px]">{t("register.title")}</div>
              <div className="text-textGray text-center">{t("register.description")}</div>
              <div className="mt-10 mb-[36px]">
                <div className="mb-[16px]">
                  <FormikField
                    component={InputField}
                    name="id"
                    placeholder={t("register.id")}
                    label={t("register.id")}
                  />
                </div>
                <FormikField
                  component={InputField}
                  name="password"
                  placeholder={t("register.password")}
                  label={t("register.password")}
                  type="password"
                />
              </div>
              <div className="text-center mb-[16px]">
                <Button
                  disabled={Object.keys(errors).length > 0 || (isEmpty(values.password) && isEmpty(values.id))}
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
    );
  };

  return (
    <PageWrapper name="RegisterSameScreen" titlePage="Register" isLoading={isLoading}>
      <Helmet>
        <title>{t("register.titleTMN")}</title>
      </Helmet>
      {content()}
    </PageWrapper>
  );
};
export default RegisterTMN;
