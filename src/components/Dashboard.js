import React, { useContext, useState, useEffect } from "react";
import "../css/styles.css";
import {
  CardMedia,
  Box,
  Typography,
  CardContent,
  Button,
  CardActionArea,
  CardActions,
  Card,
  Grid,
  Snackbar,
  SnackbarContent,
  IconButton,
  Tooltip,
} from "@mui/material";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import action from "../images/action_m.jpeg";
import crime from "../images/crime_m.jpeg";
import fantasy from "../images/fantasy_m.jpeg";
import horror from "../images/horror_m.jpeg";
import life from "../images/life_m.jpeg";
import romance from "../images/romance_m.jpeg";
import sport from "../images/sports_m.jpeg";
import scifi from "../images/sci-fi_m.jpeg";
import thriller from "../images/thriller_m.jpeg";
import western from "../images/western_m.jpeg";
import war from "../images/war_m.jpeg";
import anime from "../images/anime_m.jpeg";
import PaymentDialog from "./PaymentDialog";
import * as api from "../api/customerApi";
import { UserContext } from "../App";

export const Dashboard = ({ user }) => {
  let navigate = useNavigate();
  const { globalState, setGlobalState } = useContext(UserContext);

  const catageries = [
    {
      source: action,
      category: "Action",
      description:
        "Action films are a film genre where action sequences, such as fighting, stunts, car chases or explosions, take precedence over elements like characterization or complex plotting.",
    },
    {
      source: crime,
      category: "Crime",
      description:
        "Crime film are a film genre inspired by and analogous to the crime fiction literary genre.",
    },
    {
      source: fantasy,
      category: "Fantasy",
      description:
        "Fantasy films are films that belong to the fantasy genre with fantastic themes, usually magic, supernatural events, mythology, folklore, or exotic fantasy worlds.",
    },
    {
      source: horror,
      category: "Horror",
      description:
        "Horror films may incorporate incidents of physical violence and psychological terror; they may be studies of deformed, disturbed, psychotic, or evil characters.",
    },
    {
      source: life,
      category: "Slice of Life",
      description:
        "Slice of life refers to a narrative technique in which a seemingly arbitrary sequence of events in a character's life is presented.",
    },
    {
      source: romance,
      category: "Romance",
      description:
        "Romance movies involve romantic love stories recorded in visual media for broadcast in theatres or on television that focus on passion, emotion.",
    },
    {
      source: sport,
      category: "Sport",
      description:
        "Sport movies use sport as the theme of the film. It is a production in which a sport, sporting event, athlete (and their sport), or follower of sport (and the sport they follow) are prominently featured, and which depend on sport to a significant degree for their plot motivation or resolution.",
    },
    {
      source: scifi,
      category: "Sci-fi",
      description:
        "Science fiction (or sci-fi) movies use speculative, fictional science-based depictions of phenomena that are not fully accepted by mainstream science, such as extraterrestrial lifeforms, spacecraft, robots, cyborgs, interstellar travel or other technologies.",
    },
    {
      source: thriller,
      category: "Thriller",
      description:
        "Thriller is a genre of fiction, having numerous, often overlapping subgenres. Thrillers are characterized and defined by the moods they elicit, giving viewers heightened feelings of suspense, excitement, surprise, anticipation and anxiety.",
    },
    {
      source: western,
      category: "Western",
      description:
        "western, a genre of novels and short stories, motion pictures, and television and radio shows that are set in the American West.",
    },
    {
      source: war,
      category: "War",
      description:
        "The war film as a genre is best defined as a movie in which a fictionalized or fact-based story is told about an actual historical war.",
    },
    {
      source: anime,
      category: "Anime",
      description:
        "A style of animation developed in Japan, characterized by stylized colorful art and often adult themes.",
    },
  ];
  //open the gold customer
  //   const phone = JSON.parse(window.localStorage.getItem("phone"));
  const [open, setOpen] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    isGold: false,
    customerId: "",
  });
  const [openAlert, setOpenAlert] = useState(false);
  //open the payment notice
  const handleClickOpen = () => {
    setOpen(true);
  };
  //open the alert
  const handleOpenAlert = () => {
    setOpenAlert(true);
  };
  //close the alert
  const handleCloseAlert = (event, reason) => {
    if (reason === "clickaway") return;

    setOpenAlert(false);
  };
  useEffect(() => {
    async function getCustomer() {
      const phone = user.phone;
      // console.log(phone);
      if (phone) {
        const res = await api.get(phone);
        const customerData = {
          name: res.data.name,
          isGold: res.data.isGold,
          customerId: res.data._id,
        };
        if (res.data._id) {
          await window.localStorage.setItem(
            "customerId",
            JSON.stringify(res.data._id)
          );
          await window.localStorage.setItem(
            "customerName",
            JSON.stringify(res.data.name)
          );
          await setGlobalState({
            ...globalState,
            customerId: res.data._id,
            customerName: res.data.name,
          });
        }

        if (res.status === 200) setCustomer(customerData);
        else console.log(res.data);
      }
    }
    getCustomer();
  }, [user]);
  let props = {
    open: open,
    setOpen: setOpen,
    user: user,
  };

  const handleExplore = () => {
    if (customer.isGold) navigate("/movie");
    else handleOpenAlert();
  };
  const handleJoin = () => {
    handleCloseAlert();
    setOpen(true);
  };
  // console.log(customer);
  return (
    <Box className="container_1">
      <Box sx={{ padding: "30px" }}>
        <Typography sx={{ color: "white" }} variant="h3">
          Hello,{user.name}
          {!customer.customerId ? (
            <Tooltip placement="top" title="To be  gold customer?">
              <IconButton
                size="large"
                color="warning"
                onClick={handleClickOpen}
              >
                <MonetizationOnOutlinedIcon size="large" />
              </IconButton>
            </Tooltip>
          ) : null}
        </Typography>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Open alert dialog
        </Button> */}
        <PaymentDialog {...props} />
      </Box>

      <Grid
        sx={{ marginLeft: "30px" }}
        container
        direction="row"
        // justifyContent="space-between"
        columns={19}
        rowSpacing={2}
        columnSpacing={2}
        // alignItems="center"
      >
        {catageries.map((category, index) => (
          <Grid item xs={6} key={index}>
            <Card
              sx={{
                maxWidth: "100%",
                minHeight: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="200"
                  //   src={require(category.source)}
                  src={category.source}
                  alt="green iguana"
                />

                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {category.category}
                  </Typography>
                  <Typography variant="body2">
                    {category.description}
                  </Typography>
                </CardContent>
              </CardActionArea>

              <CardActions>
                <Button size="small" color="primary" onClick={handleExplore}>
                  Explore
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openAlert}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        message="To be our gold customer and explore more movies.  
        Would you want to be our gold customer?"
        action={
          <Box>
            <Button color="secondary" size="small" onClick={handleJoin}>
              Join us?
            </Button>
            <IconButton
              aria-label="close"
              color="inherit"
              sx={{ p: 0.5 }}
              onClick={handleCloseAlert}
            >
              <CloseIcon />
            </IconButton>
          </Box>
        }
      ></Snackbar>
    </Box>
  );
};
export default Dashboard;
