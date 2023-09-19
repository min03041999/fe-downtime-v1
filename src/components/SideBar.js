import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Box,
    IconButton,
    List,
    ListItemIcon,
    CssBaseline,
    Drawer,
    Typography,
    ListItemButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import Banner from "./Banner";
import { useLocation } from "react-router-dom";


const menuSliderContainer = {
    minWidth: 250,
    height: "100%",
    color: "#000",
};

const SideBar = (props) => {
    const { sideBarMenu, children } = props;
    const { pathname } = useLocation();

    const active = sideBarMenu.findIndex((e) => e.path === pathname);

    const [open, setOpen] = useState(false);

    const toggleSlider = () => {
        setOpen(!open);
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Banner />

            {/* Content Body */}
            <Box
                component="div"
                sx={{
                    marginTop: "60px",
                    padding: "10px",
                }}
            >
                {children}
            </Box>

            {/* Content Body */}

            <Box component="nav">
                <AppBar
                    position="static"
                    style={{
                        backgroundColor: "#1565c0",
                        boxShadow: "unset",
                        position: "fixed",
                        top: 0,
                    }}
                >
                    <Toolbar>
                        <IconButton onClick={toggleSlider}>
                            <MenuIcon style={{ color: "#fff" }} />
                        </IconButton>

                        {/* SideBar */}
                        <Drawer open={open} anchor="left" onClose={toggleSlider}>
                            <Box component="div" style={menuSliderContainer}>
                                <Box
                                    sx={{
                                        display: "block",
                                        padding: "20px 10px",
                                        textAlign: "center",
                                        backgroundColor: "primary.dark",
                                        color: "#fff",
                                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                                    }}
                                >
                                    <Typography variant="h5">Time Down</Typography>
                                </Box>
                                <Box
                                    sx={{
                                        padding: "10px 20px",
                                    }}
                                >
                                    <Typography
                                        variant="div"
                                        sx={{ fontSize: "14px", fontWeight: "600" }}
                                    >
                                        System
                                    </Typography>

                                    {/* List Menu */}
                                    <List component="nav">
                                        {
                                            sideBarMenu.map((listItem, index) => (
                                                <ListItemButton to={listItem.path} key={index}>
                                                    <ListItemIcon style={{ color: active === index ? "#1565c0" : "" }}>
                                                        {listItem.icon}
                                                    </ListItemIcon>
                                                    <Typography
                                                        sx={{
                                                            fontSize: "14px",
                                                            color: active === index ? "#1565c0" : "#0009",
                                                            fontWeight: "600",
                                                        }}
                                                    >
                                                        {listItem.text}
                                                    </Typography>
                                                </ListItemButton>
                                            ))
                                        }
                                    </List>
                                    {/* List Menu */}

                                    <Typography
                                        variant="div"
                                        sx={{ fontSize: "14px", fontWeight: "600" }}
                                    >
                                        Supports
                                    </Typography>
                                    <List component="nav">
                                        <ListItemButton>
                                            <ListItemIcon>
                                                <LogoutIcon />
                                            </ListItemIcon>
                                            <Typography
                                                sx={{
                                                    fontSize: "14px",
                                                    color: "#0009",
                                                    fontWeight: "600",
                                                }}
                                            >
                                                Đăng xuất
                                            </Typography>
                                        </ListItemButton>
                                    </List>
                                </Box>
                            </Box>
                        </Drawer>
                        {/* SideBar */}
                    </Toolbar>
                </AppBar>
            </Box>
        </React.Fragment>
    );
};

export default SideBar;
