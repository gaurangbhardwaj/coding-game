/* Core */
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { fetchToken, executeCode } from "./thunks";
import { CompilationResult } from "src/models/editor";

const initialState: EditorSliceState = {
  authToken: "",
  isFetchingToken: false,
  isExecutingCode: false,
  output: "",
  error: null,
};

export const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    eraseOutput(state) {
      state.output = "";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchToken.pending, (state) => {
        state.isFetchingToken = true;
        state.error = null;
      })
      .addCase(fetchToken.fulfilled, (state, action: PayloadAction<string>) => {
        state.isFetchingToken = false;
        state.authToken = action.payload;
        state.error = null;
      })
      .addCase(fetchToken.rejected, (state, action) => {
        state.isFetchingToken = false;
        state.error = action.error.message || "An error occurred";
      });

    builder
      .addCase(executeCode.pending, (state) => {
        state.isExecutingCode = true;
        state.output = "";
      })
      .addCase(
        executeCode.fulfilled,
        (state, action: PayloadAction<CompilationResult>) => {
          state.isExecutingCode = false;
          state.output = action.payload;
        }
      )
      .addCase(executeCode.rejected, (state, action) => {
        state.isExecutingCode = false;
        state.output["output"] = action.error.message || "An error occurred";
      });
  },
});

/* Types */
export interface EditorSliceState {
  authToken: string;
  isFetchingToken: boolean;
  isExecutingCode: boolean;
  error: string | null;
  output: CompilationResult | any;
}

export const selectAuthToken = (state: { editor: EditorSliceState }) =>
  state.editor.authToken;
export const selectIsFetchingToken = (state: { editor: EditorSliceState }) =>
  state.editor.isFetchingToken;
export const selectEditorError = (state: { editor: EditorSliceState }) =>
  state.editor.error;
export const selectIsExecutingCode = (state: { editor: EditorSliceState }) =>
  state.editor.isExecutingCode;
export const selectOutput = (state: { editor: EditorSliceState }) =>
  state.editor.output;

export const { eraseOutput } = editorSlice.actions;

// Export the reducer
export default editorSlice.reducer;
