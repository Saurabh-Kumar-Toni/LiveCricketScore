import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from "@material-ui/core";
import React, { Fragment, useState } from "react";
import { getMatchDetail } from "../api/API";
import logo from "../img/vs.png";

const MyCard = ( {match} ) =>{

    const [detail,setDetail] = useState({});

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }; 

    const handleClick = (id) =>
    {
        getMatchDetail(id).then((data) => {console.log(data); setDetail(data); handleOpen();}).catch(error => console.log(error));
    };

    const getMatchCard = () => {
        return (
            <Card style = {{marginTop:15}}>
                <CardContent>
                    <Grid container justify = "center" alignItems = "center" spacing= {4}>
                        <Grid item>
                        <Typography variant="h5">{match["team-1"]}</Typography>
                        </Grid>
                        
                        <Grid item>
                            <img style = {{width : 85}}src = {logo}/>
                        </Grid>
                        <Grid item>
                        <Typography variant = "h5">{match['team-2']}</Typography>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify= "center">
                    <Button variant = "contained" color= "primary"
                    onClick = {() => {handleClick(match.unique_id)
                    }}
                    >
                        Show Details
                    </Button>
                    <Button variant = "contained" color ="secondary" style = {{marginLeft:20}}>
                        Start Time {new Date(match.dateTimeGMT).toLocaleString()}
                    </Button>
                    </Grid>
                </CardActions>
            </Card>
        );
    }

    const getDialog = () => (

        <Dialog open = {open} onClose={handleClose}>
            <DialogTitle id = "alert-dialog-title">
                {"Match Details..."}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>{detail.stat}</Typography>
                    <Typography>
                        Match 
                        <span style ={{fontStyle: "italic", fontWeight: "bold"}}>
                            {detail.matchStarted ? " Started" : " Still not Started"} 
                        </span>
                    </Typography>
                    <Typography>
                        Score 
                        <span style ={{fontStyle: "italic", fontWeight: "bold"}}>
                             { detail.score} 
                        </span>
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>

            </DialogActions>

        </Dialog>
    );


    return (
        <Fragment>
            {getMatchCard()}
            {getDialog()}
        </Fragment>
    )
};

export default MyCard;