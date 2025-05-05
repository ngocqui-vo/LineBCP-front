import { RouteBase } from "@/routes/routeUrl";
import { Link, useLocation } from "react-router-dom";

const NavigationBar = () => {
  const location = useLocation();
  const path = location.pathname;

  const routes = [
    {
      label: "Home",
      href: RouteBase.Home,
    },
    {
      label: "Home",
      href: RouteBase.Home,
    },
  ];

  //! Render
  return (
    <header className="component:NavigationBar navigation-bar bg-red-500 fixed left-0 top-0 z-10 flex w-full items-center border-b border-borderMenu bg-navbar text-black">
      <div className="flex w-screen items-center justify-between px-4">
        <div className="flex items-center">
          {/* Logo */}
          <Link to="/" className="px-[32px] text-lg font-bold">
            <img src={"ImageSource.logoApp"} className={"h-[72px] w-[40px]"} alt={"logoApp"} />
          </Link>

          {routes.map((el) => {
            const active = path?.includes(el?.href);
            const classActive = active ? "font-bold bg-bgContainerContent" : "";

            return (
              <Link
                className={`${
                  active ? "border-b-2 border-black" : "border-b-0"
                } typo-24 navigation-bar each-route text-l flex cursor-pointer items-center px-10 py-5 text-black hover:bg-bgContainerContent ${classActive}`}
                key={el.label}
                to={el.href}
              >
                <div className={`size16W600H1909 whitespace-normal`}>{el.label}</div>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default NavigationBar;
