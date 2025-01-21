import React, { useContext, useEffect, useCallback } from "react";
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

  // Fetch data from API
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setInfinite((prev) => [...prev, ...response.data]); // Append new data
    } catch (error) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  }, [url, setInfinite, setLoading]);

  // Handle scroll event
  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + windowHeight >= scrollHeight - 50) {
      fetchData(); // Load more data when nearing the bottom
    }
  }, [fetchData]);

  useEffect(() => {
    // Initialize infiniteData with initial data
    setInfinite(data);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Cleanup scroll event listener
      window.removeEventListener("scroll", handleScroll);
    };
  }, [data, handleScroll, setInfinite]);

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
