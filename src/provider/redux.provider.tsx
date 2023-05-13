import React from "react";
import { Provider } from "react-redux";

import { PersistGate } from "redux-persist/integration/react";

import rootStore, { persistor } from "~/store/root.store";

const ReduxProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Provider store={rootStore}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
};

export default ReduxProvider;
