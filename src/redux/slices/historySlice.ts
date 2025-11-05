import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

interface HistoryData {
  firmName: string;
  establishedYear: string;
  locationHistory: string;
  architect: string;
  architectureStyle: string;
  collectionHistory: string;
  description: string;
}

interface HistoryState {
  data: HistoryData | null;
  loading: boolean;
  error: string | null;
}

const initialState: HistoryState = {
  data: JSON.parse(localStorage.getItem("historyData") || "null"),
  loading: false,
  error: null,
};

// Default history data structure
const defaultHistoryData: HistoryData = {
  firmName: 'Prayagraj Public Library',
  establishedYear: '1864',
  locationHistory: 'Chandrashekhar Azad Park in Prayagraj, India',
  architect: 'Richard Roskell Bayne',
  architectureStyle: 'Scottish Baronial Revival architecture',
  collectionHistory: '125,000 Books, 40 Types of Magazines, 28 different newspapers in Hindi, English, Urdu and Bangla',
  description: 'Established in 1864, it is the biggest library in the state of Uttar Pradesh. The monument served as the house of legislative assembly in the British Raj when Allahabad was the capital of the United Provinces. In 1879, the Public library was shifted to the present premises at Chandrashekhar Azad Park. The building known as Thornhill Mayne Memorial is situated at Alfred Park[5] and was designed by Richard Roskell Bayne in Scottish Baronial architecture with sharp pillars and trunks of orchids and seedstone.'
};

// Helper function to parse history content
const parseHistoryContent = (content: any): HistoryData => {
  if (!content) return defaultHistoryData;
  
  try {
    // If content is already an object, return it
    if (typeof content === 'object' && content !== null && content.firmName) {
      return { ...defaultHistoryData, ...content };
    }
    
    // If content is a string, try to parse it as JSON
    if (typeof content === 'string') {
      // Check if it's a JSON string
      if (content.trim().startsWith('{')) {
        const parsed = JSON.parse(content);
        return { ...defaultHistoryData, ...parsed };
      }
      // If it's just a simple string, use default data
      return defaultHistoryData;
    }
    
    return defaultHistoryData;
  } catch (error) {
    console.error('Error parsing history content:', error);
    return defaultHistoryData;
  }
};

// ✅ GET HISTORY
export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/history");
      const data = response.data;

      if (data) {
        const historyData = parseHistoryContent(data.content);
        return historyData;
      } else {
        return defaultHistoryData;
      }
    } catch (error: any) {
      console.error('Fetch history error:', error);
      // Don't show error toast for GET, just return default data
      return defaultHistoryData;
    }
  }
);

// ✅ UPDATE HISTORY

export const updateHistory = createAsyncThunk(
  "history/updateHistory",
  async (payload: HistoryData, { rejectWithValue }) => {
    try {
      const response = await api.put("/history", { 
        content: JSON.stringify(payload) 
      });
      const data = response.data;

      if (data) {
        toast.success("History updated successfully!"); // ✅ This should show
        return payload;
      } else {
        toast.error("Failed to update history");
        return rejectWithValue("Failed to update history");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to update history. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);


export const deleteHistory = createAsyncThunk(
  "history/deleteHistory",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete("/history");
      const data = response.data;

      if (data) {
        toast.success("History deleted successfully!"); // ✅ This should show
        return null;
      } else {
        toast.error("Failed to delete history");
        return rejectWithValue("Failed to delete history");
      }
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to delete history. Please try again.";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SLICE
const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    clearHistoryError: (state) => {
      state.error = null;
    },
    setHistoryData: (state, action: PayloadAction<HistoryData>) => {
      state.data = action.payload;
      localStorage.setItem("historyData", JSON.stringify(action.payload));
    },
    clearHistoryData: (state) => {
      state.data = null;
      localStorage.removeItem("historyData");
    },
    resetToDefaultHistory: (state) => {
      state.data = defaultHistoryData;
      localStorage.setItem("historyData", JSON.stringify(defaultHistoryData));
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH HISTORY
      .addCase(fetchHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHistory.fulfilled, (state, action: PayloadAction<HistoryData>) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("historyData", JSON.stringify(action.payload));
      })
      .addCase(fetchHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = defaultHistoryData; // Fallback to default data
      })

      // UPDATE HISTORY
      .addCase(updateHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHistory.fulfilled, (state, action: PayloadAction<HistoryData>) => {
        state.loading = false;
        state.data = action.payload;
        localStorage.setItem("historyData", JSON.stringify(action.payload));
      })
      .addCase(updateHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE HISTORY
      .addCase(deleteHistory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHistory.fulfilled, (state) => {
        state.loading = false;
        state.data = defaultHistoryData; // Reset to default after delete
        localStorage.setItem("historyData", JSON.stringify(defaultHistoryData));
      })
      .addCase(deleteHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { 
  clearHistoryError, 
  setHistoryData, 
  clearHistoryData, 
  resetToDefaultHistory 
} = historySlice.actions;
export default historySlice.reducer;