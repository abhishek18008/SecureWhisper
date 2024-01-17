import React, { useEffect, useState } from "react";
import { Grid, CircularProgress } from "@mui/material";
import SecretPost from "./SecretPost";
import { useSelector } from "react-redux";

const SecretPosts = () => {
  const secretposts = useSelector((state) => state.messages.posts);

  return secretposts.length ? (
    <Grid
      sx={{
        display: "flex",
        alignItems: "stretch",
        flexWrap: "wrap",
        marginTop: 2,
      }}
      container
      spacing={3}
    >
      {secretposts.map((post) => (
        <Grid key={post._id} item xs={12} sm={6} md={6}>
          <SecretPost post={post}/>
        </Grid>
      ))}
    </Grid>
  ) : (
    <CircularProgress />
  );
};

export default SecretPosts;
