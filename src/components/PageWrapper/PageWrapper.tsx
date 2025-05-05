import Footer from "@/layouts/components/Footer";
import { Fragment } from "react/jsx-runtime";
import { ClipLoader } from "react-spinners";

interface IPageWrapper {
  name: string;
  titlePage: string;
  className?: string;
  children: React.ReactNode;
  isLoading?: boolean;
  isFooter?: boolean;
  classNameChildren?: string | undefined;
}

const PageWrapper = (props: IPageWrapper) => {
  const { name, className = "", children, isLoading = true, isFooter, classNameChildren } = props;
  return (
    <div className={`component:${name} relative flex flex-col h-full ${className}`}>
      {isLoading && (
        <div className="page fixed bottom-0 left-0 z-[10] flex items-center justify-center bg-bgLoadingApp backdrop-blur-sm">
          <ClipLoader color="rgb(3 199 85)" />
        </div>
      )}
      {/* <Header title={titlePage} /> */}
      <div className={`p-8 flex-1 ${classNameChildren}`}>{children}</div>
      {isFooter ? <Footer /> : <Fragment />}
    </div>
  );
};

export default PageWrapper;
