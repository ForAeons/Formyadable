import * as React from "react";
import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Stack,
  Box,
} from "@mui/material";
import { Topic } from "../../script/helper";
import "./Sidebar.css";

import data from "./fakedata";

export default function Sidebar() {
  // TODO: fetch data

  return (
    <div>
      <Card>
        <h2 className="topicHeader">Topics</h2>
        <Box className="box">
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            {data.map((topic: Topic) => {
              return (
                <div key={topic.id} className="card">
                  <Typography variant="h6">{topic.title}</Typography>
                  <Typography>{topic.description}</Typography>
                </div>
              );
            })}
          </Stack>
        </Box>
      </Card>
    </div>
  );
}
