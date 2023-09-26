import React, { useEffect } from "react";
import {
    Button,
    TextField,
    Box,
    Typography,
    Paper,
    MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login, setErrorCode } from "../redux/features/auth";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Toast } from "../utils/toast";

const ContainerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
};

const PaperStyle = {
    minWidth: "300px",
    maxWidth: "325px",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: 20,
};

const validationSchema = Yup.object().shape({
    username: Yup.string().required("Vui lòng không để trống!"),
    password: Yup.string().required("Vui lòng không để trống!"),
    factory: Yup.string().required("Vui lòng không để trống!"),
});

export default function LoginScreen() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            factory: "",
        },
        validationSchema,
        onSubmit: (data) => {
            const { username, password, factory } = data;
            dispatch(login({ username, password, factory }));


        },
    });

    useEffect(() => {

        if (auth.errorCode !== 0 && auth.errorCode !== null) {
            Toast.fire({
                icon: 'error',
                title: auth.errorMessage,
            })
        }

        dispatch(setErrorCode(0));

        const permission = auth.user?.permission;

        switch (permission) {
            case 0:
                navigate("/dashboard");
                break;
            case 1:
                navigate("/electric");
                break;
            case 2:
                navigate("/electric/user");
                break;
            case 3:
                navigate("/product");
                break;
            default:
                navigate("/");
                break;
        }
    }, [auth, navigate, dispatch]);

    return (
        <div style={ContainerStyle}>
            <Paper elevation={8} style={PaperStyle}>
                <Box
                    sx={{
                        marginTop: 3,
                    }}
                >
                    <Box component="form" onSubmit={formik.handleSubmit}>
                        <Typography
                            component="h1"
                            variant="h4"
                            style={{ color: "#1976d2", fontWeight: "600" }}
                            textAlign="center"
                        >
                            Login
                        </Typography>
                        <Typography
                            variant="div"
                            color="#aeaeae"
                            display="block"
                            textAlign="center"
                        >
                            Please log in to contiue!
                        </Typography>

                        <TextField
                            type="text"
                            name="username"
                            fullWidth
                            label="Tài khoản"
                            margin="normal"
                            className={
                                formik.errors.username && formik.touched.username
                                    ? "is-invalid"
                                    : ""
                            }
                            error={formik.errors.username && formik.touched.username === true}
                            helperText={
                                formik.errors.username && formik.touched.username
                                    ? formik.errors.username
                                    : null
                            }
                            onChange={formik.handleChange}
                            value={formik.values.username}
                        />

                        <TextField
                            type="password"
                            name="password"
                            fullWidth
                            label="Mật khẩu"
                            margin="normal"
                            className={
                                formik.errors.password && formik.touched.password
                                    ? "is-invalid"
                                    : ""
                            }
                            error={formik.errors.password && formik.touched.password === true}
                            helperText={
                                formik.errors.password && formik.touched.password
                                    ? formik.errors.password
                                    : null
                            }
                            onChange={formik.handleChange}
                            value={formik.values.password}
                        />

                        <TextField
                            select
                            name="factory"
                            fullWidth
                            label="Nhà máy"
                            margin="normal"
                            className={
                                formik.errors.factory && formik.touched.factory
                                    ? "is-invalid"
                                    : ""
                            }
                            error={formik.errors.factory && formik.touched.factory === true}
                            helperText={
                                formik.errors.factory && formik.touched.factory
                                    ? formik.errors.factory
                                    : null
                            }
                            onChange={formik.handleChange}
                            value={formik.values.factory}
                        >
                            <MenuItem value="LYV">LYV</MenuItem>
                            <MenuItem value="LHG">LHG</MenuItem>
                            <MenuItem value="LVL">LVL</MenuItem>
                            <MenuItem value="LYM">LYM</MenuItem>
                        </TextField>

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 2, mb: 2 }}
                        >
                            Đăng nhập
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </div>
    );
}
