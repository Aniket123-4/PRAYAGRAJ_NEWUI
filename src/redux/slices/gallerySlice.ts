// src/redux/slices/gallerySlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import api from "../../utils/Url";

interface Event {
  _id: string;
  name: string;
  description?: string;
  createdAt: string;
}

interface GalleryImage {
  _id: string;
  eventId: string;
  imageData: string; // Changed from imageUrl to imageData for Base64
  uploadedAt: string;
}

interface GalleryState {
  events: Event[];
  images: GalleryImage[];
  loading: boolean;
  error: string | null;
  currentEvent: Event | null;
}

const initialState: GalleryState = {
  events: [],
  images: [],
  loading: false,
  error: null,
  currentEvent: null,
};

// ✅ GET ALL EVENTS
export const fetchEvents = createAsyncThunk(
  "gallery/fetchEvents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/gallery/events");
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to load events";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ CREATE EVENT
export const createEvent = createAsyncThunk(
  "gallery/createEvent",
  async (payload: { name: string; description?: string }, { rejectWithValue }) => {
    try {
      const response = await api.post("/gallery/events", payload);
      toast.success("Event created successfully!");
      return response.data;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to create event";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE EVENT
export const deleteEvent = createAsyncThunk(
  "gallery/deleteEvent",
  async (eventId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/gallery/events/${eventId}`);
      toast.success("Event deleted successfully!");
      return eventId;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to delete event";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ UPLOAD IMAGES TO EVENT (Base64)
export const uploadImagesToEvent = createAsyncThunk(
  "gallery/uploadImagesToEvent",
  async ({ eventId, files }: { eventId: string; files: File[] }, { rejectWithValue }) => {
    try {
      // Convert files to Base64 strings
      const base64Images = await Promise.all(
        files.map(file => convertToBase64(file))
      );

      const payload = {
        images: base64Images
      };

      const response = await api.post(`/gallery/${eventId}/images`, payload);
      toast.success("Images uploaded successfully!");
      return { eventId, images: response.data.uploaded };
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to upload images";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// Helper function to convert File to Base64
const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // Remove the data:image/...;base64, prefix if you only want the base64 string
      // Or keep it if your backend expects the full data URL
      const base64String = reader.result as string;
      resolve(base64String);
    };
    reader.onerror = error => reject(error);
  });
};

// ✅ GET IMAGES BY EVENT
export const fetchImagesByEvent = createAsyncThunk(
  "gallery/fetchImagesByEvent",
  async (eventId: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/gallery/${eventId}/images`);
      return { eventId, images: response.data };
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to load images";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ DELETE IMAGE
export const deleteImage = createAsyncThunk(
  "gallery/deleteImage",
  async (imageId: string, { rejectWithValue }) => {
    try {
      await api.delete(`/gallery/image/${imageId}`);
      toast.success("Image deleted successfully!");
      return imageId;
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Failed to delete image";
      toast.error(errorMsg);
      return rejectWithValue(errorMsg);
    }
  }
);

// ✅ SLICE
const gallerySlice = createSlice({
  name: "gallery",
  initialState,
  reducers: {
    clearGalleryError: (state) => {
      state.error = null;
    },
    setCurrentEvent: (state, action: PayloadAction<Event | null>) => {
      state.currentEvent = action.payload;
    },
    clearImages: (state) => {
      state.images = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // FETCH EVENTS
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action: PayloadAction<Event[]>) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // CREATE EVENT
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createEvent.fulfilled, (state, action: PayloadAction<Event>) => {
        state.loading = false;
        state.events.unshift(action.payload);
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE EVENT
      .addCase(deleteEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteEvent.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.events = state.events.filter(event => event._id !== action.payload);
        if (state.currentEvent?._id === action.payload) {
          state.currentEvent = null;
          state.images = [];
        }
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // UPLOAD IMAGES
      .addCase(uploadImagesToEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImagesToEvent.fulfilled, (state, action: PayloadAction<{ eventId: string; images: GalleryImage[] }>) => {
        state.loading = false;
        state.images = [...state.images, ...action.payload.images];
      })
      .addCase(uploadImagesToEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // FETCH IMAGES BY EVENT
      .addCase(fetchImagesByEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchImagesByEvent.fulfilled, (state, action: PayloadAction<{ eventId: string; images: GalleryImage[] }>) => {
        state.loading = false;
        state.images = action.payload.images;
      })
      .addCase(fetchImagesByEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // DELETE IMAGE
      .addCase(deleteImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteImage.fulfilled, (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.images = state.images.filter(image => image._id !== action.payload);
      })
      .addCase(deleteImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearGalleryError, setCurrentEvent, clearImages } = gallerySlice.actions;
export default gallerySlice.reducer;