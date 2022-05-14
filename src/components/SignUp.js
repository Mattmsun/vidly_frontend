import React, { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  InputAdornment,
  IconButton,
  Snackbar,
} from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";

import { useNavigate } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FormControlLabel from "@mui/material/FormControlLabel";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Checkbox from "@mui/material/Checkbox";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as api from "../api/userApi";

const SignUp = () => {
  const paperStyle = {
    padding: 20,
    height: "70vh",
    width: 600,
    margin: "20px auto",
  };
  const btnstyle = { margin: "8px 0" };
  const gridStyle = { marginBottom: "20px" };
  const textFieldStyle = { marginBottom: "20px" };
  const [showPassword, setShowPassword] = useState({
    password: false,
    conPassword: false,
  });
  let navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
  });
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  //formik function to compare 2 passwords are equal
  function equalTo(ref, msg) {
    return this.test({
      name: "equalTo",
      exclusive: false,
      message: msg || "two passwords must be the same",
      params: {
        reference: ref.path,
      },
      test: function (value) {
        return value === this.resolve(ref);
      },
    });
  }
  Yup.addMethod(Yup.string, "equalTo", equalTo);
  //phone check
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  // formik validation
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      conPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(5, "Must be 5 characters or more")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      phone: Yup.string()
        .matches(phoneRegExp, "Phone number is not valid")
        .required("Required"),
      password: Yup.string()
        .min(5, "Password should be of minimum 5 characters length")
        .required("Required"),
      conPassword: Yup.string().equalTo(Yup.ref("password")).required(),
    }),
    onSubmit: async (values) => {
      let user = { ...values };
      delete user.conPassword;
      const res = await api.signup(user);
      if (res.status === 200) {
        handleOpen();
        async function setTime() {
          const a = await setTimeout(() => {
            navigate("/signin");
          }, 2000);
        }
        setTime();
      } else alert(res.data);
    },
  });
  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Grid align="left" style={gridStyle}>
          <Typography variant="h5">Create an account</Typography>
        </Grid>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            label="Username"
            id="name"
            name="name"
            fullWidth
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
            style={textFieldStyle}
          />
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
            label="Phone Number"
            id="phone"
            name="phone"
            fullWidth
            value={formik.values.phone}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
            style={textFieldStyle}
          />
          <TextField
            label="Password"
            placeholder="Enter password"
            fullWidth
            id="password"
            name="password"
            type={showPassword.password ? "text" : "password"}
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.password && Boolean(formik.errors.password)}
            helperText={formik.touched.password && formik.errors.password}
            style={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        password: !showPassword.password,
                      })
                    }
                  >
                    {showPassword.password ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Comfirm Password"
            placeholder="Enter password"
            fullWidth
            id="conPassword"
            name="conPassword"
            type={showPassword.conPassword ? "text" : "password"}
            value={formik.values.conPassword}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={
              formik.touched.conPassword && Boolean(formik.errors.conPassword)
            }
            helperText={formik.touched.conPassword && formik.errors.conPassword}
            style={textFieldStyle}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() =>
                      setShowPassword({
                        ...showPassword,
                        conPassword: !showPassword.conPassword,
                      })
                    }
                  >
                    {showPassword.conPassword ? (
                      <VisibilityIcon />
                    ) : (
                      <VisibilityOffIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Grid align="left">
            <FormControlLabel
              control={<Checkbox name="checkedB" color="primary" />}
              label="Yes, I would like to receive marketing communications, updates"
            />
          </Grid>
          <Grid align="left">
            <Typography variant="caption" align="left">
              By pressing "Sign Up", you confirm that you have read and agree to
              the terms and conditions
            </Typography>
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
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          You have registered successfully, please log in now.
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default SignUp;
