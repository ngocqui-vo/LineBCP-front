import { ICON_SOURCE } from "@/assets";
import { useNavigate } from "react-router-dom";
interface Props {
  title: string;
}
const Header = (props: Props) => {
  // !State
  const { title } = props;
  const navigate = useNavigate();
  //! Render
  return (
    <header className="component:Header page-header bg-white fixed left-0 top-0 z-10 flex w-full items-center border-b border-gray-400 text-black px-[16px] ">
      <div onClick={() => navigate("/")}>
        <img src={ICON_SOURCE.ARROW_LEFT} className={"h-[36px] w-[36px]"} alt={"logoApp"} />
      </div>
      <div className="flex-1 text-center">{title}</div>
      <div className="h-[36px] w-[36px] flex items-center justify-center">
        <img src={ICON_SOURCE.BUTTON_DELETE} className={"h-[24px] w-[24px]"} alt={"logoApp"} />
      </div>
    </header>
  );
};

export default Header;
