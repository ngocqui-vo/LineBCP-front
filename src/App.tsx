import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import { routes } from "./routes";
import NotFoundScreen from "./screens/404NotFound";
import CallbackScreen from "./screens/callback";

const App = () => {
  // !State
  // const path = useLocation();
  // const save = useSave();

  // !Effect
  // useEffect(() => {
  //   if (
  //     path.pathname === RouteBase.RegisterTMN ||
  //     path.pathname === RouteBase.CouponScreen ||
  //     path.pathname === RouteBase.RegisterCancel ||
  //     path.pathname === RouteBase.BarcodeTMN ||
  //     path.pathname === RouteBase.RegisterSuccess ||
  //     path.pathname === RouteBase.RegisterWithOnlyPoint
  //   ) {
  //     localStorage.setItem("pathName", `${path.pathname}${path.search}`);
  //     save(cachedKeys.pathName, `${path.pathname}${path.search}`);
  //   }
  // }, [path.pathname]);

  // !Render
  return (
    <Suspense fallback={<CallbackScreen />}>
      <Routes>
        {routes.map((route, idx) => {
          return (
            <Route
              key={idx}
              path={route.path}
              element={
                <DefaultLayout>
                  <route.component />
                </DefaultLayout>
              }
            />
          );
        })}
        <Route path="*" element={<NotFoundScreen />} />
      </Routes>
    </Suspense>
  );
};

export default App;
