import { Box, Stack, Typography, TextField, Button, Paper } from "@mui/material";
import { useState } from "react";
import {Link,useNavigate} from 'react-router-dom'
import axios from "axios";
import { useSnackbar } from "notistack";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate=useNavigate();
  const {enqueueSnackbar}=useSnackbar();
    const handleLogin=async()=>{
    try {
        const res=await axios.post('http://localhost:5000/login',formData);
        if(!res.data.success){
            return enqueueSnackbar(res.data.message,{variant:"error"});
        }
        const token=res.data.token;
        localStorage.setItem('token',token);
        enqueueSnackbar(res.data.message,{variant:'success'});
        navigate('/home');
    } catch (error) {
        console.log(error);
        enqueueSnackbar(error.response.data.message,{variant:'error'});
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: "#EAEAEA" }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 3,
          minWidth: "380px",
          maxWidth: "420px",
          textAlign: "center",
          backgroundColor: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight="700" mb={1}>
          Welcome!
        </Typography>
        <Typography color="text.secondary" mb={4}>
          Continue log in to get started
        </Typography>
        <TextField
          fullWidth
          label="Email"
          name="email"
          type="email"
          placeholder="you@example.com"
          value={formData.email}
          onChange={handleChange}
          sx={{
            mb: 3,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#F3F9F1",
              "& fieldset": { borderColor: "#C7E3AE" },
              "&:hover fieldset": { borderColor: "#8BC34A" },
              "&.Mui-focused fieldset": { borderColor: "#4CAF50", boxShadow: "0 0 5px #A5D6A7" },
            },
          }}
        />
        <TextField
          fullWidth
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          sx={{
            mb: 4,
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
              backgroundColor: "#F3F9F1",
              "& fieldset": { borderColor: "#90CAF9" },
              "&:hover fieldset": { borderColor: "#42A5F5" },
              "&.Mui-focused fieldset": { borderColor: "#1976D2", boxShadow: "0 0 5px #90CAF9" },
            },
          }}
        />
        <Button
          fullWidth
          variant="contained"
          onClick={handleLogin}
          sx={{
            background: "linear-gradient(135deg, #004D00, #007B55)",
            borderRadius: "25px",
            fontWeight: "600",
            fontSize: "16px",
            py: 1.5,
            textTransform: "none",
            "&:hover": {
              background: "linear-gradient(135deg, #003300, #006644)",
            },
          }}
        >
          Log In
        </Button>

        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} mt={2}>
        <Typography>don't have an account? </Typography>
        <Link to={'/register'}>register</Link>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;
