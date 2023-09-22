import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";

import Typography from "@mui/material/Typography";
import ConstructionIcon from "@mui/icons-material/Construction";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import { PieChart, Pie, Cell, Legend } from "recharts";

const data = [
  { name: "A", value: 300 },
  { name: "B", value: 200 },
  { name: "C", value: 100 },
  { name: "D", value: 400 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function InfoUserScreen() {
  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ width: "100%" }} display="flex" justifyContent="space-evenly">
        <Paper elevation={4} style={{ width: "45%", height: "fit-content" }}>
          <List sx={{ width: "100%" }}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <ConstructionIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          </List>
        </Paper>

        <Paper elevation={3} style={{ width: "45%", height: "fit-content" }}>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <LeaderboardIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Photos" secondary="Jan 9, 2014" />
            </ListItem>
          </List>
        </Paper>
      </Box>

      <Box
        border="5px solid #ccc"
        borderRadius={15}
        marginTop={1}
        padding="30px 0 0 36px"
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          Passed machine tests
        </Typography>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            fontSize: "14px",
          }}
        >
          <ul>
            <li>Sm. Computer</li>
            <li>Med. Computer</li>
            <li>SN Post</li>
            <li>DN Post</li>
          </ul>
          <ul>
            <li>Zag Zag</li>
            <li>Hammer</li>
          </ul>
        </div>
      </Box>

      <Box
        border="5px solid #ccc"
        borderRadius={15}
        marginTop={1}
        padding="30px 0 0px 36px"
      >
        <Typography
          sx={{
            textTransform: "uppercase",
            fontSize: "14px",
            fontWeight: "bold",
          }}
        >
          avg fix time by category
        </Typography>
        <Box>
          <PieChart width={350} height={250}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={true}
              label
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              nameKey="name"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend
              verticalAlign="middle"
              align="left"
              layout="vertical"
              iconType="circle"
            />
          </PieChart>
        </Box>
      </Box>
    </Box>
  );
}
