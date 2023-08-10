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

const CreateTaskForm = () => {
  const { values, loading, onChange, onSubmit } = useTask(
    {
      task: {
        title: "",
        status: "incomplete",
      },
    },
    "create"
  );

  return (
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
        Create Task
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
        Create
      </Button>
    </Container>
  );
};

export default CreateTaskForm;
