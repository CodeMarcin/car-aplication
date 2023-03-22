import { configureStore } from "@reduxjs/toolkit";
import snackbarReducer from "./sliceSnackbar";
import rightMenuActionReducer from "./sliceRightActionMenu";
import refetchReducer from "./sliceRefetch";

export const store = configureStore({
  reducer: {
    snackbar: snackbarReducer,
    rightMenuAction: rightMenuActionReducer,
    refetch: refetchReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
