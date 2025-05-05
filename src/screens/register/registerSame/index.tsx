import { ICON_SOURCE } from "@/assets";
import Button from "@/components/Client/CommonStyles/Button";
import PageWrapper from "@/components/PageWrapper/PageWrapper";
import DateTimePicker from "@/customField/DateTimePicker";
import FormikField from "@/customField/FormikField";
import InputField from "@/customField/InputFieldProps";
import { showError } from "@/helpers/toast";
import { useAuth } from "@/providers/AuthProvider";
import { RouteBase } from "@/routes/routeUrl";
import { IBodyPostRegister } from "@/services/Register/register.interface";
import registerServices from "@/services/Register/register.services";
import { Form, Formik, FormikHelpers } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";

interface IInitValueFormik {
  id: string;
  password: string;
  date: string;
}

const RegisterSameScreen = () => {
  // !State
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const channelId = searchParams.get("channel_id");
  // const channelId = "888585";

  const { t } = useTranslation("shared");
  const navigate = useNavigate();

  // ! Function
  const initialValues: IInitValueFormik = {
    id: "",
    password: "",
    date: "",
  };

  const validationSchema = Yup.object().shape({
    id: Yup.string().required("Id is required"),
    password: Yup.string().required("Password is required").min(6, "Password must greater than 6 characters"),
    date: Yup.date().required("Date is required"),
  });

  const onSubmit = async (value: IInitValueFormik, formikHelper: FormikHelpers<IInitValueFormik>) => {
    try {
      const bodyToAPI: IBodyPostRegister = {
        name: user?.displayName || "",
        line_id: user?.userId || "",
        point_id: Number(value.id),
        money_id: Number(value.id),
        money_pin: value.password,
        birthday: value.date,
        is_member: true,
        line_channel_id: channelId || "",
      };

      formikHelper.setSubmitting(true);
      const res = await registerServices.postRegister(bodyToAPI);
      formikHelper.setSubmitting(false);
      if (res.data) {
        navigate(RouteBase.RegisterSuccess);
      }
    } catch (error: any) {
      showError(error);
    }
  };
  const handleClose = () => {};
  // const notifySuccess = () => {
  //   toast.success(
  //     <div className="bg-success-success200 rounded-[8px] flex items-center justify-between pt-[16px] pb-[16px] pr-[12px] pl-[12px] mr-[12px] ml-[12px]">
  //       <div className="flex items-center">
  //         <img
  //           src={ICON_SOURCE.TICK_CIRCLE_SUCCESS}
  //           className={"h-[32px] w-[32px]"}
  //           alt={"closeToast"}
  //           onClick={handleClose}
  //         />
  //         <span className="text-success-success300 ml-[12px] ">{t("toast.registerSuccess")}</span>
  //       </div>
  //       <img
  //         src={ICON_SOURCE.CLOSE_SUCCESS}
  //         className={"h-[20px] w-[20px]"}
  //         alt={"deleteToast"}
  //         onClick={handleClose}
  //       />
  //     </div>,
  //     {
  //       autoClose: false,
  //       closeOnClick: true,
  //       icon: false,
  //       closeButton: false,
  //     },
  //   );
  // };
  const notifyFailed = () => {
    toast.error(
      <div className="bg-error-error300 rounded-[8px] flex items-center justify-between pt-[16px] pb-[16px] pr-[12px] pl-[12px] mr-[12px] ml-[12px]">
        <div className="flex items-center">
          <img
            src={ICON_SOURCE.CLOSE_CIRCLE_FAIL}
            className={"h-[32px] w-[32px]"}
            alt={"closeToast"}
            onClick={handleClose}
          />
          <span className="text-error-error400 ml-[12px]">{t("toast.registerSuccess")}</span>
        </div>
        <img src={ICON_SOURCE.CLOSE_FAIL} className={"h-[20px] w-[20px]"} alt={"deleteToast"} onClick={handleClose} />
      </div>,
      {
        autoClose: false,
        closeOnClick: true,
        icon: false,
        closeButton: false,
      },
    );
  };

  // ! Render
  return (
    <PageWrapper name="RegisterSameScreen" titlePage="Register" isLoading={false}>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <div className="size24W600H288 text-center mb-[12px]">{t("register.title")}</div>
      <div className="size14W400H20 text-textGray text-center">{t("register.description")}</div>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ errors, isSubmitting }) => {
          return (
            <Form>
              <div className="mt-10 mb-[36px]">
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
                    component={InputField}
                    name="password"
                    placeholder={t("register.password")}
                    label={t("register.password")}
                    type="password"
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

              <div className="text-center mb-[16px]">
                <Button disabled={Object.keys(errors).length > 0} type="submit" isLoading={isSubmitting}>
                  {t("register.submit")}
                </Button>
              </div>
              <div onClick={notifyFailed} className="text-center size14W400H20">
                {t("register.questions")}
              </div>
            </Form>
          );
        }}
      </Formik>
    </PageWrapper>
  );
};
export default RegisterSameScreen;
