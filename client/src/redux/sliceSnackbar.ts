import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ISliceSnackBar {
  vissible?: boolean;
  type: TActionResulStatus;
  text?: React.ReactNode;
  timeToClose?: number;
}

const initialState: ISliceSnackBar = {
  vissible: false,
  type: "Information",
  text: "",
  timeToClose: 2500,
};

export const sliceSnackBar = createSlice({
  name: "sliceSnackbar",
  initialState,
  reducers: {
    showSnackbar: (state, action: PayloadAction<ISliceSnackBar>) => {
      state.vissible = true;
      state.type = action.payload.type;
      state.text = action.payload.text || state.type;
      state.timeToClose = action.payload.timeToClose || initialState.timeToClose;
    },
    closeSnackbar: (state) => {
      state.vissible = false;
    },
  },
});

export const { showSnackbar, closeSnackbar } = sliceSnackBar.actions;

// Same get code
// export const getSnackbarStatus = (state: RootState) => state.snackbar.vissible;

export default sliceSnackBar.reducer;
