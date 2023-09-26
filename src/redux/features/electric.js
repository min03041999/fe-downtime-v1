import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ElectricServices from "../services/electric.services";

//Get Task => Manager
export const get_task_damage = createAsyncThunk("/task/getMehalist", async ({ factory, floor }) => {
    try {
        const data = await ElectricServices.get_task_damage(factory, floor);
        return data;
    } catch (error) {
        return error.message;
    }
})

//List Status => Employee
export const get_report_damage = createAsyncThunk("damage_report/getTaskInfo", async ({ id_user_request, factory }) => {
    try {
        const data = await ElectricServices.get_report_damage(id_user_request, factory);
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