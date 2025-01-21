import UserDirectory from "../UserDirectory";
import NavNewUser from "../navNewUser";
import { Context } from "../contextProvider";
import React, { useContext, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function InfiniteScroll() {
  const {
    pageData,
    setPageData,
    data,
    setLoading,
    infiniteData,
    setInfinite,
    setFinite,
  } = useContext(Context);
  let url = "https://jsonplaceholder.typicode.com/users";
  const navigate = useNavigate();
  const fetchData = async () => {
    setInfinite((prev) => [...prev, data]);
    try {
      setLoading(true);
      const response = await axios.get(url); // Make API call to fetch data
      console.log(response.data);
      setInfinite((prev) => [...prev, ...response.data]); // Append new data to the current data
    } catch (error) {
      alert("Error fetching data");
    } finally {
      setLoading(false);
    }
  };

  // Scroll event listener
  const handleScroll = () => {
    // Check if we're at the bottom of the page
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      fetchData();
    }
  };

  useEffect(() => {
    setInfinite(data);
    window.addEventListener("scroll", handleScroll); // Add scroll event listener

    return () => {
      window.removeEventListener("scroll", handleScroll); // Cleanup the event listener on unmount
    };
  }, []);

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
