import { createStore} from 'redux'
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

import RootReducer from "./RootReducer";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["userInfo"],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

let store = createStore(persistedReducer);
let persistor = persistStore(store);
export { store, persistor };




