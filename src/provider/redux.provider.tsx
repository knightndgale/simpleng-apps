import React from "react";
import { Provider } from "react-redux";
import rootStore from "~/store/root.store";

const ReduxProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Provider store={rootStore}>{children}</Provider>;
};

export default ReduxProvider;
