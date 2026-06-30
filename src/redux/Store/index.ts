import { configureStore, combineReducers } from '@reduxjs/toolkit';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from 'redux-persist';
import userReducer from '../Slices/userSlice';
import taskReducer from '../Slices/taskSlice';
const rootReducer = combineReducers({
  user: userReducer,
  task: taskReducer,
});

// 🔹 Persist config
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['user', 'task'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Store create FIRST
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// ✅ Types AFTER store creation
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// 🔹 Persistor
export const persistor = persistStore(store);