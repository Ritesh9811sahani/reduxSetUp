import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import MainNavigation from './src/mainNavigation/Route';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./src/redux/ConfigurationStore";

const App = () => {
  useEffect(() => {
  }, [])

  return (
    <View style={{ height: "100%" }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <MainNavigation />
        </PersistGate>
      </Provider>
    </View>
  );
}

export default App;