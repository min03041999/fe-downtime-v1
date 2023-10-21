import React from 'react';
import AlertDialog from "./AlertDialog";
import { Grid, Typography, Box } from "@mui/material";

const DetailInfo = ({ isCheck, open, setOpen, machine, user }) => {
    console.log(machine);
    return (
        <>
            {isCheck && (<AlertDialog
                open={open}
                setOpen={setOpen}
                headerModal={"Thông tin yêu cầu của thợ sửa"}
            >
                <Box component="div" sx={{ margin: "10px" }}>
                    <Grid
                        container
                        rowSpacing={2}
                        columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: "10px" }}>
                        <Grid item xs={12} md={12}>
                            <Typography variant="div" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                Người gửi yêu cầu: {" "}
                            </Typography>
                            <Typography variant="div" sx={{ fontSize: "14px", color: "gray" }}>
                                {machine.name_user_req ? machine.name_user_req : user.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography variant="div" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                Ngày: {" "}
                            </Typography>
                            <Typography variant="div" sx={{ fontSize: "14px", color: "gray" }}>
                                {machine.date_user_request.split("T")[0]}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography variant="div" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                Mã máy: {" "}
                            </Typography>
                            <Typography variant="div" sx={{ fontSize: "14px", color: "gray" }}>
                                {machine.id_machine}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography variant="div" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                Mặt lầu: {" "}
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: "14px", color: "gray" }}>
                                {machine.floor}
                            </Typography>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Typography variant="div" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                Đơn vị: {" "}
                            </Typography>
                            <Typography variant="span" sx={{ fontSize: "14px", color: "gray" }}>
                                {machine.lean_req ? machine.lean_req : user.lean}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} md={12}>
                            <Typography variant="div" sx={{ fontSize: "14px", fontWeight: "500" }}>
                                Ghi chú: {" "}
                            </Typography>
                            <Typography variant="div" sx={{ fontSize: "14px", color: "gray" }}>
                                {machine.remark}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </AlertDialog>)}
        </>
    )
}

export default DetailInfo;