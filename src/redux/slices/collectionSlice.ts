// src/redux/slices/collectionSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

// --- Interfaces ---
interface OldBoundVolume {
  name: string;
  duration: string;
}

interface OldMagazine {
  name: string;
  duration: string;
}

interface Gazette {
  name: string;
  duration: string;
}

interface CurrentNewspaper {
  name: string;
  language: string;
  edition: string;
}

interface CurrentMagazine {
  serialNo: number;
  name: string;
  copies: string;
  literature: string;
}

interface CollectionData {
  diverseCollectionText: string;
  oldBoundVolumes: OldBoundVolume[];
  oldMagazines: OldMagazine[];
  gazettes: Gazette[];
  currentNewspapers: CurrentNewspaper[];
  currentMagazines: CurrentMagazine[];
  isPublished: boolean;
}

interface CollectionState {
  data: CollectionData | null;
  loading: boolean;
  error: string | null;
}

// Empty collection data structure
const emptyCollectionData: CollectionData = {
  diverseCollectionText: '',
  oldBoundVolumes: [],
  oldMagazines: [],
  gazettes: [],
  currentNewspapers: [],
  currentMagazines: [],
  isPublished: false
};

const initialState: CollectionState = {
  data: null,
  loading: false,
  error: null,
};

// ✅ GET COLLECTION (Public - only published)
export const fetchPublishedCollection = createAsyncThunk(
  "collection/fetchPublished",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/collection");
      return response.data;
    } catch (error: any) {
      // Return empty data instead of default
      return emptyCollectionData;
    }
  }
);

// ✅ GET COLLECTION FOR ADMIN (Draft or published)
export const fetchCollectionForAdmin = createAsyncThunk(
  "collection/fetchAdmin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/collection/admin");
      const data = response.data;
      
      // Return empty data if no data exists
      if (!data) {
        return emptyCollectionData;
      }
      
      // Ensure all arrays exist with empty fallbacks
      return {
        diverseCollectionText: data?.diverseCollectionText || '',
        oldBoundVolumes: data?.oldBoundVolumes || [],
        oldMagazines: data?.oldMagazines || [],
        gazettes: data?.gazettes || [],
        currentNewspapers: data?.currentNewspapers || [],
        currentMagazines: data?.currentMagazines || [],
        isPublished: data?.isPublished || false
      };
    } catch (error: any) {
      console.error('Fetch collection error:', error);
      // Return empty data on error
      return emptyCollectionData;
    }
  }
);

