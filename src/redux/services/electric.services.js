import axios from "axios";
import { BASE_URL } from "../../utils/env";
import authHeader from "./auth_header";

const get_task_damage = (area) => {
    return axios.post(BASE_URL + "/task/getMehalist", {
        area
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
    get_task_damage,
}

export default ElectricServices;