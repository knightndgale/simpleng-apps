import React from "react";

const Content: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <section className="col-span-4 mt-5 gap-3 sm:col-span-3">
      {children}
    </section>
  );
};

export default Content;
