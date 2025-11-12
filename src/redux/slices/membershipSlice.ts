// src/redux/slices/membershipSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

// --- Interfaces ---
export interface IMembershipDetail {
  _id?: string;
  title: string;
  description: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface IRegistration {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  membershipType: string;
  status?: 'pending' | 'approved' | 'rejected'; // Make status optional
  createdAt?: string;
  updatedAt?: string;
}

export interface IRule {
  _id?: string;
  type: 'borrower' | 'library';
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

interface MembershipState {
  // Details
  details: IMembershipDetail[];
  detailsLoading: boolean;
  detailsError: string | null;
  
  // Registrations
  registrations: IRegistration[];
  registrationsLoading: boolean;
  registrationsError: string | null;
  
  // Rules
  rules: IRule[];
  rulesLoading: boolean;
  rulesError: string | null;
  
  // Member Count
  memberCount: number;
  memberCountLoading: boolean;
  memberCountError: string | null;
  
  // Pagination & Filters
  currentPage: number;
  rowsPerPage: number;
  totalCount: number;
  filters: {
    status?: string;
    email?: string;
    name?: string;
    type?: string;
  };
}

const initialState: MembershipState = {
  // Details
  details: [],
  detailsLoading: false,
  detailsError: null,
  
  // Registrations
  registrations: [],
  registrationsLoading: false,
  registrationsError: null,
  
  // Rules
  rules: [],
  rulesLoading: false,
  rulesError: null,
  
  // Member Count
  memberCount: 0,
  memberCountLoading: false,
  memberCountError: null,
  
  // Pagination
  currentPage: 1,
  rowsPerPage: 10,
  totalCount: 0,
  filters: {},
};

// ✅ GET MEMBERSHIP DETAILS
export const fetchMembershipDetails = createAsyncThunk(
  "membership/fetchDetails",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/membership/details");
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch membership details.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ CREATE/UPDATE MEMBERSHIP DETAIL
export const createOrUpdateMembershipDetail = createAsyncThunk(
  "membership/createOrUpdateDetail",
  async (payload: { id?: string; title: string; description: string }, { rejectWithValue }) => {
    try {
      let response;
      if (payload.id) {
        response = await api.put(`/membership/details/${payload.id}`, payload);
        toast.success("Membership detail updated successfully!");
      } else {
        response = await api.post("/membership/details", payload);
        toast.success("Membership detail created successfully!");
      }
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to save membership detail.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE MEMBERSHIP DETAIL
export const deleteMembershipDetail = createAsyncThunk(
  "membership/deleteDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/membership/details/${id}`);
      toast.success("Membership detail deleted successfully!");
      return id;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete membership detail.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ GET REGISTRATIONS
export const fetchRegistrations = createAsyncThunk(
  "membership/fetchRegistrations",
  async (_, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const filters = state.membership.filters;
      
      // Build query string from filters
      const queryParams = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (value) queryParams.append(key, value as string);
      });

      const url = `/membership/registration${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
      const response = await api.get(url);
      
      // Add default status to registrations if not present
      const registrationsWithStatus = response.data.map((reg: any) => ({
        ...reg,
        status: reg.status || 'pending' // Default to 'pending' if status is not provided
      }));
      
      return registrationsWithStatus;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch registrations.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ CREATE REGISTRATION
export const createRegistration = createAsyncThunk(
  "membership/createRegistration",
  async (payload: {
    name: string;
    email: string;
    phone: string;
    address: string;
    membershipType: string;
  }, { rejectWithValue }) => {
    try {
      const response = await api.post("/membership/registration", payload);
      toast.success("Registration submitted successfully!");
      
      // Add default status to the response
      return {
        ...response.data,
        status: 'pending'
      };
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to submit registration.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ UPDATE REGISTRATION STATUS
export const updateRegistrationStatus = createAsyncThunk(
  "membership/updateRegistrationStatus",
  async ({ id, status }: { id: string; status: 'pending' | 'approved' | 'rejected' }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/membership/registration/${id}`, { status });
      toast.success(`Registration ${status} successfully!`);
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to update registration status.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE REGISTRATION
export const deleteRegistration = createAsyncThunk(
  "membership/deleteRegistration",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/membership/registration/${id}`);
      toast.success("Registration deleted successfully!");
      return id;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete registration.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SEARCH REGISTRATIONS
export const searchRegistrations = createAsyncThunk(
  "membership/searchRegistrations",
  async (query: { email?: string; name?: string }, { rejectWithValue }) => {
    try {
      const response = await api.get("/membership/registration/search", { params: query });
      
      // Add default status to search results
      const registrationsWithStatus = response.data.map((reg: any) => ({
        ...reg,
        status: reg.status || 'pending'
      }));
      
      return registrationsWithStatus;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to search registrations.";
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ GET RULES
export const fetchRules = createAsyncThunk(
  "membership/fetchRules",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/membership/rules");
      return response.data;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch rules.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ CREATE/UPDATE RULE
// In your membershipSlice.ts - update the createOrUpdateRule thunk
export const createOrUpdateRule = createAsyncThunk(
  "membership/createOrUpdateRule",
  async (payload: { type: 'borrower' | 'library'; content: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/membership/rules", payload);
      
      if (response.data && response.data.rule) {
        toast.success("Rule saved successfully!");
        return response.data.rule;
      } else if (response.data) {
        // Handle case where response structure might be different
        toast.success("Rule saved successfully!");
        return response.data;
      } else {
        toast.error("Failed to save rule");
        return rejectWithValue("Failed to save rule");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to save rule. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE RULE
export const deleteRule = createAsyncThunk(
  "membership/deleteRule",
  async (id: string, { rejectWithValue }) => {
    try {
      await api.delete(`/membership/rules/${id}`);
      toast.success("Rule deleted successfully!");
      return id;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete rule.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ GET MEMBER COUNT
export const fetchMemberCount = createAsyncThunk(
  "membership/fetchMemberCount",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/membership/count");
      return response.data.count;
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to fetch member count.";
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SLICE
const membershipSlice = createSlice({
  name: "membership",
  initialState,
  reducers: {
    clearMembershipErrors: (state) => {
      state.detailsError = null;
      state.registrationsError = null;
      state.rulesError = null;
      state.memberCountError = null;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setRowsPerPage: (state, action: PayloadAction<number>) => {
      state.rowsPerPage = action.payload;
    },
    setFilters: (state, action: PayloadAction<any>) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },
    clearFilters: (state) => {
      state.filters = {};
      state.currentPage = 1;
    },
    // Add a manual status update reducer for local state management
    updateRegistrationStatusLocal: (state, action: PayloadAction<{ id: string; status: 'pending' | 'approved' | 'rejected' }>) => {
      const index = state.registrations.findIndex(item => item._id === action.payload.id);
      if (index !== -1) {
        state.registrations[index].status = action.payload.status;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // MEMBERSHIP DETAILS
      .addCase(fetchMembershipDetails.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(fetchMembershipDetails.fulfilled, (state, action) => {
        state.detailsLoading = false;
        state.details = action.payload;
      })
      .addCase(fetchMembershipDetails.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload as string;
      })

      .addCase(createOrUpdateMembershipDetail.pending, (state) => {
        state.detailsLoading = true;
        state.detailsError = null;
      })
      .addCase(createOrUpdateMembershipDetail.fulfilled, (state, action) => {
        state.detailsLoading = false;
        const index = state.details.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.details[index] = action.payload;
        } else {
          state.details.push(action.payload);
        }
      })
      .addCase(createOrUpdateMembershipDetail.rejected, (state, action) => {
        state.detailsLoading = false;
        state.detailsError = action.payload as string;
      })

      .addCase(deleteMembershipDetail.fulfilled, (state, action) => {
        state.details = state.details.filter(item => item._id !== action.payload);
      })

      // REGISTRATIONS
      .addCase(fetchRegistrations.pending, (state) => {
        state.registrationsLoading = true;
        state.registrationsError = null;
      })
      .addCase(fetchRegistrations.fulfilled, (state, action) => {
        state.registrationsLoading = false;
        state.registrations = action.payload;
        state.totalCount = action.payload.length;
      })
      .addCase(fetchRegistrations.rejected, (state, action) => {
        state.registrationsLoading = false;
        state.registrationsError = action.payload as string;
      })

      .addCase(createRegistration.fulfilled, (state, action) => {
        state.registrations.unshift(action.payload);
        state.totalCount = state.registrations.length;
      })

      .addCase(updateRegistrationStatus.fulfilled, (state, action) => {
        const index = state.registrations.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.registrations[index] = {
            ...state.registrations[index],
            ...action.payload,
            status: action.payload.status || state.registrations[index].status
          };
        }
      })

      .addCase(deleteRegistration.fulfilled, (state, action) => {
        state.registrations = state.registrations.filter(item => item._id !== action.payload);
        state.totalCount = state.registrations.length;
      })

      .addCase(searchRegistrations.fulfilled, (state, action) => {
        state.registrations = action.payload;
        state.totalCount = action.payload.length;
      })

      // RULES
      .addCase(fetchRules.pending, (state) => {
        state.rulesLoading = true;
        state.rulesError = null;
      })
      .addCase(fetchRules.fulfilled, (state, action) => {
        state.rulesLoading = false;
        state.rules = action.payload;
      })
      .addCase(fetchRules.rejected, (state, action) => {
        state.rulesLoading = false;
        state.rulesError = action.payload as string;
      })

      .addCase(createOrUpdateRule.fulfilled, (state, action) => {
        const index = state.rules.findIndex(item => item._id === action.payload._id);
        if (index !== -1) {
          state.rules[index] = action.payload;
        } else {
          state.rules.push(action.payload);
        }
      })

      .addCase(deleteRule.fulfilled, (state, action) => {
        state.rules = state.rules.filter(item => item._id !== action.payload);
      })

      // MEMBER COUNT
      .addCase(fetchMemberCount.pending, (state) => {
        state.memberCountLoading = true;
        state.memberCountError = null;
      })
      .addCase(fetchMemberCount.fulfilled, (state, action) => {
        state.memberCountLoading = false;
        state.memberCount = action.payload;
      })
      .addCase(fetchMemberCount.rejected, (state, action) => {
        state.memberCountLoading = false;
        state.memberCountError = action.payload as string;
      });
  },
});

export const { 
  clearMembershipErrors, 
  setCurrentPage, 
  setRowsPerPage,
  setFilters,
  clearFilters,
  updateRegistrationStatusLocal
} = membershipSlice.actions;
export default membershipSlice.reducer;