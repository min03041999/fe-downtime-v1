import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "../services/product.services";

export const setErrorCode = (errorCode) => {
    console.log(errorCode);
    return {
        type: 'product/setErrorCode',
        payload: errorCode,
    };
};


export const get_report_damage = createAsyncThunk("damage_report/getTaskInfo", async ({ id_user_request, factory }) => {
    try {
        const data = await ProductServices.get_report_damage(id_user_request, factory);
        return data;
    } catch (error) {
        return error.message;
    }
})

export const report_damage = createAsyncThunk(
    "/damage_report/callMechanic",
    async ({ id_machine, id_user_request, remark, factory, fixer }) => {
        try {
            const data = await ProductServices.report_damage(id_machine, id_user_request, remark, factory, fixer);
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
    reducers: {
        setErrorCode: (state, action) => {
            state.errorCode = action.payload;
        },
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
