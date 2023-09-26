import axios from "axios";
import { BASE_URL } from "../../utils/env";
import authHeader from "./auth_header";

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

const report_damage = (id_machine, id_user_request, remark, factory, fixer) => {
    return axios.post(BASE_URL + "/damage_report/callMechanic", {
        id_machine,
        id_user_request,
        remark,
        factory,
        fixer,
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
};


const ProductServices = {
    get_report_damage,
    report_damage,
};

export default ProductServices;
