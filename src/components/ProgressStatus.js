import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";

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

export default function ProgressStatus({ listReport }) {
  const [open, setOpen] = useState(listReport || []);

  const handleClick = (index) => {
    const isOpen = open.includes(index);
    if (isOpen) {
      setOpen(open.filter((item) => item !== index));
    } else {
      setOpen([...open, index]);
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
                    variant="body1"
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
                {open.includes(index) ? (
                  <ExpandLess style={{ color: "white" }} />
                ) : (
                  <ExpandMore style={{ color: "white" }} />
                )}
              </ListItemButton>
              <Collapse in={open.includes(index)} timeout="auto" unmountOnExit>
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
                          <Step key={index}>
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
    </Stack>
  );
}
