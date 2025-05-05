import * as Yup from "yup";
import { regexSpacesOrSpecialCharacters } from ".";
import { useTranslation } from "react-i18next";

export const useValidationEventSchema = () => {
  const { t } = useTranslation();

  //! Validate register TMN
  const validationRegisterTMNSchema = Yup.object().shape({
    id: Yup.string()
      .required(t("validation.register.idCardIsRequired"))
      .max(32, t("validation.register.idCardMustBeLessThan32Characters"))
      .matches(regexSpacesOrSpecialCharacters, t("validation.register.idCardCannotContainSpacesOrSpecialCharacters")),
    password: Yup.string()
      .required(t("validation.register.pinIsRequired"))
      .max(32, t("validation.register.pinMustBeLessThan32Characters"))
      .matches(regexSpacesOrSpecialCharacters, t("validation.register.pinCannotContainSpacesOrSpecialCharacters")),
  });
  //! Validate with only point
  const validationRegisterWithOnlyPointSchema = Yup.object().shape({
    id: Yup.string()
      .required(t("validation.register.idCardIsRequired"))
      .max(32, t("validation.register.idCardMustBeLessThan32Characters"))
      .matches(regexSpacesOrSpecialCharacters, t("validation.register.idCardCannotContainSpacesOrSpecialCharacters")),
    date: Yup.date().required(t("validation.register.dateIsRequired")),
  });

  //! Validate register arara
  const validationRegisterAraraSchema = Yup.object().shape({
    pointId: Yup.string()
      .required(t("validation.register.idCardIsRequired"))
      .max(32, t("validation.register.idCardMustBeLessThan32Characters"))
      .matches(regexSpacesOrSpecialCharacters, t("validation.register.idCardCannotContainSpacesOrSpecialCharacters")),
    date: Yup.date().required(t("validation.register.dateIsRequired")),
    eMoneyId: Yup.string()
      .max(32, t("validation.register.cryptocurrencyIdMustBeLessThan32Characters"))
      .matches(
        regexSpacesOrSpecialCharacters,
        t("validation.register.cryptocurrencyIdCannotContainSpacesOrSpecialCharacters"),
      ),
    password: Yup.string()
      .max(32, t("validation.register.pinMustBeLessThan32Characters"))
      .matches(regexSpacesOrSpecialCharacters, t("validation.register.pinCannotContainSpacesOrSpecialCharacters")),
  });
  const validationUpdateAraraSchema = Yup.object().shape({
    eMoneyId: Yup.string()
      .max(32, t("validation.register.idCardMustBeLessThan32Characters"))
      .matches(regexSpacesOrSpecialCharacters, t("validation.register.idCardCannotContainSpacesOrSpecialCharacters")),
    password: Yup.string()
      .max(32, t("validation.register.pinMustBeLessThan32Characters"))
      .matches(regexSpacesOrSpecialCharacters, t("validation.register.pinCannotContainSpacesOrSpecialCharacters")),
  });
  return {
    validationRegisterTMNSchema,
    validationRegisterWithOnlyPointSchema,
    validationRegisterAraraSchema,
    validationUpdateAraraSchema,
  };
};
