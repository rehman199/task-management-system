"use client";
import useTask from "@/app/hooks/use-task";
import {
  Button,
  Container,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const UpdateTaskForm = ({ params }) => {
  const task = useSelector((state) => state.tasks).filter(
    (task) => task._id === params.id
  )[0];

  const { values, loading, onChange, onSubmit } = useTask({ task }, "update");
  const { push } = useRouter();

  useEffect(() => {
    if (!task) push("/");
  });

  return task ? (
    <Container
      component="form"
      maxWidth="xs"
      onSubmit={onSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        gap: 2,
        flex: 1,
      }}
    >
      <Typography component="h1" variant="h4">
        Edit Task
      </Typography>

      <TextField
        required
        fullWidth
        label="Enter task title"
        name="title"
        size="small"
        value={values.task.title}
        onChange={onChange}
      />
      <FormControl component="fieldset">
        <FormLabel component="legend">Status</FormLabel>
        <RadioGroup
          aria-label="Status"
          name="status"
          row
          value={values.task.status}
          onChange={onChange}
          required
        >
          <FormControlLabel
            value="incomplete"
            control={<Radio />}
            label="Incomplete"
          />
          <FormControlLabel
            value="completed"
            control={<Radio />}
            label="Completed"
          />
        </RadioGroup>
      </FormControl>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="warning"
        disabled={loading || !values.task.title || !values.task.status}
      >
        Update
      </Button>
    </Container>
  ) : null;
};

export default UpdateTaskForm;
