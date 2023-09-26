import React, { useState } from "react";
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
  Collapse
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

import { useDispatch } from "react-redux";
import { scanner_fix_mechanic } from "../redux/features/electric";

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
  const [scannerResult, setScannerResult] = useState("Machine-2");

  const steps = [
    {
      label: "Sản xuất",
      description: "Quét mã và gửi yêu cầu cho cơ điện.",
      performAction: function (status) {
        // Hành động cần thực hiện trong bước này
        console.log("Thực hiện hành động trong bước Sản xuất");
      },
    },
    {
      label: "Thợ sửa",
      description: "Tiếp nhận yêu cầu từ sản xuất.",
      performAction: function (status) {
        if (status === 1) {
          setOpen(true);
        }
      },
    },
    {
      label: "Thợ sửa",
      description: "Sửa chữa và ghi chú máy bị hư.",
      performAction: function (status) {
        // Hành động cần thực hiện trong bước này
        console.log("Thực hiện hành động trong bước Cơ điện");
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
                          onClick={() => step.performAction(product.status)}
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
          </List>
        ))}

      {/* Alert Dialog */}
      <ScannerElectric
        open={open}
        setOpen={setOpen}
        scannerResult={scannerResult}
        setScannerResult={setScannerResult}
        user={user}
      />
    </Stack>
  );
}

export const ScannerElectric = (props) => {
  const dispatch = useDispatch();
  const { open, setOpen, scannerResult, setScannerResult, user } = props;

  const onReScanner = () => {
    setScannerResult("");
  };

  const onSubmit = () => {
    const { user_name, factory } = user;
    const id_user_mechanic = user_name;
    const id_machine = scannerResult;
    dispatch(scanner_fix_mechanic({ id_user_mechanic, id_machine, factory }));
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
            scanner="Quét mã Bar/QR Code:"
            scannerResult={scannerResult}
            setScannerResult={setScannerResult}
          />
        )}
      </Box>
    </AlertDialog>
  );
};
