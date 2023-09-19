import React from "react";
import { Breadcrumbs, Typography } from "@mui/material";

const styleBreadCrumb = {
  fontSize: "14px",
  fontWeight: "500",
};

const BreadCrumb = (props) => {
  const breadCrumb = props.breadCrumb;

  return (
    <Breadcrumbs separator="›" aria-label="breadcrumb">
      <Typography underline="hover" color="inherit" sx={styleBreadCrumb}>
        Hệ thống
      </Typography>
      <Typography variant="div" color="text.primary" sx={styleBreadCrumb}>
        {breadCrumb}
      </Typography>
    </Breadcrumbs>
  );
};

export default BreadCrumb;
