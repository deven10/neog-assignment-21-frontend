import { configureStore } from "@reduxjs/toolkit";
import { patientSlice } from "../Features/patientSlice";
import { wardSlice } from "../Features/wardSlice";

export default configureStore({
  reducer: {
    patients: patientSlice.reducer,
    wards: wardSlice.reducer,
  },
});
