import {Category} from "../types";
import {createSlice} from "@reduxjs/toolkit";
import {createCategory, deleteCategory, fetchCategories} from "./categoriesThunk";

export interface CategoriesState{
    items: Category[];
    createCategoriesLoading: boolean;
    fetchLoading: boolean;
    deleteLoading: false | string;
}

const initialState: CategoriesState = {
    items: [],
    createCategoriesLoading: false,
    fetchLoading: false,
    deleteLoading: false ,
};

export const categoriesSlice = createSlice({
    name:'categories',
    initialState,
    reducers:{},
    extraReducers:builder => {
        builder
            .addCase(fetchCategories.pending, (state) => {
                state.fetchLoading = true;
            })
            .addCase(fetchCategories.fulfilled, (state, { payload: items }) => {
                state.fetchLoading = false;
                state.items = items;
            })
            .addCase(fetchCategories.rejected, (state) => {
                state.fetchLoading = false;
            });

        builder
            .addCase(deleteCategory.pending, (state, { meta: { arg: dishId } }) => {
                state.deleteLoading = dishId;
            })
            .addCase(deleteCategory.fulfilled, (state) => {
                state.deleteLoading = false;
            })
            .addCase(deleteCategory.rejected, (state) => {
                state.deleteLoading = false;
            });

        builder
            .addCase(createCategory.pending, (state) => {
                state.createCategoriesLoading = true;
            })
            .addCase(createCategory.fulfilled, (state) => {
                state.createCategoriesLoading = false;
            })
            .addCase(createCategory.rejected, (state) => {
                state.createCategoriesLoading = false;
            });
        },
    selectors: {
        selectCategories: (state) => state.items,
        selectFetchCategoriesLoading: (state) => state.fetchLoading,
        selectDeleteCategoryLoading: (state) => state.deleteLoading,
        selectCreateCategoryLoading: (state) => state.createCategoriesLoading,
    },
});

export const categoriesReducer = categoriesSlice.reducer;


export const {
    selectCategories,
    selectFetchCategoriesLoading,
    selectDeleteCategoryLoading,
    selectCreateCategoryLoading,
} = categoriesSlice.selectors;