// ✅ UPDATE COLLECTION DRAFT
export const updateCollectionDraft = createAsyncThunk(
  "collection/updateDraft",
  async (payload: CollectionData, { rejectWithValue }) => {
    try {
      const response = await api.put("/collection/admin", payload);
      const data = response.data;

      if (data) {
        toast.success("Collection draft updated successfully!");
        return data;
      } else {
        toast.error("Failed to update collection draft");
        return rejectWithValue("Failed to update collection draft");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to update collection. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ PUBLISH COLLECTION
export const publishCollection = createAsyncThunk(
  "collection/publish",
  async (_, { rejectWithValue, getState }) => {
    try {
      const response = await api.post("/collection/admin/publish");
      const data = response.data;

      if (data) {
        toast.success("Collection published successfully!");
        return data.collection;
      } else {
        toast.error("Failed to publish collection");
        return rejectWithValue("Failed to publish collection");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to publish collection. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ ADD CURRENT NEWSPAPER
export const addCurrentNewspaper = createAsyncThunk(
  "collection/addNewspaper",
  async (newspaper: Omit<CurrentNewspaper, 'id'>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const currentData = state.collection.data || emptyCollectionData;
      
      const updatedNewspapers = [
        ...(currentData.currentNewspapers || []),
        { ...newspaper }
      ];

      const updatedData = {
        ...currentData,
        currentNewspapers: updatedNewspapers
      };

      const response = await api.put("/collection/admin", updatedData);
      const data = response.data;

      if (data) {
        toast.success("Newspaper added successfully!");
        return data;
      } else {
        toast.error("Failed to add newspaper");
        return rejectWithValue("Failed to add newspaper");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to add newspaper. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ ADD CURRENT MAGAZINE
export const addCurrentMagazine = createAsyncThunk(
  "collection/addMagazine",
  async (magazine: Omit<CurrentMagazine, 'serialNo'>, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const currentData = state.collection.data || emptyCollectionData;
      
      const currentMagazines = currentData.currentMagazines || [];
      const newSerialNo = currentMagazines.length > 0 
        ? Math.max(...currentMagazines.map(m => m.serialNo)) + 1 
        : 1;

      const updatedMagazines = [
        ...currentMagazines,
        { ...magazine, serialNo: newSerialNo }
      ];

      const updatedData = {
        ...currentData,
        currentMagazines: updatedMagazines
      };

      const response = await api.put("/collection/admin", updatedData);
      const data = response.data;

      if (data) {
        toast.success("Magazine added successfully!");
        return data;
      } else {
        toast.error("Failed to add magazine");
        return rejectWithValue("Failed to add magazine");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to add magazine. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE CURRENT NEWSPAPER
export const deleteCurrentNewspaper = createAsyncThunk(
  "collection/deleteNewspaper",
  async (index: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const currentData = state.collection.data || emptyCollectionData;
      
      const currentNewspapers = currentData.currentNewspapers || [];
      const updatedNewspapers = currentNewspapers.filter((_, i) => i !== index);

      const updatedData = {
        ...currentData,
        currentNewspapers: updatedNewspapers
      };

      const response = await api.put("/collection/admin", updatedData);
      const data = response.data;

      if (data) {
        toast.success("Newspaper deleted successfully!");
        return data;
      } else {
        toast.error("Failed to delete newspaper");
        return rejectWithValue("Failed to delete newspaper");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete newspaper. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE CURRENT MAGAZINE
export const deleteCurrentMagazine = createAsyncThunk(
  "collection/deleteMagazine",
  async (index: number, { rejectWithValue, getState }) => {
    try {
      const state = getState() as any;
      const currentData = state.collection.data || emptyCollectionData;
      
      const currentMagazines = currentData.currentMagazines || [];
      const updatedMagazines = currentMagazines.filter((_, i) => i !== index);

      const updatedData = {
        ...currentData,
        currentMagazines: updatedMagazines
      };

      const response = await api.put("/collection/admin", updatedData);
      const data = response.data;

      if (data) {
        toast.success("Magazine deleted successfully!");
        return data;
      } else {
        toast.error("Failed to delete magazine");
        return rejectWithValue("Failed to delete magazine");
      }
    } catch (error: any) {
      const errorMsg =
        error.response?.data?.message || "Failed to delete magazine. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SLICE
const collectionSlice = createSlice({
  name: "collection",
  initialState,
  reducers: {
    clearCollectionError: (state) => {
      state.error = null;
    },
    setCollectionData: (state, action: PayloadAction<CollectionData>) => {
      state.data = action.payload;
      localStorage.setItem("collectionData", JSON.stringify(action.payload));
    },
    clearCollectionData: (state) => {
      state.data = null;
      localStorage.removeItem("collectionData");
    },
    resetToEmptyCollection: (state) => {
      state.data = emptyCollectionData;
      localStorage.setItem("collectionData", JSON.stringify(emptyCollectionData));
      toast.success("Collection reset to empty!");
    },
    initializeEmptyCollection: (state) => {
      if (!state.data) {
        state.data = emptyCollectionData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH PUBLISHED COLLECTION
      .addCase(fetchPublishedCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPublishedCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchPublishedCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = emptyCollectionData;
      })

      // FETCH ADMIN COLLECTION
      .addCase(fetchCollectionForAdmin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCollectionForAdmin.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("collectionData", JSON.stringify(action.payload));
      })
      .addCase(fetchCollectionForAdmin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = emptyCollectionData;
      })

      // UPDATE DRAFT
      .addCase(updateCollectionDraft.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCollectionDraft.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("collectionData", JSON.stringify(action.payload));
      })
      .addCase(updateCollectionDraft.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // PUBLISH
      .addCase(publishCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(publishCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("collectionData", JSON.stringify(action.payload));
      })
      .addCase(publishCollection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // ADD NEWSPAPER
      .addCase(addCurrentNewspaper.fulfilled, (state, action) => {
        state.data = action.payload;
        localStorage.setItem("collectionData", JSON.stringify(action.payload));
      })

      // ADD MAGAZINE
      .addCase(addCurrentMagazine.fulfilled, (state, action) => {
        state.data = action.payload;
        localStorage.setItem("collectionData", JSON.stringify(action.payload));
      })

      // DELETE NEWSPAPER
      .addCase(deleteCurrentNewspaper.fulfilled, (state, action) => {
        state.data = action.payload;
        localStorage.setItem("collectionData", JSON.stringify(action.payload));
      })

      // DELETE MAGAZINE
      .addCase(deleteCurrentMagazine.fulfilled, (state, action) => {
        state.data = action.payload;
        localStorage.setItem("collectionData", JSON.stringify(action.payload));
      });
  },
});

export const { 
  clearCollectionError, 
  setCollectionData, 
  clearCollectionData, 
  resetToEmptyCollection,
  initializeEmptyCollection
} = collectionSlice.actions;
export default collectionSlice.reducer;