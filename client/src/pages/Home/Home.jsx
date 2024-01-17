import React, { useEffect } from "react";
import { Grow,Container,Grid } from "@mui/material";
import Form from "../../components/Form";
import SecretPosts from "../../components/SecretPosts";
import {useSelector,useDispatch} from 'react-redux'
import { getSecretmessages } from "../../features/postSlice";

const Home = () => {
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getSecretmessages())
  },[])

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <SecretPosts/>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form/>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
