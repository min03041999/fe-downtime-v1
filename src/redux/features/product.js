import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "../services/product.services";

export const get_report_damage = createAsyncThunk("damage_report/getTaskInfo", async ({ id_user_request }) => {
    try {
        const data = await ProductServices.get_report_damage(id_user_request);
        return data;
    } catch (error) {
        return error.message;
    }
})

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
        builder.addCase(get_report_damage.fulfilled, (state, action) => {
            state.data = action.payload.data;
        });
        builder.addCase(report_damage.rejected, (state, action) => {
            state.errorCode = action.payload.error_code;
            state.errorMessage = action.payload.error_message;
        });
        builder.addCase(report_damage.fulfilled, (state, action) => {
            state.errorCode = action.payload.error_code;
            state.errorMessage = action.payload.error_message;
        });
    },
});

const { reducer } = productSlice;
export default reducer;
