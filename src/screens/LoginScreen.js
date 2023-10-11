import React, { useState, useEffect } from "react";
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
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

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

var firebaseConfig = {
    apiKey: "AIzaSyCJ_YIzbq2PDVB1SvAwcflvN4bnqN00vy4",
    authDomain: "tesstts.firebaseapp.com",
    projectId: "tesstts",
    storageBucket: "tesstts.appspot.com",
    messagingSenderId: "130388392879",
    appId: "1:130388392879:web:9dacb10254ab240c910d5a",
    measurementId: "G-D1PLR86NEY",
};

initializeApp(firebaseConfig);

const messaging = getMessaging();

export default function LoginScreen() {
    const auth = useSelector((state) => state.auth);
    const [tokens, setToken] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();



    getToken(messaging, {
        vapidKey:
            "BNiYast8NllLtbCmjB7tEy1Ja95lcKdr0_Unmz41P96-c5OHtqq1L60fhrlOGY2hW3RQDNdoVoF5MwLHUg2UlnQ",
    })
        .then((currentToken) => {
            if (currentToken) {
                // console.log("current token for client: ", currentToken);
                // Perform any other neccessary action with the token
                // Toast.fire({
                //   icon: "success",
                //   title: "Accepted for notification",
                // });
                setToken(currentToken);
                return currentToken;
            } else {
                // Show permission request UI
                Toast.fire({
                    icon: "error",
                    title:
                        "No registration token available. Request permission to generate one.",
                });
            }
        })
        .catch((err) => {
            console.log("An error occurred while retrieving token. ", err);
        });

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
            factory: "",
        },
        validationSchema,
        onSubmit: (data) => {
            const { username, password, factory } = data;
            dispatch(login({ username, password, factory, token: tokens }));
        },
    });

    const permissionFireBase = async () => {
        const myButton = document.querySelector("button");
        myButton.addEventListener("click", async () => {
            let permission = await Notification.requestPermission();
            if (permission === "granted") {
                console.log("Notification permission granted. Requesting for token.");
                let token = await messaging.getToken({
                    vapidKey: "BNiYast8NllLtbCmjB7tEy1Ja95lcKdr0_Unmz41P96-c5OHtqq1L60fhrlOGY2hW3RQDNdoVoF5MwLHUg2UlnQ",
                });
                // do something with the FCM token
                alert(token);
            } else {
                console.log("Notification permission denied");
                // Handle denied permission
                alert("Coyen");
            }
        });
    }

    useEffect(() => {
        permissionFireBase();
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
                            id="button"
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
