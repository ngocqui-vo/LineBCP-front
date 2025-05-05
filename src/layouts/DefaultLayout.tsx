import { Fragment } from "react/jsx-runtime";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

const DefaultLayout = (props: DefaultLayoutProps) => {
  //! State

  //! Function

  //! Render
  return (
    <Fragment>
      {/* <NavigationBar /> */}
      <div className="page">{props.children}</div>
    </Fragment>
  );
};

export default DefaultLayout;
