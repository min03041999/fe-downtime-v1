import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ElectricServices from "../services/electric.services";

//common
export const setErrorCode = (errorCode) => {
    return {
        type: 'electric/setErrorCode',
        payload: errorCode,
    };
};


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
export const get_work_list_report_employee = createAsyncThunk("/task/getTaskmechaInfo", async ({ id_user_mechanic, factory }) => {
    try {
        const data = await ElectricServices.get_work_list_report_employee(id_user_mechanic, factory);
        return data;
    } catch (error) {
        return error.message;
    }
})

export const scanner_fix_mechanic = createAsyncThunk("/task/mechanicAccept", async ({ id_user_mechanic, id_machine, factory }) => {
    try {
        const data = await ElectricServices.scanner_fix_mechanic(id_user_mechanic, id_machine, factory);
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
        dataTaskReportDamageList: [], //Manager
        workListReportEmployee: [], // Mechanic Employee
    },
    reducers: {
        setErrorCode: (state, action) => {
            state.errorCode = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(get_task_damage.fulfilled, (state, action) => {
            state.dataTaskReportDamageList = action.payload.data;
        });
        builder.addCase(get_work_list_report_employee.fulfilled, (state, action) => {
            state.workListReportEmployee = action.payload.data;
        });
        builder.addCase(scanner_fix_mechanic.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    }
})

const { reducer } = electricSlice;
export default reducer;