import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const NotFoundScreen = () => {
  const navigate = useNavigate();
  const pathName = useMemo(() => localStorage.getItem("pathName"), []);
  useEffect(() => {
    if (pathName) {
      navigate(pathName);
    }
  }, [pathName]);
  return <div></div>;
};
export default NotFoundScreen;
