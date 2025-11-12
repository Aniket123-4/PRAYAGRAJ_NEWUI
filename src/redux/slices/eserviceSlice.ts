// src/redux/slices/eserviceSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

// --- Interfaces ---
export interface IEService {
  _id?: string;
  type: 'Pay Fees' | 'Reissue Book' | 'Request Book';
  name: string;
  email: string;
  details: string;
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
  updatedAt: string;
}

interface EServiceState {
  data: IEService[];
  loading: boolean;
  error: string | null;
  currentPage: number;
  rowsPerPage: number;
  totalCount: number;
  filters: {
    type?: string;
    email?: string;
    name?: string;
    status?: string;
  };
}

const initialState: EServiceState = {
  data: [],
  loading: false,
  error: null,
  currentPage: 1,
  rowsPerPage: 10,
  totalCount: 0,
  filters: {},
};

// ✅ CREATE NEW E-SERVICE REQUEST
export const createEService = createAsyncThunk(
  "eservice/create",
  async (payload: {
    type: 'Pay Fees' | 'Reissue Book' | 'Request Book';
    name: string;
    email: string;
    details: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post('/eServices', payload);
      const responseData = response.data;

      if (responseData) {
        toast.success("E-service request submitted successfully!");
        return responseData;
      } else {
        toast.error("Failed to submit request");
        return rejectWithValue("Failed to submit request");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to submit e-service request. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ GET ALL E-SERVICES
export const fetchEServices = createAsyncThunk(
  "eservice/fetchAll",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const filters = state.eservice.filters;
      
      // Build query string from filters
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value as string);
      });

      const url = `/eServices${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch e-service requests.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ UPDATE E-SERVICE STATUS
export const updateEServiceStatus = createAsyncThunk(
  "eservice/updateStatus",
  async ({ id, status }: { id: string; status: 'pending' | 'approved' | 'denied' }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/eServices/${id}/status`, { status });
      const responseData = response.data;

      if (responseData) {
        toast.success("Status updated successfully!");
        return responseData;
      } else {
        toast.error("Failed to update status");
        return rejectWithValue("Failed to update status");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to update status. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE E-SERVICE
export const deleteEService = createAsyncThunk(
  "eservice/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/eServices/${id}`);
      toast.success("E-service request deleted successfully!");
      return id;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete request. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SLICE
const eserviceSlice = createSlice({
  name: "eservice",
  initialState,
  reducers: {
    clearEServiceError: (state) => {
      state.error = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearEServiceData: (state) => {
      state.data = [];
      state.currentPage = 1;
      state.totalCount = 0;
      state.filters = {};
    },
    clearFormData: (state) => {
      // This can be used to clear form-related state if needed
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // CREATE E-SERVICE
      .addCase(createEService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEService.fulfilled, (state, action) => {
        state.loading = false;
        // Add the new request to the beginning of the list
        state.data.unshift(action.payload.request);
        state.totalCount = state.data.length;
      })
      .addCase(createEService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH E-SERVICES
      .addCase(fetchEServices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEServices.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchEServices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE STATUS
      .addCase(updateEServiceStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateEServiceStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.data.findIndex(item => item._id === action.payload.request._id);
        if (index !== -1) {
          state.data[index] = action.payload.request;
        }
      })
      .addCase(updateEServiceStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE E-SERVICE
      .addCase(deleteEService.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEService.fulfilled, (state, action) => {
        state.loading = false;
        state.data = state.data.filter(item => item._id !== action.payload);
        state.totalCount = state.data.length;
        
        // Adjust current page if needed
        const totalPages = Math.ceil(state.totalCount / state.rowsPerPage);
        if (state.currentPage > totalPages && totalPages > 0) {
          state.currentPage = totalPages;
        }
      })
      .addCase(deleteEService.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearEServiceError, 
  setCurrentPage, 
  setRowsPerPage,
  setFilters,
  clearEServiceData,
  clearFormData
} = eserviceSlice.actions;
export default eserviceSlice.reducer;