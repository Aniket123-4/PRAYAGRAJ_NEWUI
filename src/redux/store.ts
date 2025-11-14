import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import themeSlice from "./slices/themeSlice";
import booksSlice from "./slices/booksSlice";
import eventsSlice from "./slices/eventsSlice";
import noticesSlice from "./slices/noticesSlice";
import archivesSlice from "./slices/archivesSlice";
import manuscriptsSlice from "./slices/manuscriptSlice";
import historyReducer from "./slices/historySlice";
import galleryReducer from "./slices/gallerySlice";
import collectionReducer from "./slices/collectionSlice"
import aboutReducer from "./slices/aboutSlice"
import eserviceReducer from "./slices/eserviceSlice"
import membershipReducer from "./slices/membershipSlice";
import menuReducer from "./slices/menuSlice";
import roleReducer from "./slices/roleSlice";
import userReducer from "./slices/userSlice";
import userpermissionReducer from "./slices/userPermissionSlice";
import usertypeReducer from "./slices/userTypeSlice";
import genderReducer from "./slices/genderSlice";
import helpReducer from "./slices/helpSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    theme: themeSlice,
    books: booksSlice,
    events: eventsSlice,
    notices: noticesSlice,
    archives: archivesSlice,
    manuscript: manuscriptsSlice,
    history: historyReducer,
    gallery: galleryReducer,
    collection:collectionReducer,
    about:aboutReducer,
    eservice:eserviceReducer,
    membership:membershipReducer,
    menu:menuReducer,
    role:roleReducer,
    user:userReducer,
    userPermission:userpermissionReducer,
    usertype:usertypeReducer,
    gender:genderReducer,
    help: helpReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
