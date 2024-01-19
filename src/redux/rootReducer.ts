import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
/* Instruments */
import { challangeSlice } from "./slices";

const persistConfig = {
  key: "root",
  storage,
};

export const reducer = {
  counter: persistReducer(persistConfig, challangeSlice.reducer),
};
