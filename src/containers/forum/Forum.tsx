import * as React from "react";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import { Thread, Comment } from "../../components";
import { Topic } from "../../script/helper";

export default function Forum() {
  // selected topic: if selected topic is undefined, render all topics without constrains
  const [topic, setTopic] = useState(undefined);

  // selected thread
  // if thread is undefined, render all the threads
  // if thread is selected, render this thread and its child comments
  const [thread, setThread] = useState(undefined);

  if (!thread) {
    return (
      <div>
        <Grid direction="row" spacing={4}></Grid>
      </div>
    );
  }
}
