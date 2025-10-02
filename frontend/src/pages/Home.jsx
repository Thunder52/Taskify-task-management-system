import { Box, Stack, Typography, Button, Pagination } from "@mui/material";
import Sidebar from "../component/Sidebar";
import { useState, useEffect } from "react";
import TaskCard from "../component/TaskCard";
import TaskCreateModal from "../component/TaskCreateModal";
import axios from "axios";
import { useSnackbar } from "notistack";

const Home = () => {
  const [link, setLink] = useState("task");
  const [open, setIsOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const token = localStorage.getItem("token");
  const { enqueueSnackbar } = useSnackbar();

  const addTask = async (newTask) => {
    try {
      const res = await axios.post("http://localhost:5000/task", newTask, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks((prevTasks) => [res.data.task, ...prevTasks]);
      enqueueSnackbar(res.data.message, { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response?.data?.message || "Error", {
        variant: "error",
      });
    }
  };

  const handleUpdate = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/edit/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedTask = res.data.task;

      setTasks((prevTasks) => {
        if (link === "incomplete-task" && updatedTask.status === "completed") {
          return prevTasks.filter((t) => t._id !== id);
        }
        if (link === "complete-task" && updatedTask.status === "incomplete") {
          return prevTasks.filter((t) => t._id !== id);
        }
        return prevTasks.map((t) => (t._id === id ? updatedTask : t));
      });

      enqueueSnackbar(res.data.message, { variant: "success" });
    } catch (error) {
      console.log(error);
      enqueueSnackbar(error.response?.data?.message || "Error", {
        variant: "error",
      });
    }
  };

  const updateTask=async(task,id)=>{
    try {
      const res=await axios.patch(`http://localhost:5000/update/${id}`,task,{
        headers:{
          Authorization:`Bearer ${token}`
        }
      });
      setTasks(prevTasks=>{
        return prevTasks.map((t) => (t._id === id ? task : t));
      })
      enqueueSnackbar(res.data.message,{variant:'success'});
    } catch (error) {
      console.log(error);
       return enqueueSnackbar(error.response?.data?.message || "Error", {
        variant: "error",
      });
    }
  }
  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:5000/task-delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks((prevTasks) => prevTasks.filter((t) => t._id !== id));
      enqueueSnackbar(res.data.message, { variant: "success" });
    } catch (error) {
      console.log(error);
      return enqueueSnackbar(error.response?.data?.message || "Error", {
        variant: "error",
      });
    }
  };
  useEffect(() => {
    const getTask = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/${link}?page=${page}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setTasks(res.data.tasks);
        setUser(res.data.user);
        setTotalPages(res.data.totalPage);
      } catch (error) {
        console.log(error);
      }
    };
    getTask();
  }, [link, page, token]);

  return (
    <Stack direction="row" height="100vh">
      {user && (
        <Sidebar
          username={user.username}
          email={user.email}
          role={user.role}
          setLink={setLink}
        />
      )}
      <Box flex={1} p={4} sx={{ backgroundColor: "#f9fafb" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Typography variant="h5" fontWeight={700} color="#0A400C">
            My Tasks
          </Typography>
          { user?.role==='admin'&& (<Button
            onClick={() => setIsOpen(true)}
            variant="contained"
            sx={{
              backgroundColor: "#0A400C",
              "&:hover": { backgroundColor: "#133d12" },
            }}
          >
            + Add Task
          </Button>)}
        </Stack>

        {tasks?.length > 0 ? (
          <>
            <Stack direction="row" flexWrap="wrap" gap={2} mb={3}>
              {tasks.map((task) => (
                <TaskCard
                  task={task}
                  key={task._id}
                  role={user.role}
                  handleUpdate={handleUpdate}
                  handleDelete={handleDelete}
                  updateTask={updateTask}
                />
              ))}
            </Stack>
            <Stack alignItems="center" mt={2}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={(e, value) => setPage(value)}
                color="primary"
              />
            </Stack>
          </>
        ) : (
          <Typography>No tasks added</Typography>
        )}
      </Box>
      <TaskCreateModal open={open} setOpen={setIsOpen} addTask={addTask} update={updateTask} isUpdate={false}/>
    </Stack>
  );
};

export default Home;
