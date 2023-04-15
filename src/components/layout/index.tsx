import React from "react";
import Header from "./header";

const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="content">
      <Header />
      <div className="m-5">{children}</div>
    </div>
  );
};

export default DefaultLayout;
