import React from "react";

const SideContent: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="col-span-4 pt-5 sm:col-span-1 "> {children} </section>
  );
};

export default SideContent;
