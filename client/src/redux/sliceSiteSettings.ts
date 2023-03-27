import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface ISliceSiteSettings {
  dataFetched?: boolean;
  statusId: { available: number | null; onTheRoad: number | null; inaccessible: number | null };
}

const initialState: ISliceSiteSettings = {
  dataFetched: false,
  statusId: { available: 0, onTheRoad: 0, inaccessible: 0 },
};

export const sliceSiteSettings = createSlice({
  name: "sliceSiteSettings",
  initialState,
  reducers: {
    setSiteSettings: (state, action: PayloadAction<ISliceSiteSettings>) => {
      state.dataFetched = true;
      state.statusId = { available: action.payload.statusId.available, onTheRoad: action.payload.statusId.onTheRoad, inaccessible: action.payload.statusId.inaccessible };
    },
  },
});

export const { setSiteSettings } = sliceSiteSettings.actions;

export default sliceSiteSettings.reducer;
