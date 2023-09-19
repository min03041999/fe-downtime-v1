import React, { useState } from "react";
import { Box, Typography, TextField, Grid, Stack, Button } from "@mui/material";
import {
    LocalizationProvider,
    DatePicker,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Popup from "./Popup";

const Form = (props) => {
    const { formText, setStatusSubmit, scannerResult, setScannerResult } = props;
    const [statusForm, setStatusForm] = useState(false);
    const [statusPopup, setstatusPopup] = useState(false);


    const onCancel = () => {
        setScannerResult("");
        setStatusSubmit(false);
    }

    const validationSchema = Yup.object().shape({
        FullName: Yup.string().required("Vui lòng nhập họ và tên!"),
        IDUser: Yup.string().required("Vui lòng nhập số thẻ!"),
        Lean: Yup.string().required("Vui lòng nhập đơn vị!"),
        DateReport: Yup.string().required("Vui lòng nhập ngày!"),
        IDMachine: Yup.string().required("Vui lòng nhập mã máy!"),
        Remark: Yup.string().required("Vui lòng nhập lý do hư máy")
    });

    const formik = useFormik({
        initialValues: {
            FullName: "Amin Mohamad",
            IDUser: "30797",
            Lean: "IT-Software",
            DateReport: dayjs(new Date()),
            IDMachine: scannerResult,
            Remark: ""
        },
        validationSchema,
        onSubmit: (data) => {
            setStatusForm(true);
            setstatusPopup(true);
        }
    })

    return (
        <Box component="div">
            <Typography
                sx={{ fontSize: "14px", fontWeight: "500", marginBottom: "10px" }}
            >
                {formText}
            </Typography>
            {
                statusForm === true ? (
                    <Box component="div">
                        <Popup statusPopup={statusPopup} />
                        <Stack direction="row"
                            spacing={2}
                            sx={{
                                marginTop: "10px",
                                justifyContent: "center"
                            }}>
                            <Link to="/product/status">
                                <Button
                                    type="button"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                >
                                    Theo dõi trạng thái
                                </Button>
                            </Link>

                            <Button
                                type="button"
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={onCancel}
                            >
                                Trở về trang chủ
                            </Button>
                        </Stack>
                    </Box>
                ) : (
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Grid container rowSpacing={2} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    label="Họ và tên"
                                    name="FullName"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    className={
                                        formik.errors.FullName && formik.touched.FullName ? "is-invalid" : ""
                                    }
                                    error={formik.errors.FullName && formik.touched.FullName === true}
                                    helperText={
                                        formik.errors.FullName && formik.touched.FullName
                                            ? formik.errors.FullName
                                            : null
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.FullName}
                                    inputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    label="Số thẻ"
                                    name="IDUser"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    className={
                                        formik.errors.IDUser && formik.touched.IDUser ? "is-invalid" : ""
                                    }
                                    error={formik.errors.IDUser && formik.touched.IDUser === true}
                                    helperText={
                                        formik.errors.IDUser && formik.touched.IDUser
                                            ? formik.errors.IDUser
                                            : null
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.IDUser}
                                    inputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    label="Đơn vị"
                                    name="Lean"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    className={
                                        formik.errors.Lean && formik.touched.Lean ? "is-invalid" : ""
                                    }
                                    error={formik.errors.Lean && formik.touched.Lean === true}
                                    helperText={
                                        formik.errors.Lean && formik.touched.Lean
                                            ? formik.errors.Lean
                                            : null
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.Lean}
                                    inputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DatePicker
                                        label="Ngày"
                                        id="DateReport"
                                        name="DateReport"
                                        format="DD-MM-YYYY"
                                        value={formik.values.DateReport}
                                        onChange={(value) => {
                                            formik.setFieldValue("DateReport", value);
                                        }}
                                        slotProps={{
                                            textField: {
                                                size: 'small', fullWidth: true,
                                                helperText:
                                                    formik.touched.DateReport && formik.errors.DateReport,
                                                error:
                                                    formik.touched.DateReport &&
                                                    Boolean(formik.errors.DateReport),
                                            },
                                        }}
                                    />
                                </LocalizationProvider>
                            </Grid>
                            <Grid item xs={6} md={6}>
                                <TextField
                                    label="Mã máy"
                                    name="IDMachine"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    className={
                                        formik.errors.IDMachine && formik.touched.IDMachine ? "is-invalid" : ""
                                    }
                                    error={formik.errors.IDMachine && formik.touched.IDMachine === true}
                                    helperText={
                                        formik.errors.IDMachine && formik.touched.IDMachine
                                            ? formik.errors.IDMachine
                                            : null
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.IDMachine}
                                    inputProps={{ readOnly: true }} />
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <TextField
                                    name="Remark"
                                    label="Lý do hư máy"
                                    multiline
                                    rows={4}
                                    fullWidth
                                    className={
                                        formik.errors.Remark && formik.touched.Remark ? "is-invalid" : ""
                                    }
                                    error={formik.errors.Remark && formik.touched.Remark === true}
                                    helperText={
                                        formik.errors.Remark && formik.touched.Remark
                                            ? formik.errors.Remark
                                            : null
                                    }
                                    onChange={formik.handleChange}
                                    value={formik.values.Remark}
                                />
                            </Grid>
                        </Grid>
                        <Stack
                            direction="row"
                            spacing={2}
                            sx={{ marginTop: "10px", justifyContent: "center" }}>
                            <Button type="submit" variant="contained" color="primary" size="small">
                                Xác nhận
                            </Button>
                            <Button
                                type="button"
                                variant="contained"
                                color="error"
                                size="small"
                                onClick={onCancel}
                            >
                                Hủy
                            </Button>
                        </Stack>
                    </Box>
                )
            }
        </Box>
    );
};

export default Form;
