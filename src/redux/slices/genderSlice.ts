import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../utils/Url";

interface Gender {
  _id: string; // MongoDB ID as string
  id?: string; // Optional alias for _id
  name: string;
}

interface GenderState {
  Genders: Gender[];
  loading: boolean;
  error: string | null;
}

const initialState: GenderState = {
  Genders: [],
  loading: false,
  error: null,
};

// Get all genders or specific gender by ID
export const fetchGenders = createAsyncThunk(
  "gender/fetchGenders", 
  async (id?: string) => {
    const payload = id ? { id } : {};
    const response = await api.post("/genders/list", payload);
    return response.data.data;
  }
);

// Create or update gender (uses same /gender endpoint)
export const saveOrUpdateGender = createAsyncThunk(
  "gender/saveOrUpdateGender",
  async (genderData: { id?: string; name: string }) => {
    const response = await api.post("/genders", genderData);
    return response.data;
  }
);

// Delete gender
export const deleteGender = createAsyncThunk(
  "gender/deleteGender",
  async (id: string) => {
    const response = await api.post("/genders/delete", { id });
    return response.data;
  }
);

const genderSlice = createSlice({
  name: "gender",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Genders
      .addCase(fetchGenders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGenders.fulfilled, (state, action) => {
        state.loading = false;
        state.Genders = action.payload;
      })
      .addCase(fetchGenders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch genders";
      })

      // Save or Update Gender
      .addCase(saveOrUpdateGender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(saveOrUpdateGender.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(saveOrUpdateGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to save gender";
      })

      // Delete Gender
      .addCase(deleteGender.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteGender.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteGender.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to delete gender";
      });
  },
});

export const { clearError } = genderSlice.actions;
export default genderSlice.reducer;