/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Answer, Challenge, AnswerStatus } from "../../../models";
import { fetchChallenges, selectIndex } from "../index";

const initialState: AnswerSliceState = {
  score: 0,
  answerSheet: {},
};

export const answerSlice = createSlice({
  name: "answer",
  initialState,
  reducers: {
    appendAnswer(state, action: PayloadAction<{ id: number; answer: string }>) {
      const data = state.answerSheet[action.payload.id];
      state.answerSheet[action.payload.id] = {
        ...data,
        ...(data.status === AnswerStatus.NOT_STARTED
          ? { status: AnswerStatus.IN_PROGRESS }
          : {}),
        answer: action.payload.answer,
      };
    },
    answerTested(state, action: PayloadAction<{ id: number; output: string }>) {
      state.answerSheet[action.payload.id] = {
        ...state.answerSheet[action.payload.id],
        status: AnswerStatus.COMPLETED,
        output: action.payload.output,
        tested: true,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      fetchChallenges.fulfilled,
      (state, action: PayloadAction<Challenge[]>) => {
        const answerSheetData: Record<number, Answer> = action.payload.reduce(
          (prev, curr) => ({
            ...prev,
            [curr.id]: {
              challenge_id: curr.id,
              status: AnswerStatus.NOT_STARTED,
              answer: curr.default_code,
              tested: false,
            },
          }),
          {}
        );
        state.answerSheet = answerSheetData;
      }
    );
  },
});

/* Types */
export interface AnswerSliceState {
  score: number;
  answerSheet: Record<number, Answer>;
}

export const selectAnswerSheet = (state: { answer: AnswerSliceState }) =>
  state.answer.answerSheet;
export const selectScore = (state: { answer: AnswerSliceState }) =>
  state.answer.score;

export const { appendAnswer, answerTested } = answerSlice.actions;

// Export the reducer
export default answerSlice.reducer;
