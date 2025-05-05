import PageWrapper from "@/components/PageWrapper/PageWrapper";
import { useEffect } from "react";

const CallbackScreen = () => {
  // !State
  useEffect(() => {
    const pathName = localStorage.getItem("pathName");
    if (pathName) {
      localStorage.removeItem("pathName");
      window.location.href = pathName;
    }
  }, []);
  return (
    <PageWrapper name="CallbackScreen" titlePage="CallbackScreen" isLoading={false}>
      <div>loading......</div>
    </PageWrapper>
  );
};

export default CallbackScreen;
