import React, { useState, useEffect } from "react";
import { Box, Tabs, Tab } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { get_report_damage } from "../../redux/features/product";
import BreadCrumb from "../../components/BreadCrumb";
import ProgressStatus from "../../components/ProgressStatus";

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 1 }} textAlign="center">
                    <Box>{children}</Box>
                </Box>
            )}
        </div>
    );
}

const StatusScreen = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);
    const { data } = useSelector((state) => state.product);

    useEffect(() => {
        const { user_name, factory } = user;
        const id_user_request = user_name;
        dispatch(get_report_damage({ id_user_request, factory }))
    }, [user, dispatch]);

    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Box component="div">
            <BreadCrumb breadCrumb={"Trạng thái xử lý"} />
            <Box sx={{ width: "100%" }}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                        value={value}
                        variant="fullWidth"
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        centered
                    >
                        <Tab
                            label="Đang xử lý"
                            {...a11yProps(0)}
                            sx={{ fontSize: "14px", textTransform: "capitalize" }}
                        />
                        <Tab
                            label="Lịch sử"
                            {...a11yProps(1)}
                            sx={{ fontSize: "14px", textTransform: "capitalize" }}
                        />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <ProgressStatus listReport={data} />
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    History is empty
                </CustomTabPanel>
            </Box>
        </Box>
    );
};

export default StatusScreen;
