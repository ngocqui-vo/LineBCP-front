import { Fragment } from "react/jsx-runtime";
interface IProps {
  title?: string;
  subTitle?: string;
  titleClassName?: string;
  subTitleClassName?: string;
  className?: string;
}
const EmptyComponent = (props: IProps) => {
  // !State
  const { title, subTitle, titleClassName, subTitleClassName, className } = props;

  // !Function

  // !Render
  return (
    <div className={`flex justify-center text-center items-center h-full ${className}`}>
      <div>
        {title ? <div className={`size24W600H16 text-dark-dark100", ${titleClassName}`}>{title}</div> : <Fragment />}
        {subTitle ? (
          <div className={`size22W400H16 text-disable-disable200 pt-[12px], ${subTitleClassName}`}>{subTitle}</div>
        ) : (
          <Fragment />
        )}
      </div>
    </div>
  );
};
export default EmptyComponent;
