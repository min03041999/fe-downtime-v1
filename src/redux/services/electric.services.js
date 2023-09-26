import axios from "axios";
import { BASE_URL } from "../../utils/env";
import authHeader from "./auth_header";


//List Task => Manager
const get_task_damage = (factory, floor) => {
    return axios.post(BASE_URL + "/task/getMehalist", {
        factory, floor
    }, {
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
}

//Get Status => Employee
const get_work_list_report_employee = (id_user_mechanic, factory) => {
    return axios.post(BASE_URL + "/task/getTaskmechaInfo", {
        id_user_mechanic, factory
    }, {
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
}

const scanner_fix_mechanic = (id_user_mechanic, id_machine, factory) => {
    return axios.post(BASE_URL + "/task/mechanicAccept", {
        id_user_mechanic, id_machine, factory
    }, {
        headers: {
            "Content-Type": "application/json",
            ...authHeader(),
        }
    }).then((response) => {
        return response.data;
    }).catch((error) => {
        return error.response.data;
    });
}




const ElectricServices = {
    get_work_list_report_employee,
    get_task_damage,
    scanner_fix_mechanic,
}

export default ElectricServices;