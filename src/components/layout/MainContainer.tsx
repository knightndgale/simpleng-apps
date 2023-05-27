import React from "react";

const MainContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <main className="grid grid-cols-4 gap-2">{children}</main>;
};

export default MainContainer;
