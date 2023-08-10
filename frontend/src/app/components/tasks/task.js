import { EditTaskPath } from "@/app/constants/routes/frontend/task-routes";
import useTask from "@/app/hooks/use-task";
import { MoreVertOutlined } from "@mui/icons-material";
import {
  Card,
  CardContent,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Task = ({ task }) => {
  const { _id, title, status } = task;

  const { push } = useRouter();
  const { onSubmit } = useTask({ task }, "delete");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const handleEdit = () => push(`${EditTaskPath}/${_id}`);
  const handleDelete = (event) => onSubmit(event);

  return (
    <Card
      sx={{
        backgroundColor: "#fdf5ec",
        borderRadius: 1,
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        position: "relative",
        overflow: "visible",
        marginBottom: 2,
      }}
    >
      <CardContent sx={{ pb: 2 }}>
        <Typography component="h6" fontWeight="bold" variant="h6">
          {title}
        </Typography>
        <Chip
          label={status}
          sx={{
            marginTop: 1,
            marginBottom: { xs: 1 },
          }}
          color={status === "completed" ? "primary" : "secondary"}
        />
      </CardContent>
      <IconButton
        aria-label="more"
        aria-controls="task-menu"
        aria-haspopup="true"
        sx={{
          position: "absolute",
          top: 1,
          right: 1,
        }}
        onClick={handleClick}
      >
        <MoreVertOutlined />
      </IconButton>
      <Menu
        id="task-menu"
        anchorEl={anchorEl}
        keepMounted
        open={!!anchorEl}
        onClose={handleClose}
      >
        <MenuItem onClick={handleEdit}>Edit</MenuItem>
        <MenuItem onClick={handleDelete}>Delete</MenuItem>
      </Menu>
    </Card>
  );
};

export default Task;
