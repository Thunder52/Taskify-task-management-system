import { Box, Stack, Typography, Chip, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const ViewTask = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { task } = location.state || {}; // get task from state

  if (!task) {
    return <Typography sx={{ p: 4 }}>Task not found</Typography>;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Stack spacing={3} maxWidth="600px" mx="auto">
        <Typography variant="h4" fontWeight={700}>
          {task.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Due Date:
          </Typography>
          <Typography>{new Date(task.dueDate).toLocaleDateString()}</Typography>
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Status:
          </Typography>
          <Chip
            label={task.status}
            color={task.status === "completed" ? "success" : "warning"}
            variant="outlined"
          />
        </Stack>

        <Stack direction="row" spacing={1} alignItems="center">
          <Typography variant="subtitle1" fontWeight={600}>
            Priority:
          </Typography>
          <Chip
            label={task.priority}
            color={task.priority === "high" ? "error" : "primary"}
            variant="outlined"
          />
        </Stack>

        <Typography variant="subtitle1" fontWeight={600}>
          Description:
        </Typography>
        <Typography variant="body1" sx={{ whiteSpace: "pre-line" }}>
          {task.description}
        </Typography>

        <Button
          variant="contained"
          sx={{ backgroundColor: "#0A400C", "&:hover": { backgroundColor: "#133d12" } }}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </Stack>
    </Box>
  );
};

export default ViewTask;
