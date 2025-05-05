import { ICON_SOURCE } from "@/assets";
import { isString } from "lodash";
import { toast } from "react-toastify";

export const toastCloseIcons = {
  success: ICON_SOURCE.CLOSE_SUCCESS,
  error: ICON_SOURCE.CLOSE_CIRCLE_FAIL,
};

export const showSuccess = (title: string) => {
  toast.success(
    <div className="bg-success-success200 rounded-[8px] flex items-center justify-between pt-[16px] pb-[16px] pr-[12px] pl-[12px] mr-[12px] ml-[12px]">
      <div className="flex items-center">
        <img src={ICON_SOURCE.TICK_CIRCLE_SUCCESS} className={"h-[32px] w-[32px]"} alt={"closeToast"} />
        <span className="text-success-success300 ml-[12px] ">{title}</span>
      </div>
      <img src={ICON_SOURCE.CLOSE_SUCCESS} className={"h-[20px] w-[20px]"} alt={"deleteToast"} />
    </div>,
    {
      closeOnClick: true,
      icon: false,
      closeButton: false,
      hideProgressBar: true,
      // autoClose: 1,
    },
  );
};
export const notifyFailed = (title: string) => {
  toast.error(
    <div className="bg-error-error300 rounded-[8px] flex items-center justify-between pt-[16px] pb-[16px] pr-[12px] pl-[12px] mr-[12px] ml-[12px]">
      <div className="flex items-center">
        <img src={ICON_SOURCE.CLOSE_CIRCLE_FAIL} className={"h-[32px] w-[32px]"} alt={"closeToast"} />
        <span className="text-error-error400 ml-[12px]">{title}</span>
      </div>
      <img src={ICON_SOURCE.CLOSE_FAIL} className={"h-[20px] w-[20px]"} alt={"deleteToast"} />
    </div>,
    {
      closeOnClick: true,
      icon: false,
      closeButton: false,
      hideProgressBar: true,
      // autoClose: 1,
    },
  );
};

export const showError = (error: any) => {
  let errorStr = "Error default";
  if (error?.response) {
    if (error?.response?.data?.errors) {
      errorStr = JSON.stringify(error?.response?.data?.errors);
    }

    if (error?.response?.data?.title) {
      errorStr = JSON.stringify(error?.response?.data?.title);
    }
    if (error?.response?.data?.message) {
      errorStr = error?.response?.data?.message;
    }
  } else if (isString(error) || isString(error.toString())) {
    errorStr = error;
  }
  notifyFailed(errorStr);
};
