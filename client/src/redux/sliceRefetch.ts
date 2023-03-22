import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TRefetch = "AllDrivers";

export interface ISliceRightActionMenu {
  refetch: boolean | TRefetch;
}

const initialState: ISliceRightActionMenu = {
  refetch: false,
};

export const sliceRefetch = createSlice({
  name: "sliceRefetch",
  initialState,
  reducers: {
    setRefetch: (state, action: PayloadAction<ISliceRightActionMenu>) => {
      state.refetch = action.payload.refetch;
    },
    resetRefetch: (state) => {
      state.refetch = false;
    },
  },
});

export const { setRefetch, resetRefetch } = sliceRefetch.actions;

export default sliceRefetch.reducer;
