import React, { useEffect } from 'react';
import AlertDialog from './AlertDialog';
import Title from './Title';

import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from 'react-redux';
import { finish_mechanic, get_info_skill } from "../redux/features/electric";

import { Typography, MenuItem, Grid, TextField, Box, Button, Stack, Autocomplete } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";


const FinishTaskElectric = (props) => {
    const dispatch = useDispatch();
    const { infoSkill } = useSelector((state) => state.electric);
    const { isCheck, idMachine, open, setOpen, user } = props;

    const onClose = () => {
        setOpen(false);
    }

    const validationSchema = Yup.object().shape({
        skill: Yup.array()
            .of(
                Yup.object().shape({
                    id: Yup.number().required('Status ID is required'),
                    info_skill_en: Yup.string().required('English skill name is required'),
                    info_skill_vn: Yup.string().required('Vietnamese skill name is required')
                })
            )
            .min(1, 'Vui lòng nhập phương pháp'),
        remark_mechanic: Yup.string().required("Vui lòng nhập phương pháp sửa chữa!")
    })

    const handleAutocompleteChange = (event, values) => {
        formik.setFieldValue('skill', values);
    };

    const formik = useFormik({
        initialValues: {
            skill: [],
            remark_mechanic: "",
        },
        validationSchema,
        onSubmit: (data) => {
            const arraySkill = data.skill;
            const idArray = arraySkill.map(item => item.id);
            const skill = idArray.join(",");

            const { remark_mechanic } = data;
            const { lean, factory, user_name } = user;
            const id_machine = idMachine;
            const id_user_mechanic = user_name;

            dispatch(finish_mechanic({ id_user_mechanic, skill, id_machine, remark_mechanic, lean, factory }));

            setOpen(false);
        }
    })

    useEffect(() => {
        const fetchData = () => {
            dispatch(get_info_skill());
        }
        fetchData();
    }, [dispatch])

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
                                    <Autocomplete
                                        name="skill"
                                        multiple
                                        options={infoSkill}
                                        getOptionLabel={(option) => option.info_skill_vn}
                                        disableCloseOnSelect
                                        onChange={handleAutocompleteChange}
                                        value={formik.values.skill}
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                variant="outlined"
                                                label="Phương pháp sửa chữa"
                                                fullWidth
                                                sx={{ fontSize: '14px' }}
                                                size="small"
                                                error={!!(formik.errors.skill && formik.touched.skill)}
                                                className={formik.errors.skill && formik.touched.skill ? 'is-invalid' : ''}
                                                helperText={formik.errors.skill && formik.touched.skill ? formik.errors.skill : null}

                                            />
                                        )}
                                        renderOption={(props, option, { selected }) => (
                                            <MenuItem {...props} key={option.id} value={option}>
                                                {option.info_skill_vn}
                                                {selected ? <CheckIcon color="info" /> : null}
                                            </MenuItem>
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <TextField
                                        name="remark_mechanic"
                                        label="Ghi chú"
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