import React, { useContext, useEffect } from "react";
import { Context } from "../contextProvider";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import NavNewUser from "../navNewUser";
import UserDirectory from "../UserDirectory";

export default function InfiniteScroll() {
  const { data, setLoading, infiniteData, setInfinite, setFinite } =
    useContext(Context);
  const url = "https://jsonplaceholder.typicode.com/users";
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url); // Fetch data from the API
      console.log(response.data);
      setInfinite((prev) => [...prev, ...response.data]); // Append new data to the current infinite data
    } catch (error) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  const handleScroll = () => {
    // Check if user has scrolled to the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight
    ) {
      fetchData(); // Load more data
    }
  };

  useEffect(() => {
    setInfinite(data); // Initialize infinite data
    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup the event listener
    };
  }, [data, setInfinite]);

  return (
    <div>
      <NavNewUser />

      {/* Navigation to Pagination */}
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setFinite(false);
            navigate("/"); // Navigate to the pagination page
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
