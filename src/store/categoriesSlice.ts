import {Category} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCategories} from "./categoriesThunk";


export interface CategoriesState{
    items: Category[];
    createCategoriesLoading: boolean;
}

const initialState: CategoriesState = {
    items: [],
    createCategoriesLoading: false,
};

export const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(createCategories.pending, (state) => {
                state.createCategoriesLoading = true;
            })
            .addCase(createCategories.fulfilled, (state) => {
                state.createCategoriesLoading = false;
            })
            .addCase(createCategories.rejected, (state) => {
                state.createCategoriesLoading = false;
            });
        },
    selectors: {
        selectCreateCategoryLoading: (state) => state.createCategoriesLoading,
    },
});

export const categoriesReducer = categoriesSlice.reducer;


export const {
    selectCreateCategoryLoading,
} = categoriesSlice.selectors;