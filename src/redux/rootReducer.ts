import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
/* Instruments */
import { challangeSlice } from "./slices";
import { answerSlice } from "./slices";

export const reducer = {
  challange: persistReducer(
    { key: "challange", storage },
    challangeSlice.reducer
  ),
  answer: persistReducer({ key: "answer", storage }, answerSlice.reducer),
};
