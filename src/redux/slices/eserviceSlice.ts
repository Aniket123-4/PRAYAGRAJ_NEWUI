// src/redux/slices/eserviceSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

// --- Interfaces ---
interface EServiceRequest {
  _id: string;
  type: 'Pay Fees' | 'Reissue Book' | 'Request Book';
  name: string;
  email: string;
  details: string;
  status: 'pending' | 'approved' | 'denied';
  createdAt: string;
  updatedAt: string;
}

interface EServiceState {
  requests: EServiceRequest[];
  loading: boolean;
  error: string | null;
  filters: {
    type: string;
    email: string;
    name: string;
    status: string;
  };
  currentPage: number;
  rowsPerPage: number;
  totalCount: number;
}

const initialState: EServiceState = {
  requests: [],
  loading: false,
  error: null,
  filters: {
    type: '',
    email: '',
    name: '',
    status: ''
  },
  currentPage: 1,
  rowsPerPage: 10,
  totalCount: 0,
};

// ✅ GET ALL E-SERVICE REQUESTS
export const fetchEServiceRequests = createAsyncThunk(
  "eservice/fetchAll",
  async (filters: any, { rejectWithValue }) => {
    try {
      const response = await api.get("/eservice", { params: filters });
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch e-service requests.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ UPDATE REQUEST STATUS
export const updateRequestStatus = createAsyncThunk(
  "eservice/updateStatus",
  async ({ id, status }: { id: string; status: 'pending' | 'approved' | 'denied' }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/eservice/${id}/status`, { status });
      const data = response.data;

      if (data) {
        toast.success(`Request ${status} successfully!`);
        return data.request;
      } else {
        toast.error("Failed to update request status");
        return rejectWithValue("Failed to update request status");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to update request status. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE REQUEST
export const deleteRequest = createAsyncThunk(
  "eservice/delete",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/eservice/${id}`);
      toast.success("Request deleted successfully!");
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
    clearEserviceError: (state) => {
      state.error = null;
    },
    setFilters: (state, action: PayloadAction<Partial<EServiceState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        type: '',
        email: '',
        name: '',
        status: ''
      };
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH REQUESTS
      .addCase(fetchEServiceRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEServiceRequests.fulfilled, (state, action: PayloadAction<EServiceRequest[]>) => {
        state.loading = false;
        state.requests = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchEServiceRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPDATE STATUS
      .addCase(updateRequestStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateRequestStatus.fulfilled, (state, action: PayloadAction<EServiceRequest>) => {
        state.loading = false;
        const index = state.requests.findIndex(request => request._id === action.payload._id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
      })
      .addCase(updateRequestStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE REQUEST
      .addCase(deleteRequest.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteRequest.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.requests = state.requests.filter(request => request._id !== action.payload);
        state.totalCount = state.requests.length;
        
        // Adjust current page if needed
        const totalPages = Math.ceil(state.totalCount / state.rowsPerPage);
        if (state.currentPage > totalPages && totalPages > 0) {
          state.currentPage = totalPages;
        }
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearEserviceError, 
  setFilters, 
  clearFilters,
  setCurrentPage,
  setRowsPerPage
} = eserviceSlice.actions;
export default eserviceSlice.reducer;