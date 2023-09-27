import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  Stepper,
  Box,
  Button,
  Step,
  StepLabel,
  Typography,
  Stack,
  Card,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";

import ArticleIcon from "@mui/icons-material/Article";
import QrCodeIcon from "@mui/icons-material/QrCode";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
// import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

import AlertDialog from "./AlertDialog";
import Scanner from "./Scanner";
import ScannerInfo from "./ScannerInfo";
import { Toast } from "../utils/toast";

import { useDispatch, useSelector } from "react-redux";
import {
  scanner_fix_mechanic,
  get_work_list_report_employee,
  setErrorCode,
} from "../redux/features/electric";

const ColorlibStepIconRoot = styled("div")(({ theme, ownerState }) => ({
  backgroundColor:
    theme.palette.mode === "dark" ? theme.palette.grey[700] : "#ccc",
  zIndex: 1,
  color: "#fff",
  width: 40,
  height: 40,
  display: "flex",
  borderRadius: "50%",
  justifyContent: "center",
  alignItems: "center",
  ...(ownerState.active && {
    backgroundColor: "#1565c0",
    boxShadow: "0 4px 10px 0 rgba(0,0,0,.25)",
  }),
  ...(ownerState.completed && {
    backgroundColor: "#1565c0",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  const icons = {
    1: <ArticleIcon />,
    2: <QrCodeIcon />,
    3: <NoteAltIcon />,
    // 4: <AssignmentTurnedInIcon />,
  };

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {icons[String(props.icon)]}
    </ColorlibStepIconRoot>
  );
}

export default function ProgressStatus({ listReport, user }) {
  const [openProgress, setOpenProgress] = useState(listReport || []);
  const [open, setOpen] = useState(false);
  const [activeModal, setActiveModal] = useState("");
  const [scannerResult, setScannerResult] = useState("Machine-2");

  const steps = [
    {
      label: "Sản xuất",
      description: "Quét mã và gửi yêu cầu cho cơ điện.",
      performAction: function (status, lean) {
        // Hành động cần thực hiện trong bước này
        console.log("Thực hiện hành động trong bước Sản xuất");
      },
    },
    {
      label: "Thợ sửa",
      description: "Tiếp nhận yêu cầu từ sản xuất.",
      performAction: function (status, lean) {
        if (status === 1 && (lean === "TD" || lean === "TM")) {
          setActiveModal("scanner");
          setOpen(true);
        }
      },
    },
    {
      label: "Thợ sửa",
      description: "Sửa chữa và ghi chú máy bị hư.",
      performAction: function (status, lean) {
        if (status === 2 && (lean === "TD" || lean === "TM")) {
          setActiveModal("finish");
          setOpen(true);
        }
      },
    },
  ];

  const handleClick = (index) => {
    const isOpen = openProgress.includes(index);
    if (isOpen) {
      setOpenProgress(openProgress.filter((item) => item !== index));
    } else {
      setOpenProgress([...openProgress, index]);
    }
  };

  const dispatch = useDispatch();
  const electric = useSelector((state) => state.electric);

  useEffect(() => {
    if (electric.errorCode === 0) {
      Toast.fire({
        icon: "success",
        title: electric.errorMessage,
      });
      setOpen(false);
    }

    if (
      electric.errorCode === 10001 ||
      electric.errorCode === 10002 ||
      electric.errorCode === 10003 ||
      electric.errorCode === 10004 ||
      electric.errorCode === 10005
    ) {
      Toast.fire({
        icon: "error",
        title: electric.errorMessage,
      });
    }
    dispatch(setErrorCode(null, ""));
  }, [electric, dispatch]);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      {listReport === null
        ? []
        : listReport.map((product, index) => (
          <List
            sx={{
              width: "100%",
              bgcolor: "primary.dark",
              borderRadius: "5px",
            }}
            component="nav"
            key={index}
          >
            <ListItemButton onClick={() => handleClick(index)}>
              <ListItemText>
                <Typography
                  variant="body"
                  style={{
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <Chip
                    label={product["date_user_request"].split("T")[0]}
                    color="primary"
                  />{" "}
                  - <Chip label={product["id_machine"]} color="primary" />
                </Typography>
              </ListItemText>
              {openProgress.includes(index) ? (
                <ExpandLess style={{ color: "white" }} />
              ) : (
                <ExpandMore style={{ color: "white" }} />
              )}
            </ListItemButton>
            <Collapse
              in={openProgress.includes(index)}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                <ListItem>
                  <Card
                    variant="outlined"
                    sx={{ width: "100%", padding: "0 15px" }}
                  >
                    <Stepper
                      activeStep={product["status"] - 1}
                      orientation="vertical"
                    >
                      {steps.map((step, index) => (
                        <Step
                          key={index}
                          onClick={() =>
                            step.performAction(product.status, user.lean)
                          }
                        >
                          <StepLabel StepIconComponent={ColorlibStepIcon}>
                            {step.label} - {step.description}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Card>
                </ListItem>
              </List>
            </Collapse>

            {/* Trạng thái 2: Quét mã scanner */}
            {activeModal === "scanner" && (
              <ScannerElectric
                idMachine={product.id_machine}
                open={open}
                setOpen={setOpen}
                scannerResult={scannerResult}
                setScannerResult={setScannerResult}
                user={user}
              />
            )}

            {/* Trạng 3: Hoàn thành việc sửa chửa  */}
            {activeModal === "finish" && (
              <FinishTaskElectric
                idMachine={product.id_machine}
                open={open}
                setOpen={setOpen}
                user={user}
              />
            )}
          </List>
        ))}
    </Stack>
  );
}

export const ScannerElectric = (props) => {
  const dispatch = useDispatch();
  const { idMachine, open, setOpen, scannerResult, setScannerResult, user } =
    props;
  const onReScanner = () => {
    setScannerResult("");
  };

  const onSubmit = async () => {
    const id_machine = idMachine;
    const { user_name, factory } = user;
    const id_user_mechanic = user_name;

    if (id_machine === scannerResult) {
      await dispatch(
        scanner_fix_mechanic({ id_user_mechanic, id_machine, factory })
      );
      await dispatch(
        get_work_list_report_employee({ id_user_mechanic, factory })
      );
      setScannerResult("");
    } else {
      dispatch(setErrorCode(10001, "Mã QRCode/BarCode không trùng khớp!"));
    }
  };

  return (
    <AlertDialog
      open={open}
      setOpen={setOpen}
      headerModal={"Thợ sửa - Tiếp nhận từ yêu cầu sản xuất"}
    >
      <Box
        component="div"
        sx={{ display: "block", margin: "0 auto", maxWidth: "500px" }}
      >
        {scannerResult !== "" ? (
          <Box component="div">
            <ScannerInfo
              scanner="Quét mã Bar/QR Code:"
              scannerResult={scannerResult}
            />
            <Stack
              direction="row"
              spacing={2}
              sx={{ marginTop: "10px", justifyContent: "center" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="small"
                onClick={onSubmit}
              >
                Xác nhận
              </Button>
              <Button
                variant="contained"
                color="error"
                size="small"
                onClick={onReScanner}
              >
                Quét lại
              </Button>
            </Stack>
          </Box>
        ) : (
          <Scanner
            idMachine={idMachine}
            scanner="Quét mã Bar/QR Code:"
            scannerResult={scannerResult}
            setScannerResult={setScannerResult}
          />
        )}
      </Box>
    </AlertDialog>
  );
};

export const FinishTaskElectric = (props) => {
  const { open, setOpen, user } = props;
  // console.log(open, user);
  return (
    <AlertDialog
      open={open}
      setOpen={setOpen}
      headerModal={"Thợ sửa - Tiếp nhận từ yêu cầu sản xuất"}
    ></AlertDialog>
  );
};
