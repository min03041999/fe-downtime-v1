import React, { useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
// import BackgroundImage from "../assets/Images/bg-login.jpg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/features/auth";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ContainerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
    // backgroundImage: `url(${BackgroundImage})`,
    // backgroundRepeat: "round",
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
});

export default function LoginScreen(props) {
    const auth = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const initialValues = {
        username: "",
        password: "",
    };

    const handleSubmit = (values, { setSubmitting }) => {
        const { username, password } = values;
        dispatch(login({ username, password }));
        setSubmitting(false);
    };

    useEffect(() => {
        if (auth !== null) {
            const permission = auth.user?.permission;
            if (permission === 1) {
                navigate("/product");
            } else {
                navigate("/electric");
            }
        }

    }, [auth, navigate])

    return (
        <div style={ContainerStyle}>
            <Paper elevation={8} style={PaperStyle}>
                <Box
                    sx={{
                        marginTop: 8,
                    }}
                >
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        <Form>
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

                            <Field
                                as={TextField}
                                type="text"
                                name="username"
                                fullWidth
                                label="Tài khoản"
                                margin="normal"
                            />
                            <ErrorMessage
                                name="username"
                                component="div"
                                style={{ color: "red" }}
                            />

                            <Field
                                as={TextField}
                                type="password"
                                name="password"
                                fullWidth
                                label="Mật khẩu"
                                margin="normal"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                style={{ color: "red" }}
                            />

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 2, mb: 2 }}
                            >
                                Đăng nhập
                            </Button>
                        </Form>
                    </Formik>
                </Box>
            </Paper>
        </div>
    );
}
