import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ElectricServices from "../services/electric.services";

//common
export const setErrorCode = (errorCode, errorMessage) => {
    return {
        type: 'electric/setErrorCode',
        payload: {
            errorCode,
            errorMessage,
        },
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

export const scanner_fix_mechanic = createAsyncThunk("/task/mechanicAccept", async ({ id_user_mechanic, id_machine, factory, lean }) => {
    try {
        const data = await ElectricServices.scanner_fix_mechanic(id_user_mechanic, id_machine, factory, lean);
        return data;
    } catch (error) {
        return error.message;
    }
})

export const finish_mechanic = createAsyncThunk("/task/machineCfmfinish", async ({ id_user_mechanic, status, id_machine, remark_mechanic, lean, factory }) => {
    try {
        const data = await ElectricServices.finish_mechanic(id_user_mechanic, status, id_machine, remark_mechanic, lean, factory);
        return data;
    } catch (error) {
        return error.message;
    }
})

export const get_history_mechanic = createAsyncThunk("/task/getHistoryMechanic", async ({ id_user_mechanic, factory }) => {
    try {
        const data = await ElectricServices.get_history_mechanic(id_user_mechanic, factory);
        return data;
    } catch (error) {
        return error.message;
    }
})

export const get_info_calculate = createAsyncThunk("/task/getInfoCalculate", async ({ date_from, date_to, user_name, factory }) => {
    try {
        const data = await ElectricServices.get_info_calculate(date_from, date_to, user_name, factory);
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
        historyListReportMechanic: [],
        infoCalculate: [],
    },
    reducers: {
        setErrorCode: (state, action) => {
            state.errorCode = action.payload.errorCode;
            state.errorMessage = action.payload.errorMessage;
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
            state.errorCode = action.payload.error_code;
            state.errorMessage = action.payload.error_message;
        });
        builder.addCase(scanner_fix_mechanic.rejected, (state, action) => {
            state.errorCode = action.payload.error_code;
            state.errorMessage = action.payload.error_message;
        });
        builder.addCase(finish_mechanic.fulfilled, (state, action) => {
            state.errorCode = action.payload.error_code;
            state.errorMessage = action.payload.error_message;
        });
        builder.addCase(finish_mechanic.rejected, (state, action) => {
            state.errorCode = action.payload.error_code;
            state.errorMessage = action.payload.error_message;
        });
        builder.addCase(get_history_mechanic.fulfilled, (state, action) => {
            state.historyListReportMechanic = action.payload.data;
        });
        builder.addCase(get_info_calculate.fulfilled, (state, action) => {
            state.infoCalculate = action.payload.data;
        });
    }
})

const { reducer } = electricSlice;
export default reducer;