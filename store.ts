import { configureStore } from "@reduxjs/toolkit";
import { locationApi } from "./redux/locationSlice";
import { submissionApi } from "./redux/SubmissionSlice";
import { galleryApi } from "./redux/GallerySlice";
import { AdminSlice } from "./redux/AdminSlice";

const store = configureStore({
    reducer:{
        [locationApi.reducerPath]:locationApi.reducer , 
        [submissionApi.reducerPath]:submissionApi.reducer , 
        [galleryApi.reducerPath]:galleryApi.reducer , 
        [AdminSlice.reducerPath] :AdminSlice.reducer
    },
    middleware:(getDefaultMiddleware) =>
    getDefaultMiddleware().concat(locationApi.middleware).concat(submissionApi.middleware).concat(galleryApi.middleware).concat(AdminSlice.middleware),
})

export default store