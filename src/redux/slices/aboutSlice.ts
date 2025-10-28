// src/redux/slices/aboutSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

// --- Interfaces ---
interface CommitteeMember {
  serialNumber: number;
  member: string;
  designation: string;
}

interface Timing {
  libraryHours: string;
  weeklyHoliday: string;
  otherHolidays: string;
}

interface AboutData {
  administrationDescription: string;
  timingAndHolidays: Timing;
  managementCommittee: CommitteeMember[];
  imageUrl: string;
  ispublished: boolean;
}

interface AboutState {
  data: AboutData | null;
  loading: boolean;
  error: string | null;
}

// Empty about data structure
const emptyAboutData: AboutData = {
  administrationDescription: '',
  timingAndHolidays: {
    libraryHours: '',
    weeklyHoliday: '',
    otherHolidays: ''
  },
  managementCommittee: [],
  imageUrl: '',
  ispublished: false
};

const initialState: AboutState = {
  data: null,
  loading: false,
  error: null,
};

// ✅ GET ABOUT (Public - only published)
export const fetchPublishedAbout = createAsyncThunk(
  "about/fetchPublished",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/about");
      return response.data;
    } catch (error: any) {
      // Return empty data instead of default
      return emptyAboutData;
    }
  }
);

// ✅ GET ABOUT FOR ADMIN (Draft or published)
export const fetchAboutForAdmin = createAsyncThunk(
  "about/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/about/admin");
      const data = response.data;
      
      // Return empty data if no data exists
      if (!data) {
        return emptyAboutData;
      }
      
      // Ensure all arrays and objects exist with empty fallbacks
      return {
        administrationDescription: data?.administrationDescription || '',
        timingAndHolidays: {
          libraryHours: data?.timingAndHolidays?.libraryHours || '',
          weeklyHoliday: data?.timingAndHolidays?.weeklyHoliday || '',
          otherHolidays: data?.timingAndHolidays?.otherHolidays || ''
        },
        managementCommittee: data?.managementCommittee || [],
        imageUrl: data?.imageUrl || '',
        ispublished: data?.ispublished || false
      };
    } catch (error: any) {
      console.error('Fetch about error:', error);
      // Return empty data on error
      return emptyAboutData;
    }
  }
);

// ✅ UPDATE ABOUT DRAFT
export const updateAboutDraft = createAsyncThunk(
  "about/updateDraft",
  async (payload: AboutData, { rejectWithValue }) => {
    try {
      const response = await api.put("/about/admin", payload);
      const data = response.data;

      if (data) {
        toast.success("About draft updated successfully!");
        return data;
      } else {
        toast.error("Failed to update about draft");
        return rejectWithValue("Failed to update about draft");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to update about. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ PUBLISH ABOUT
export const publishAbout = createAsyncThunk(
  "about/publish",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await api.post("/about/admin/publish");
      const data = response.data;

      if (data) {
        toast.success("About published successfully!");
        return data.about;
      } else {
        toast.error("Failed to publish about");
        return rejectWithValue("Failed to publish about");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to publish about. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ ADD COMMITTEE MEMBER
export const addCommitteeMember = createAsyncThunk(
  "about/addCommitteeMember",
  async (member: Omit<CommitteeMember, 'serialNumber'>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const currentData = state.about.data || emptyAboutData;
      
      const newSerialNumber = currentData.managementCommittee.length > 0 
        ? Math.max(...currentData.managementCommittee.map(m => m.serialNumber)) + 1 
        : 1;

      const updatedCommittee = [
        ...currentData.managementCommittee,
        { ...member, serialNumber: newSerialNumber }
      ];

      const updatedData = {
        ...currentData,
        managementCommittee: updatedCommittee
      };

      const response = await api.put("/about/admin", updatedData);
      const data = response.data;

      if (data) {
        toast.success("Committee member added successfully!");
        return data;
      } else {
        toast.error("Failed to add committee member");
        return rejectWithValue("Failed to add committee member");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to add committee member. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE COMMITTEE MEMBER
export const deleteCommitteeMember = createAsyncThunk(
  "about/deleteCommitteeMember",
  async (index: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const currentData = state.about.data || emptyAboutData;
      
      const updatedCommittee = currentData.managementCommittee.filter((_, i) => i !== index);

      const updatedData = {
        ...currentData,
        managementCommittee: updatedCommittee
      };

      const response = await api.put("/about/admin", updatedData);
      const data = response.data;

      if (data) {
        toast.success("Committee member deleted successfully!");
        return data;
      } else {
        toast.error("Failed to delete committee member");
        return rejectWithValue("Failed to delete committee member");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete committee member. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SLICE
const aboutSlice = createSlice({
  name: "about",
  initialState,
  reducers: {
    clearAboutError: (state) => {
      state.error = null;
    },
    setAboutData: (state, action: PayloadAction<AboutData>) => {
      state.data = action.payload;
      localStorage.setItem("aboutData", JSON.stringify(action.payload));
    },
    clearAboutData: (state) => {
      state.data = null;
      localStorage.removeItem("aboutData");
    },
    resetToEmptyAbout: (state) => {
      state.data = emptyAboutData;
      localStorage.setItem("aboutData", JSON.stringify(emptyAboutData));
      toast.success("About reset to empty!");
    },
    initializeEmptyAbout: (state) => {
      if (!state.data) {
        state.data = emptyAboutData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PUBLISHED ABOUT
      .addCase(fetchPublishedAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPublishedAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = emptyAboutData;
      })

      // FETCH ADMIN ABOUT
      .addCase(fetchAboutForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("aboutData", JSON.stringify(action.payload));
      })
      .addCase(fetchAboutForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = emptyAboutData;
      })

      // UPDATE DRAFT
      .addCase(updateAboutDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAboutDraft.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("aboutData", JSON.stringify(action.payload));
      })
      .addCase(updateAboutDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // PUBLISH
      .addCase(publishAbout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishAbout.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("aboutData", JSON.stringify(action.payload));
      })
      .addCase(publishAbout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD COMMITTEE MEMBER
      .addCase(addCommitteeMember.fulfilled, (state, action) => {
        state.data = action.payload;
        localStorage.setItem("aboutData", JSON.stringify(action.payload));
      })

      // DELETE COMMITTEE MEMBER
      .addCase(deleteCommitteeMember.fulfilled, (state, action) => {
        state.data = action.payload;
        localStorage.setItem("aboutData", JSON.stringify(action.payload));
      });
  },
});

export const { 
  clearAboutError, 
  setAboutData, 
  clearAboutData, 
  resetToEmptyAbout,
  initializeEmptyAbout
} = aboutSlice.actions;
export default aboutSlice.reducer;