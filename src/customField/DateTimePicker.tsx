import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdditionalFormikProps } from "@/interfaces/common.interface";
import { get, isString } from "lodash";
import React, { ChangeEvent } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { twMerge } from "tailwind-merge";

interface InputFieldProps extends InputProps {
  label?: string | React.ReactNode;
  required?: boolean;
  afterOnChange?: (e: ChangeEvent) => void;
}

const DateTimePicker = (props: InputFieldProps & AdditionalFormikProps) => {
  const { label, form, field, required } = props;
  const { name, value } = field;
  const { errors, touched, setFieldTouched, setFieldValue } = form;
  const msgError = get(touched, name) && (get(errors, name) as string);

  return (
    <div>
      {label && (
        <Label
          htmlFor={name}
          className={twMerge("size13W400H18 font-medium text-black mb-[-2px] block", required && "required")}
        >
          {label}
        </Label>
      )}
      <DatePicker
        // showMonthDropdown
        // showYearDropdown
        onFocus={() => setFieldTouched(name, true)}
        selected={value}
        onChange={(date) => setFieldValue(name, date)}
        dateFormat="yyyy/MM/dd"
        placeholderText="yyyy/mm/dd"
        customInput={<Input />}
        // className={twMerge(
        //   className,
        //   "peer h-full w-full border-b-[1.5px] bg-transparent pt-4 pb-1.5 text-sm font-normal outline outline-0 transition-all  focus:border-blue-400 focus:outline-0 disabled:border-0 disabled:bg-gray",
        //   msgError && "border-[#F57170] focus:border-[#F57170] "
        // )}
      />
      {isString(msgError) && <span className="invalid-text size13W400H18 text-[#F57170]">{msgError}</span>}
    </div>
  );
};

export default DateTimePicker;
