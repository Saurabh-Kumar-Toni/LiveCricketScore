import logo from './logo.svg';
import './App.css';
import { Button, Container, Grid } from '@material-ui/core';
import Navbar from './components/Navbar';
import MyCard from './components/MyCard';
import { Fragment, useEffect, useState } from 'react';
import { getMatches } from './api/API';

function App() {

  const [matches,setMatches] = useState([]);



  useEffect(()=>{

    getMatches().then((data) => {
      setMatches(data.matches);
      console.log(data);
      
    })
    .catch();
  },[]);

  


  return (
    <div className="App">
      <Navbar></Navbar>
      <h1>This is a Live Score App for all the cricket Lovers</h1>
      <Grid container>
      <Grid sm = "3"></Grid>
      <Grid sm = "6">
      {
        matches.map((match) => (
          <Fragment key = {match.unique_id}>
            {match.type == "Twenty20" ? (<MyCard key = {match.unique_id} match={match}></MyCard>):('')}
          </Fragment>
        ))}
      </Grid>
      </Grid>
    </div>
  );
}

export default App;
