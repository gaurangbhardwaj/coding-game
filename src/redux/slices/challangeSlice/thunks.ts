/* Instruments */
import type { ReduxThunkAction } from "../../store";
import { incrementByAmount } from "./challangeSlice";

export const incrementIfOddAsync =
  (
    amount: number,
    setIncrementAmount: (num: number) => void
  ): ReduxThunkAction =>
  (dispatch, getState) => {
    // Current count in counterSlice
    const currCntVal = getState().counter.value;
    if (currCntVal % 2 !== 0) {
      dispatch(incrementByAmount(amount));
      // Set value of input to 0 after dispatch
      setIncrementAmount(0);
    }
  };
