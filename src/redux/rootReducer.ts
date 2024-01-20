import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
/* Instruments */
import { challangeSlice, answerSlice, editorSlice } from "./slices";

export const reducer = {
  challange: persistReducer(
    { key: "challange", storage },
    challangeSlice.reducer
  ),
  answer: persistReducer({ key: "answer", storage }, answerSlice.reducer),
  editor: persistReducer({ key: "editor", storage }, editorSlice.reducer),
};
