import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ISliceRightActionMenu {
  type: "AddDriver" | "EditDriver";
  vissible?: boolean;
  id?: string;
}

const initialState: ISliceRightActionMenu = {
  vissible: false,
  type: "AddDriver",
};

export const sliceRightActionMenu = createSlice({
  name: "sliceRightActionMenu",
  initialState,
  reducers: {
    showRightActionMenu: (state, action: PayloadAction<ISliceRightActionMenu>) => {
      state.vissible = true;
      state.type = action.payload.type;
      state.id = action.payload.id;
    },
    closeRightMenuAction: (state) => {
      state.vissible = false;
    },
  },
});

export const { showRightActionMenu, closeRightMenuAction } = sliceRightActionMenu.actions;

export default sliceRightActionMenu.reducer;
