// src/redux/slices/manuscriptSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

// --- Interfaces ---
interface ManuscriptData {
  _id?: string;
  srNo: number;
  title: string;
  author?: string;
  year?: string;
  callNo: string;
}

interface ManuscriptState {
  data: ManuscriptData[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  rowsPerPage: number;
  totalCount: number;
}

const initialState: ManuscriptState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  rowsPerPage: 10,
  totalCount: 0,
};

// ✅ GET ALL MANUSCRIPTS
export const fetchManuscripts = createAsyncThunk(
  "manuscript/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/manuscript");
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch manuscripts.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ ADD MANUSCRIPT
export const addManuscript = createAsyncThunk(
  "manuscript/add",
  async (payload: Omit<ManuscriptData, 'srNo' | '_id'>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const manuscripts = state.manuscript.data || [];
      
      // Calculate next serial number
      const nextSrNo = manuscripts.length > 0 
        ? Math.max(...manuscripts.map((m: ManuscriptData) => m.srNo)) + 1 
        : 1;

      const manuscriptWithSrNo = {
        ...payload,
        srNo: nextSrNo
      };

      const response = await api.post("/manuscript", manuscriptWithSrNo);
      const data = response.data;

      if (data) {
        toast.success("Manuscript added successfully!");
        return data;
      } else {
        toast.error("Failed to add manuscript");
        return rejectWithValue("Failed to add manuscript");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to add manuscript. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ UPDATE MANUSCRIPT
export const updateManuscript = createAsyncThunk(
  "manuscript/update",
  async ({ id, data }: { id: string; data: Partial<ManuscriptData> }, { rejectWithValue }) => {
    try {
      const response = await api.put(`/manuscript/${id}`, data);
      const responseData = response.data;

      if (responseData) {
        toast.success("Manuscript updated successfully!");
        return responseData;
      } else {
        toast.error("Failed to update manuscript");
        return rejectWithValue("Failed to update manuscript");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to update manuscript. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE MANUSCRIPT
export const deleteManuscript = createAsyncThunk(
  "manuscript/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/manuscript/${id}`);
      toast.success("Manuscript deleted successfully!");
      return id;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete manuscript. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SLICE
const manuscriptSlice = createSlice({
  name: "manuscript",
  initialState,
  reducers: {
    clearManuscriptError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
    clearManuscriptData: (state) => {
      state.data = [];
      state.currentPage = 1;
      state.totalCount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH MANUSCRIPTS
      .addCase(fetchManuscripts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchManuscripts.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchManuscripts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD MANUSCRIPT
      .addCase(addManuscript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addManuscript.fulfilled, (state, action) => {
        state.loading = false;
        state.data.push(action.payload);
        state.totalCount = state.data.length;
        // Reset to first page to show the new addition
        state.currentPage = 1;
      })
      .addCase(addManuscript.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE MANUSCRIPT
      .addCase(updateManuscript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateManuscript.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateManuscript.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE MANUSCRIPT
      .addCase(deleteManuscript.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteManuscript.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(item => item._id !== action.payload);
        state.totalCount = state.data.length;
        
        // Adjust current page if needed
        const totalPages = Math.ceil(state.totalCount / state.rowsPerPage);
        if (state.currentPage > totalPages && totalPages > 0) {
          state.currentPage = totalPages;
        }
      })
      .addCase(deleteManuscript.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearManuscriptError, 
  setCurrentPage, 
  setRowsPerPage,
  clearManuscriptData 
} = manuscriptSlice.actions;
export default manuscriptSlice.reducer;