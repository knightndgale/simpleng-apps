import React from "react";
import Navbar from "./Navbar";

const DefaultLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <div className="content">
      <Navbar />
      <div className="m-5">{children}</div>
    </div>
  );
};

export default DefaultLayout;
