import { Helmet } from "react-helmet";
import { Fragment } from "react/jsx-runtime";
import { richMenu } from "./richMenu";
import { t } from "i18next";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";

const HomePageScreen = () => {
  // !State
  const navigate = useNavigate();
  const pathName = useMemo(() => localStorage.getItem("pathName"), []);

  useEffect(() => {
    if (pathName) {
      navigate(pathName);
    }
  }, [pathName]);

  // !Function
  const handleClick = (item: any) => {
    if (item?.isExtend) {
      return window.open(item?.path, "_blank");
    }
    navigate(item?.path);
  };

  if (pathName) {
    return <Fragment />;
  }

  // !Render
  return (
    <Fragment>
      <Helmet>
        <title>Home BC</title>
      </Helmet>
      <div className="flex-col flex justify-between flex-1 h-full ">
        <div className="flex justify-end">
          <button className="bg-blue-300 rounded-sm py-2 px-6">{t("common.logout")}</button>
        </div>
        <div className="grid grid-cols-3 gap-1">
          {richMenu.map((item, idx) => {
            return (
              <button
                onClick={() => handleClick(item)}
                className="bg-slate-700 rounded-sm text-gray-200 p-4 w-28 h-28"
                key={idx}
              >
                {item?.name}
              </button>
            );
          })}
        </div>
      </div>
    </Fragment>
  );
};
export default HomePageScreen;
