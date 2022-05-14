import { useState, useContext } from "react";
import {
  Grid,
  Paper,
  IconButton,
  TextField,
  Button,
  Typography,
  InputAdornment,
  Link,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "../api/userApi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../App";
const SignIn = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 600,
    margin: "20px auto",
  };
  const { globalState, setGlobalState } = useContext(UserContext);

  let navigate = useNavigate();

  const btnstyle = { margin: "8px 0" };
  const gridStyle = { marginBottom: "20px" };
  const textFieldStyle = { marginBottom: "20px" };
  const [showPassword, setShowPassword] = useState(false);
  const [openProcess, setOpenProcess] = useState(false);
  const handleToggle = () => {
    setOpenProcess(!openProcess);
  };
  const handleCloseProcess = () => {
    setOpenProcess(false);
  };
  async function setProcess() {
    await setTimeout(() => {
      handleCloseProcess();
    }, 2000);
  }
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(5, "Password should be of minimum 5 characters length")
        .required("Required"),
    }),
    // onSubmit: (values) => {
    //   delete values.conPassword;
    //   alert(JSON.stringify(values, null, 2));
    // },
    onSubmit: async (values) => {
      handleToggle();
      setProcess();
      const res = await api.signin(values);
      if (res.status === 200) {
        // console.log(JSON.stringify(res.data));
        await window.localStorage.setItem("token", JSON.stringify(res.data));
        await setGlobalState({
          ...globalState,
          token: res.data,
        });
        navigate("/category");
      } else alert(res.response.data);
    },
  });
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="left" style={gridStyle}>
          <Typography variant="h5">Sign In</Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Email"
            placeholder="Enter email"
            fullWidth
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            style={textFieldStyle}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            fullWidth
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Grid align="left">
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Remember me"
            />
          </Grid>

          <Button
            type="submit"
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
          >
            Sign in
          </Button>
        </form>
        <Typography>
          <Link href="#" underline="hover">
            Forgot password ?
          </Link>
        </Typography>
        <Typography>
          Do you have an account ?<Link href="../signup">Sign Up</Link>
        </Typography>
      </Paper>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openProcess}
        // onClick={handleCloseProcess}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};

export default SignIn;
