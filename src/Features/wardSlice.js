import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const initialState = {
  wards: [],
  loading: false,
  error: null,
};

const url = `https://neog-assignment-21-backend.onrender.com/api/ward`;

// read all wards
export const fetchWards = createAsyncThunk(
  "wards/fetchWards",
  async (args, { rejectWithValue }) => {
    try {
      const result = await axios.get(url, {
        "Content-Type": "application/json",
      });

      if (result.status === 200) {
        return result.data.wards;
      } else {
        return [];
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// add new ward
export const addWard = createAsyncThunk(
  "wards/addWard",
  async (body, { rejectWithValue }) => {
    try {
      const result = await axios.post(url, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 201) {
        return result.data.ward;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// updating an existing ward
export const updateWard = createAsyncThunk(
  "wards/updateWard",
  async (data, { rejectWithValue }) => {
    try {
      const result = await axios.post(`${url}/${data.id}`, data.newWard, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.ward;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

// delete an existing ward
export const deleteWard = createAsyncThunk(
  "wards/deleteWard",
  async (wardId, { rejectWithValue }) => {
    try {
      const result = await axios.delete(`${url}/${wardId}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        return result.data.ward;
      }
    } catch (e) {
      return rejectWithValue(e.message);
    }
  }
);

export const wardSlice = createSlice({
  name: "wardsDetails",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWards.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWards.fulfilled, (state, action) => {
        state.loading = false;
        state.wards = action.payload;
      })
      .addCase(fetchWards.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while fetching all wards!");
      })
      .addCase(addWard.pending, (state) => {
        state.loading = true;
      })
      .addCase(addWard.fulfilled, (state, action) => {
        state.loading = false;
        state.wards.push(action.payload);
        toast.success("New Ward added successfully!");
      })
      .addCase(addWard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while adding new Ward!");
      })
      .addCase(updateWard.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateWard.fulfilled, (state, action) => {
        state.loading = false;
        state.wards = state.wards.map((ward) =>
          ward._id === action.payload._id ? action.payload : ward
        );
        toast.success("Ward Updated successfully!");
      })
      .addCase(updateWard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while updating Ward!");
      })
      .addCase(deleteWard.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteWard.fulfilled, (state, action) => {
        state.loading = false;
        state.wards = state.wards.filter(
          (ward) => ward._id !== action.payload._id
        );
        toast.success("Ward Deleted successfully!");
      })
      .addCase(deleteWard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Error while deleting Ward!");
      });
  },
});

export default wardSlice.reducer;
