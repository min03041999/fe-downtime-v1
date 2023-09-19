import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";

import ArticleIcon from "@mui/icons-material/Article";
import QrCodeIcon from "@mui/icons-material/QrCode";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

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

  console.log(active, completed, className);

  const icons = {
    1: <ArticleIcon />,
    2: <QrCodeIcon />,
    3: <NoteAltIcon />,
    4: <AssignmentTurnedInIcon />,
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

const steps = [
  {
    label: "Sản xuất",
    description: `Quét mã và gửi yêu cầu cho cơ điện.`,
  },
  {
    label: "Cơ điện",
    description: "Tiếp nhận yêu cầu từ sản xuất.",
  },
  {
    label: "Cơ điện",
    description: `Sửa chữa và ghi chú máy bị hư.`,
  },
  {
    label: "Sản xuất",
    description: `Xác nhận cơ điện đã hoàn thành sửa chữa.`,
  },
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [open, setOpen] = React.useState(false);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <List
        sx={{ width: "100%", bgcolor: "primary.dark", borderRadius: "5px" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton onClick={handleClick}>
          <ListItemText>
            <Typography
              variant="body1"
              style={{ color: "white", fontSize: "14px", paddingLeft: "10px" }}
            >
              2023-09-18 - IPAD
            </Typography>
          </ListItemText>
          {open ? (
            <ExpandLess style={{ color: "white" }} />
          ) : (
            <ExpandMore style={{ color: "white" }} />
          )}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem>
              <Card
                variant="outlined"
                sx={{ width: "100%", padding: "0 15px" }}
              >
                <Stepper activeStep={activeStep} orientation="vertical">
                  {steps.map((step, index) => (
                    <Step key={index}>
                      <StepLabel
                        StepIconComponent={ColorlibStepIcon}
                        optional={
                          index === 3 ? (
                            <Typography variant="caption">Last step</Typography>
                          ) : null
                        }
                      >
                        {step.label} - {step.description}
                      </StepLabel>
                      <StepContent>
                        {/* <Typography>{step.description}</Typography> */}
                        <Box sx={{ mb: 2 }}>
                          <div>
                            <Button
                              variant="contained"
                              onClick={handleNext}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              {index === steps.length - 1
                                ? "Finish"
                                : "Continue"}
                            </Button>
                            <Button
                              disabled={index === 0}
                              onClick={handleBack}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Back
                            </Button>
                          </div>
                        </Box>
                      </StepContent>
                    </Step>
                  ))}
                </Stepper>
                {activeStep === steps.length && (
                  <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>Hoàn thành!</Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                      Chạy lại
                    </Button>
                  </Paper>
                )}
              </Card>
            </ListItem>
          </List>
        </Collapse>
      </List>
    </Stack>
  );
}
