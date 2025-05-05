import { DateTimeFormat } from "@/helpers/common";
import { HistoryModel } from "@/models/eMoney/GetHistoryModel";
import moment from "moment";
import { useTranslation } from "react-i18next";
interface IProps {
  data: HistoryModel;
}
const ItemHistoryEMoney = (props: IProps) => {
  // !State
  const { data } = props;
  const { t } = useTranslation();
  const fullYearFormatDash = moment(data?.transaction_time).format(DateTimeFormat.FullYearFormatDash);
  const timeFormatDash = moment(data?.transaction_time).format(DateTimeFormat.HourMinutes);
  const minus = data?.charge_value_amount_sum === 0;
  // ! Function

  // ! Render
  return (
    <div className={`border-b-[1px] border-borderColor-gray py-[16px] grid grid-cols-[1fr_1fr_1fr]`}>
      <div>
        <div className="size14W600H196 text-dark-dark400">{fullYearFormatDash}</div>
        <div className="size14W400H196 text-dark-dark400">{timeFormatDash}</div>
      </div>
      <div className="w-[109px] m-auto size14W400H196 text-dark-dark400">{data?.store_name}</div>
      <div
        className={`pl-[4px] flex items-center  ${minus ? "text-error-error200" : "text-success-success100"} justify-end`}
      >
        <span
          style={{
            lineBreak: "anywhere",
          }}
        >
          {minus ? "-" : "+"} {data.charge_value_amount_sum || data.usage_value_amount_sum} {t("eMoney.history.unit")}
        </span>
      </div>
    </div>
  );
};
export default ItemHistoryEMoney;
