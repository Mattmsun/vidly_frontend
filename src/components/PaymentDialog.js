import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Grid, TextField, Button, Box } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import * as api from "../api/customerApi";

const PaymentDialog = (props) => {
  const { user, open, setOpen } = props;

  const handleClose = () => {
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      cardNum: "",
      cardName: "",
      month: "",
      year: "",
      cvv: "",
    },
    validationSchema: Yup.object({
      cardNum: Yup.string().required("Required"),

      cardName: Yup.string().required("Required"),
      month: Yup.string().required("Required"),
      year: Yup.string().required("Required"),
      cvv: Yup.string().required("Required"),
    }),
    // onSubmit: (values) => {
    //   alert(JSON.stringify(values, null, 2));
    // },
    onSubmit: async (values) => {
      let customer = { name: user.name, phone: user.phone, isGold: true };
      const res = await api.add(customer);
      //   console.log(res);
    },
  });
  return (
    <Box>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Would you want be our gold customer?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Gold customers can have 10% off when renting DVD. That's
            $7.99/month. And you can cancel at any time
          </DialogContentText>
          <Grid container rowSpacing={2} columnSpacing={1}>
            <Grid item xs={12}>
              <TextField
                value={formik.values.cardNum}
                id="cardNum"
                name="cardNum"
                label="Card Number"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cardNum && Boolean(formik.errors.cardNum)}
                helperText={formik.touched.cardNum && formik.errors.cardNum}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                value={formik.values.cardName}
                id="cardName"
                name="cardName"
                label="Holder's name"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.cardName && Boolean(formik.errors.cardName)
                }
                helperText={formik.touched.cardName && formik.errors.cardName}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={formik.values.month}
                id="month"
                name="month"
                label="Exp.MM"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.month && Boolean(formik.errors.month)}
                helperText={formik.touched.month && formik.errors.month}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={formik.values.year}
                id="year"
                name="year"
                label="YYYY"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.year && Boolean(formik.errors.year)}
                helperText={formik.touched.year && formik.errors.year}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                value={formik.values.cvv}
                id="cvv"
                name="cvv"
                label="CVV"
                type="text"
                fullWidth
                variant="standard"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cvv && Boolean(formik.errors.cvv)}
                helperText={formik.touched.cvv && formik.errors.cvv}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button type="submit" onClick={formik.handleSubmit}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default PaymentDialog;
