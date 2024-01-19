/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Challenge } from "../../../models";
import { fetchChallenges } from "./thunks";

const initialState: ChallangeSliceState = {
  selectedIndex: 0,
  questionBank: [],
  isFetchingQuestions: false,
  error: null,
};

export const challangeSlice = createSlice({
  name: "challange",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchChallenges.pending, (state) => {
        state.isFetchingQuestions = true;
        state.error = null;
      })
      .addCase(
        fetchChallenges.fulfilled,
        (state, action: PayloadAction<Challenge[]>) => {
          state.isFetchingQuestions = false;
          state.questionBank = action.payload;
          state.error = null;
        }
      )
      .addCase(fetchChallenges.rejected, (state, action) => {
        state.isFetchingQuestions = false;
        state.error = action.error.message || "An error occurred";
      });
  },
});

/* Types */
export interface ChallangeSliceState {
  selectedIndex: number;
  questionBank: Challenge[];
  isFetchingQuestions: boolean;
  error: string | null;
}

export const selectIndex = (state: { challange: ChallangeSliceState }) =>
  state.challange.selectedIndex;
export const selectQuestionBank = (state: { challange: ChallangeSliceState }) =>
  state.challange.questionBank;
export const selectIsFetchingQuestions = (state: {
  challange: ChallangeSliceState;
}) => state.challange.isFetchingQuestions;
export const selectError = (state: { challange: ChallangeSliceState }) =>
  state.challange.error;

// Export the reducer
export default challangeSlice.reducer;
