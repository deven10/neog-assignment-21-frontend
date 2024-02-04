import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  patients: [],
  loading: false,
  error: null,
};

const url = `https://neog-assignment-21-backend.onrender.com/api/patient`;

// read all patients
export const fetchPatients = createAsyncThunk(
  "students/fetchPatients",
  async (args, { rejectWithValue }) => {
    try {
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      if (result.status === 200) {
        return result.data.patients;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// add new patient
export const addPatient = createAsyncThunk(
  "students/addPatient",
  async (body, { rejectWithValue }) => {
    try {
      const result = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 201) {
        return result.data.patient;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// updating an existing patients
export const updatePatient = createAsyncThunk(
  "students/updatePatient",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${url}/${data.id}`, data.newPatient, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.patient;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// delete an existing student
export const deletePatient = createAsyncThunk(
  "students/deletePatient",
  async (patientId, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${url}/${patientId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.patient;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const patientSlice = createSlice({
  name: "patientsDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPatients.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPatients.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = action.payload;
      })
      .addCase(fetchPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while fetching all Patients!");
      })
      .addCase(addPatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(addPatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients.push(action.payload);
        toast.success("New Patient added successfully!");
      })
      .addCase(addPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while adding new Patient!");
      })
      .addCase(updatePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(updatePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = state.patients.map((patient) =>
          patient._id === action.payload._id ? action.payload : patient
        );
        toast.success("Patient Updated successfully!");
      })
      .addCase(updatePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while updating Patient!");
      })
      .addCase(deletePatient.pending, (state) => {
        state.loading = true;
      })
      .addCase(deletePatient.fulfilled, (state, action) => {
        state.loading = false;
        state.patients = state.patients.filter(
          (patient) => patient._id !== action.payload._id
        );
        toast.success("Patient Deleted successfully!");
      })
      .addCase(deletePatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while deleting Patient!");
      });
  },
});

export default patientSlice.reducer;
