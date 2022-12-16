import * as React from "react";
import { useState } from "react";
import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import { Topic } from "../../script/helper";
import { useStyles } from "../../../src/style";

import data from "./fakedata";

export default function Sidebar() {
  // TODO: fetch data

  return (
    <div>
      <h2>Topics</h2>
      <Grid container>
        {data.map((topic: Topic) => {
          return (
            <Grid item key={topic.id} alignItems="flex-start">
              <Card>
                <CardMedia />
                <CardContent>
                  <Typography variant="h5">{topic.title}</Typography>
                  <Typography>{topic.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}
