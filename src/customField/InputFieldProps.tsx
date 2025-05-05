import { ICON_SOURCE } from "@/assets";
import { Input, InputProps } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AdditionalFormikProps } from "@/interfaces/common.interface";
import { get, isString } from "lodash";
import React, { ChangeEvent, useCallback } from "react";
import { twMerge } from "tailwind-merge";

interface InputFieldProps extends InputProps {
  label?: string | React.ReactNode;
  required?: boolean;
  classNameLabel?: string;
  classNameContainer?: string;
  afterOnChange?: (e: ChangeEvent) => void;
  type?: React.HTMLInputTypeAttribute | undefined;
  extraRight?: React.ReactNode;
  extraLeft?: React.ReactNode;
}

const InputField = (props: InputFieldProps & AdditionalFormikProps) => {
  const {
    label,
    classNameLabel,
    classNameContainer,
    form,
    field,
    className,
    required,
    type = "text",
    extraRight: extraRightElm,
    extraLeft,
    ...restPropsInput
  } = props;
  const { name, onBlur, onChange, value } = field;
  const { errors, touched } = form;
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const msgError = get(touched, name) && (get(errors, name) as string);

  const onHandleChange = (e: ChangeEvent) => {
    onChange(e);
    props?.afterOnChange && props?.afterOnChange(e);
  };

  const onCheckType = useCallback(() => {
    return showPassword ? "text" : type || "password";
  }, [showPassword, type]);

  const handleClickShowPassword = React.useCallback(() => {
    setShowPassword((prev: boolean) => !prev);
  }, [setShowPassword]);

  const extraRight = useCallback(() => {
    if (type !== "password") return extraRightElm;
    if (showPassword) {
      return (
        <img src={ICON_SOURCE.EYE_ON} className={"h-[22px] w-[22px]"} alt={"eyeOn"} onClick={handleClickShowPassword} />
      );
    }
    return (
      <img src={ICON_SOURCE.EYE_OFF} className={"h-[22px] w-[22px]"} alt={"eyeOff"} onClick={handleClickShowPassword} />
    );
  }, [handleClickShowPassword, showPassword, type, extraRightElm]);

  return (
    <div className={twMerge("grid w-full items-center gap-1.5", classNameContainer)}>
      {label && (
        <Label
          htmlFor={name}
          className={twMerge("size14W400H196 font-medium text-dark-dark200", required && "required", classNameLabel)}
        >
          {label}
        </Label>
      )}
      <Input
        name={name}
        onBlur={onBlur}
        onChange={onHandleChange}
        value={value}
        id={name}
        type={onCheckType()}
        extraRight={extraRight()}
        extraLeft={extraLeft}
        className={twMerge(
          className,
          "rounded-[2px] py-[9px] border-backgroundColor-qaBackground  placeholder-text-third focus-visible:ring-0 focus-visible:ring-offset-0",
          msgError && "border-[#F57170] focus:border-[#F57170] ",
        )}
        {...restPropsInput}
      />
      {isString(msgError) && <span className="invalid-text size13W400H18 text-[#F57170]">{msgError}</span>}
    </div>
  );
};

export default InputField;
