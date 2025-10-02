import { Stack, Box, Typography } from '@mui/material'
import { CgNotes } from "react-icons/cg";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ username, email,role,setLink }) => {
const navigate=useNavigate();

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/');
  }
  return (
    <Stack
      direction="column"
      width="300px"
      height="100vh"
    >
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: "#0A400C" }}
        p={2}
      >
        <Typography color="white" fontSize={28} fontWeight={600}>
          {username}
        </Typography>
        <Typography color="white" fontSize={18} fontWeight={500}>
          {email}
        </Typography>
        <Typography color="white" fontSize={14} fontWeight={500}>
          {role}
        </Typography>
      </Box>

      <Stack
        flex={4}
        alignItems="center"
        justifyContent="center"
        spacing={3}
        sx={{ backgroundColor: "#f4f8ec" }}
      >
        <Typography sx={{cursor:'pointer'}} onClick={()=>setLink('task')} fontSize={18} display="flex" alignItems="center" gap={1}>
          <CgNotes /> All tasks
        </Typography>
        <Typography sx={{cursor:'pointer'}} onClick={()=>setLink('high-task')} fontSize={18} display="flex" alignItems="center" gap={1}>
          <MdLabelImportant /> High priority tasks
        </Typography>
        <Typography sx={{cursor:'pointer'}} onClick={()=>setLink('complete-task')} fontSize={18} display="flex" alignItems="center" gap={1}>
          <FaCheckDouble /> Completed tasks
        </Typography>
        <Typography sx={{cursor:'pointer'}} onClick={()=>setLink('incomplete-task')} fontSize={18} display="flex" alignItems="center" gap={1}>
          <TbNotebookOff /> Incompleted tasks
        </Typography>
      </Stack>
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        onClick={handleLogout}
        justifyContent="center"
        sx={{ backgroundColor: "#0A400C", color: "white", cursor: "pointer" }}
      >
        <Typography fontSize={18} fontWeight={600}>
          Logout
        </Typography>
      </Box>
    </Stack>
  )
}

export default Sidebar
