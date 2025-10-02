import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Visibility, Edit, Delete, Done, Undo } from "@mui/icons-material";
import { useState } from "react";
import TaskCreateModal from "./TaskCreateModal";

const TaskCard = ({ task, role, handleUpdate, handleDelete, updateTask }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <Card
      key={task._id}
      sx={{
        width: 280,
        borderRadius: 3,
        boxShadow: 3,
        transition: "0.3s",
        "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardContent>
        <Typography
          variant="h6"
          fontWeight={600}
          color="#0A400C"
          gutterBottom
          noWrap
        >
          {task.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Due: {task.dueDate}
        </Typography>

        <Typography
          variant="caption"
          fontWeight={600}
          sx={{
            mt: 1,
            display: "inline-block",
            px: 1.2,
            py: 0.3,
            borderRadius: "8px",
            backgroundColor:
              task.status === "completed" ? "#d1f7c4" : "#ffe0b2",
            color: task.status === "completed" ? "#2e7d32" : "#e65100",
          }}
        >
          {task.status}
        </Typography>
      </CardContent>

      <Stack direction="row" spacing={1} justifyContent="center" p={1} pb={2}>
        {role === "admin" && (
          <>
            <Tooltip title="View">
              <IconButton
                color="primary"
                onClick={() =>
                  navigate("/task/view", { state: { task } }) // pass task directly
                }
              >
                <Visibility />
              </IconButton>
            </Tooltip>

            <Tooltip title="Edit" onClick={() => setOpen(true)}>
              <IconButton color="secondary">
                <Edit />
              </IconButton>
            </Tooltip>

            <Tooltip title="Delete">
              <IconButton color="error" onClick={() => handleDelete(task._id)}>
                <Delete />
              </IconButton>
            </Tooltip>
          </>
        )}

        <Tooltip
          title={
            task.status === "completed" ? "Mark as Pending" : "Mark as Completed"
          }
        >
          <IconButton
            color={task.status === "completed" ? "warning" : "success"}
            onClick={() => handleUpdate(task._id)}
          >
            {task.status === "completed" ? <Undo /> : <Done />}
          </IconButton>
        </Tooltip>
      </Stack>

      <TaskCreateModal
        open={open}
        setOpen={setOpen}
        update={updateTask}
        task={task}
        isUpdate={true}
      />
    </Card>
  );
};

export default TaskCard;
