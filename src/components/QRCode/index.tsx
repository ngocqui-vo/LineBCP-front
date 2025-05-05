import QRCode from "qrcode.react";
interface IProps {
  value: string;
  size?: number;
}
const QRCodeCommon = (props: IProps) => {
  const { value, size } = props;
  return (
    <QRCode
      renderAs={"canvas"}
      value={value}
      size={size}
      bgColor="white"
      fgColor="black"
      level="L"
      includeMargin={false}
      id="qrCodeEl"
    />
  );
};
export default QRCodeCommon;
