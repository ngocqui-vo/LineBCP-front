import { ReactBarcode } from "react-jsbarcode";
interface IProps {
  value: string;
}
const BarcodeCommon = (props: IProps) => {
  const { value } = props;
  return (
    <div className="barcode-container">
      <ReactBarcode
        value={value}
        style={{
          width: "calc(100vw - 48px)",
        }}
        options={{ format: "code128" }}
      />
    </div>
  );
};
export default BarcodeCommon;
