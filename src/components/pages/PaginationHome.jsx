import React, { useContext, useEffect, useState } from "react";
import { IconButton, Grid, Typography, Paper, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import NavNewUser from "../navNewUser";
import UserDirectory from "../UserDirectory";
import { Context } from "../contextProvider";

export default function PaginationHome() {
  const [current, setCurrent] = useState(1); // Current page
  const { pageData, setPageData, data, setFinite } = useContext(Context);
  const navigate = useNavigate();

  const itemsPerPage = 4; // Number of items per page
  const pages = Math.ceil(data.length / itemsPerPage); // Total number of pages

  useEffect(() => {
    // Calculate and set page data
    const start = (current - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    setPageData(data.slice(start, end));
  }, [current, data, setPageData]);

  const handlePrev = () => {
    if (current > 1) {
      setCurrent((prev) => prev - 1);
    }
  };

  const handleNext = () => {
    if (current < pages) {
      setCurrent((prev) => prev + 1);
    }
  };

  return (
    <div>
      <NavNewUser />

      {/* Pagination Section */}
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            display: "flex",
            alignItems: "center",
            maxWidth: "400px",
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: "center" }}>
            Page {current} of {pages}
          </Typography>
          <IconButton
            color="primary"
            onClick={handlePrev}
            disabled={current <= 1}
          >
            <ArrowBack />
          </IconButton>
          <IconButton
            color="primary"
            onClick={handleNext}
            disabled={current >= pages}
          >
            <ArrowForward />
          </IconButton>
        </Paper>
      </Grid>

      {/* Infinite Scroller Button */}
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            setFinite(true);
            navigate("/infinite");
          }}
        >
          Infinite Scroller
        </Button>
      </Grid>

      {/* User Directory Table */}
      <UserDirectory />
    </div>
  );
}
