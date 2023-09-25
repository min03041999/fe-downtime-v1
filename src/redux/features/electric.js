import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ElectricServices from "../services/electric.services";

export const get_task_damage = createAsyncThunk("/task/getMehalist", async ({ area }) => {
    try {
        const data = await ElectricServices.get_task_damage(area);
        return data;
    } catch (error) {
        return error.message;
    }
})

export const electricSlice = createSlice({
    name: "electric",
    initialState: {
        errorCode: null,
        errorMessage: "",
        dataTaskReportDamageList: [],
    },
    extraReducers: (builder) => {
        builder.addCase(get_task_damage.fulfilled, (state, action) => {
            state.dataTaskReportDamageList = action.payload.data;
        });
    }
})

const { reducer } = electricSlice;
export default reducer;