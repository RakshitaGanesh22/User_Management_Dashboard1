import UserDirectory from "../UserDirectory";
import NavNewUser from "../navNewUser";
import { Context } from "../contextProvider";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";

export default function InfiniteScroll() {
  const {
    data,
    setLoading,
    infiniteData,
    setInfinite,
    setFinite,
  } = useContext(Context);
  const url = "https://jsonplaceholder.typicode.com/users";
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url); // Fetch data from the API
      console.log("Fetched Data:", response.data);
      setInfinite((prev) => [...prev, ...response.data,...data]); // Append new data
    } catch (error) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    // Trigger data fetch when scrolled to the bottom
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 1
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    setInfinite(data); // Initialize infinite data
    fetchData(); // Fetch the initial data

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data,   infiniteData,
    setInfinite,
    setFinite,]);

  return (
    <div>
      <NavNewUser />
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setFinite(false);
            navigate("/");
          }}
        >
          Pagination
        </Button>
      </Grid>
      {/* User Directory Table */}
      <UserDirectory />
    </div>
  );
}
