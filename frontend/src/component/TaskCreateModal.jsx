import {
  Modal,
  Typography,
  Box,
  TextField,
  Button,
  Stack,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useState, useEffect } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 450,
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

const TaskCreateModal = ({ open, setOpen, addTask, update, task, isUpdate }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("normal");

  useEffect(() => {
    if (task && isUpdate) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setDueDate(task.dueDate ? task.dueDate.split("T")[0] : "");
      setPriority(task.priority || "normal");
    }
  }, [task, isUpdate]);

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setDueDate("");
    setPriority("normal");
  };

  const handleAdd = () => {
    if (!title || !description || !dueDate) {
      alert("Please fill all required fields");
      return;
    }

    if (addTask) {
      addTask({
        title,
        description,
        dueDate,
        priority,
      });
    }

    setOpen(false);
    resetFields();
  };

  const handleUpdate = () => {
    if (!title || !description || !dueDate) {
      alert("Please fill all required fields");
      return;
    }
    if (isUpdate && task?._id) {
      update(
        {
          title,
          description,
          dueDate,
          priority,
        },
        task._id
      );
    }

    setOpen(false);
    resetFields();
  };

  return (
    <Modal open={open} onClose={() => setOpen(false)}>
      <Box sx={style}>
        <Typography variant="h6" fontWeight={700} mb={2}>
          {isUpdate ? "Update Task" : "Add New Task"}
        </Typography>

        <Stack spacing={2}>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            required
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            required
          />
          <TextField
            label="Due Date"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            required
          />
          <FormControl fullWidth>
            <InputLabel id="priority-label">Priority</InputLabel>
            <Select
              labelId="priority-label"
              value={priority}
              label="Priority"
              onChange={(e) => setPriority(e.target.value)}
            >
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="normal">Normal</MenuItem>
            </Select>
          </FormControl>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" onClick={() => { setOpen(false); resetFields(); }}>
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ backgroundColor: "#0A400C", "&:hover": { backgroundColor: "#133d12" } }}
              onClick={isUpdate ? handleUpdate : handleAdd}
            >
              {isUpdate ? "Update Task" : "Add Task"}
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default TaskCreateModal;
