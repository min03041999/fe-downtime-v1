import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "../services/product.services";

export const report_damage = createAsyncThunk(
    "/damage_report/callMechanic",
    async ({ id_machine, id_user_request, remark }) => {
        try {
            const data = await ProductServices.report_damage(id_machine, id_user_request, remark);
            return data;
        } catch (error) {
            return error.message;
        }
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState: {
        errorCode: null,
        errorMessage: "",
        data: null,
    },
    extraReducers: (builder) => {
        builder.addCase(report_damage.rejected, (state, action) => {
            state.errorCode = action.payload.error_code;
            state.errorMessage = action.payload.error_message;
        });
        builder.addCase(report_damage.fulfilled, (state, action) => {
            state.errorCode = action.payload.error_code;
            state.data = action.payload.data;
            state.errorMessage = action.payload.error_message;
        });
    },
});

const { reducer } = productSlice;
export default reducer;
