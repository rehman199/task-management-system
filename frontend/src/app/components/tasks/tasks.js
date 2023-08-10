import { NewTaskPath } from "@/app/constants/routes/frontend/task-routes";
import useTask from "@/app/hooks/use-task";
import { FilterListOutlined } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import Loader from "../shared/loader";
import Task from "./task";

const Tasks = () => {
  const { push } = useRouter();
  const { tasks, loading, handleFilterChange, taskStatusFilter } = useTask({});

  return (
    <>
      <Container
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 2,
          overflow: "hidden",
          height: "100%",
          gap: { xs: 3, sm: 0 },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          flexDirection={{ xs: "column", sm: "row" }}
          gap={{ xs: 3, sm: 1 }}
        >
          <Typography
            component="h1"
            variant="h4"
            textAlign={{ xs: "center", sm: "left" }}
          >
            Tasks
          </Typography>
          <Box display="flex" alignItems="center" gap={2}>
            <FilterListOutlined />
            <Select
              size="small"
              displayEmpty
              defaultValue=""
              style={{ minWidth: 150 }}
              autoWidth
              value={taskStatusFilter}
              onChange={handleFilterChange}
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="incomplete">Incomplete</MenuItem>
            </Select>
            <Button
              variant="contained"
              sx={{ textTransform: "none", ml: { xs: "auto", sm: "none" } }}
              onClick={() => push(NewTaskPath)}
              size="large"
              color="warning"
            >
              Add task
            </Button>
          </Box>
        </Box>
        {tasks.length ? (
          <Box
            display="flex"
            flexDirection="column"
            gap={2}
            py={2}
            sx={{ overflow: "auto" }}
          >
            {tasks.map((task) => (
              <Task key={task.id} task={task} />
            ))}
          </Box>
        ) : (
          !loading && (
            <Typography component="h3" variant="h3" textAlign="center" mt={6}>
              No tasks available
            </Typography>
          )
        )}
      </Container>

      <Loader loading={loading} />
    </>
  );
};

export default Tasks;
