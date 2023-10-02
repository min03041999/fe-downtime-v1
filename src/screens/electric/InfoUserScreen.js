import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Grid,
  Stack,
} from "@mui/material";
import CalculateJob from "../../components/CalculateJob";
import SkillEmployee from "../../components/SkillEmployee";
import ChartEmployee from "../../components/ChartEmployee";
import Title from "../../components/Title";
import FilterListIcon from "@mui/icons-material/FilterList";

import dayjs from "dayjs";
import { format } from "date-fns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { get_info_calculate } from "../../redux/features/electric";

const FilterStyle = {
  padding: "15px 30px 15px 30px",
  borderRadius: "30px",
  border: "3px solid #ccc",
};

const Active = {
  position: "absolute",
  width: "100%",
  opacity: "1",
  transform: `translate(0%, 0%)`,
  transition: "ease 0.5s",
  zIndex: '1'
}

const ActiveNone = {
  position: "absolute",
  width: "100%",
  opacity: "1",
  transform: `translate(0%, -300%)`,
}

export default function InfoUserScreen() {
  const dispatch = useDispatch();
  const { user_name, factory } = useSelector((state) => state.auth.user);
  const { infoCalculate } = useSelector((state) => state.electric);

  const [open, setOpen] = useState(false);
  const onShowFilter = () => {
    setOpen(!open);
  };

  const validationSchema = Yup.object().shape({
    DateFrom: Yup.string().required("Vui lòng nhập ngày!"),
    DateTo: Yup.string().required("Vui lòng nhập đến ngày!"),
  });

  useEffect(() => {

    const date_from = format(dayjs(new Date()).$d, "yyyy-MM-dd");
    const date_to = format(dayjs(new Date()).$d, "yyyy-MM-dd");

    dispatch(get_info_calculate({ date_from, date_to, user_name, factory }));
  }, [dispatch, user_name, factory])

  const formik = useFormik({
    initialValues: {
      DateFrom: dayjs(new Date()),
      DateTo: dayjs(new Date()),
    },
    validationSchema,
    onSubmit: (data) => {
      const date_from = format(data.DateFrom.$d, "yyyy-MM-dd");
      const date_to = format(data.DateTo.$d, "yyyy-MM-dd");
      dispatch(get_info_calculate({ date_from, date_to, user_name, factory }));
    }
  })

  return (
    <Box marginTop={1} sx={{ position: "relative", width: "100%" }}>
      <Box sx={{ textAlign: "right", marginTop: "-15px" }}>
        <Button onClick={onShowFilter}>
          <FilterListIcon />
          Filter
        </Button>
      </Box>

      <Box component="div" sx={FilterStyle} style={open ? Active : ActiveNone}>
        <Title titleText={"Tra cứu thông tin"} />
        <Box component="form" onSubmit={formik.handleSubmit}>
          <Grid
            container
            rowSpacing={2}
            columnSpacing={{ xs: 1, sm: 2, md: 3 }}
          >
            <Grid item xs={5} md={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Ngày"
                  id="DateFrom"
                  name="DateFrom"
                  format="DD-MM-YYYY"
                  value={formik.values.DateFrom}
                  onChange={(value) => {
                    formik.setFieldValue("DateFrom", value);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      helperText:
                        formik.touched.DateFrom && formik.errors.DateFrom,
                      error:
                        formik.touched.DateFrom &&
                        Boolean(formik.errors.DateFrom),
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={2} md={2}>
              <Box sx={{ textAlign: "center", lineHeight: "35px" }}>~</Box>
            </Grid>
            <Grid item xs={5} md={5}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Đền ngày"
                  id="DateTo"
                  name="DateTo"
                  format="DD-MM-YYYY"
                  value={formik.values.DateTo}
                  onChange={(value) => {
                    formik.setFieldValue("DateTo", value);
                  }}
                  slotProps={{
                    textField: {
                      size: "small",
                      fullWidth: true,
                      helperText:
                        formik.touched.DateTo && formik.errors.DateTo,
                      error:
                        formik.touched.DateTo &&
                        Boolean(formik.errors.DateTo),
                    },
                  }}
                />
              </LocalizationProvider>
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
              Tìm kiếm
            </Button>
          </Stack>
        </Box>
      </Box>


      {/* Content  */}
      <Box component="div" sx={open ? {
        transition: "ease 0.5s", transform: `translate(0%, 155px)`, margin: "0 -5px",
      } : {
        transition: "ease 0.5s", transform: `translate(0%, 0%)`, margin: "0 -5px",
      }}>
        <CalculateJob infoCalculate={infoCalculate} />

        <SkillEmployee />

        <ChartEmployee />
      </Box>
    </Box>
  );
}
