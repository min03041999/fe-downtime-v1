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
const get_report_damage = (id_user_request, factory) => {
    return axios.post(BASE_URL + "/damage_report/getTaskInfo", {
        id_user_request, factory
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
    get_report_damage,
    get_task_damage,
}

export default ElectricServices;