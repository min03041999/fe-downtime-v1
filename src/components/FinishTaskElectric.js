import React from 'react';
import AlertDialog from './AlertDialog';
import Title from './Title';

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch } from 'react-redux';
import { finish_mechanic, get_work_list_report_employee, get_history_mechanic } from "../redux/features/electric";

import { Typography, MenuItem, Grid, TextField, Box, Button, Stack } from "@mui/material";


const FinishTaskElectric = (props) => {
    const dispatch = useDispatch();
    const { isCheck, idMachine, open, setOpen, user } = props;

    const onClose = () => {
        setOpen(false);
    }

    const validationSchema = Yup.object().shape({
        status: Yup.string().required("Vui lòng nhập trạng thái!"),
        remark_mechanic: Yup.string().required("Vui lòng nhập phương pháp sửa chữa!")
    })

    const formik = useFormik({
        initialValues: {
            status: "",
            remark_mechanic: "",
        },
        validationSchema,
        onSubmit: async (data) => {
            const { status, remark_mechanic } = data;
            const { lean, factory, user_name } = user;
            const id_machine = idMachine;
            const id_user_mechanic = user_name;

            await dispatch(finish_mechanic({ id_user_mechanic, status, id_machine, remark_mechanic, lean, factory }));

            const fetchData = async () => {
                await dispatch(get_work_list_report_employee({ id_user_mechanic, factory }));
                await dispatch(get_history_mechanic({ id_user_mechanic, factory }));

            }
            fetchData();
            setOpen(false);
        }
    })

    return (
        <>
            {
                isCheck && (
                    <AlertDialog
                        open={open}
                        setOpen={setOpen}
                        headerModal={"Thợ sửa - Hoàn thành sửa chữa"}
                    >
                        <Box component="div" sx={{ textAlign: "center" }}>
                            <Title color="#1565c0" titleText={"Vui lòng gửi yêu cầu sau khi hoàn thành!"} />
                        </Box>
                        <Grid
                            container
                            rowSpacing={2}
                            columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={{ marginBottom: "10px" }}>
                            <Grid item xs={12} md={12} >
                                <Typography
                                    sx={{
                                        fontWeight: "500",
                                    }}
                                >
                                    Thông tin
                                </Typography>
                                <Typography variant="div" sx={{ fontWeight: "500", fontSize: "14px" }}>
                                    Mã máy: &nbsp;
                                </Typography>
                                <Typography
                                    variant="div"
                                    sx={{ fontSize: "14px", wordWrap: "break-word" }}
                                >
                                    {idMachine} <br />
                                </Typography>
                            </Grid>
                        </Grid>
                        <Box component="form" onSubmit={formik.handleSubmit}>
                            <Grid container
                                rowSpacing={2}
                                columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        select
                                        name="status"
                                        size="small"
                                        fullWidth
                                        sx={{ fontSize: "14px" }}
                                        label={"Trạng thái"}
                                        variant="outlined"
                                        className={
                                            formik.errors.status && formik.touched.status
                                                ? "is-invalid"
                                                : ""
                                        }
                                        error={formik.errors.status && formik.touched.status === true}
                                        helperText={
                                            formik.errors.status && formik.touched.status
                                                ? formik.errors.status
                                                : null
                                        }
                                        onChange={formik.handleChange}
                                        value={formik.values.status}
                                    >
                                        <MenuItem value=""></MenuItem>
                                        <MenuItem value="3">Sửa chữa</MenuItem>
                                        <MenuItem value="6">Đổi máy</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        name="remark_mechanic"
                                        label="Phương pháp sửa chữa"
                                        multiline
                                        rows={4}
                                        fullWidth
                                        variant="outlined"
                                        className={
                                            formik.errors.remark_mechanic && formik.touched.remark_mechanic
                                                ? "is-invalid"
                                                : ""
                                        }
                                        error={
                                            formik.errors.remark_mechanic && formik.touched.remark_mechanic === true
                                        }
                                        helperText={
                                            formik.errors.remark_mechanic && formik.touched.remark_mechanic
                                                ? formik.errors.remark_mechanic
                                                : null
                                        }
                                        onChange={formik.handleChange}
                                        value={formik.values.remark_mechanic}
                                    />
                                </Grid>
                            </Grid>
                            <Stack
                                direction="row"
                                spacing={2}
                                sx={{ marginTop: "10px", justifyContent: "center" }}
                            >
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Xác nhận
                                </Button>
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="error"
                                    size="small"
                                    onClick={onClose}
                                >
                                    Đóng
                                </Button>
                            </Stack>
                        </Box>
                    </AlertDialog>
                )
            }
        </>
    )
}

export default FinishTaskElectric;