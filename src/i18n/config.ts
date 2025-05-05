import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import sharedEn from "./en/shared.json";
import sharedJp from "./jp/shared.json";

export const KEY_LANG = "lang";
const currentLng = localStorage.getItem(KEY_LANG) || "jp";

export const defaultNS = "shared";

i18next
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: currentLng,
    fallbackLng: "jp",
    debug: true,
    resources: {
      en: {
        shared: sharedEn,
      },
      jp: {
        shared: sharedJp,
      },
    },
    defaultNS,
  });

export default i18next;
