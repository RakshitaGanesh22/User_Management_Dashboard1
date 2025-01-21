import UserDirectory from "../UserDirectory";
import NavNewUser from "../navNewUser";
import { Context } from "../contextProvider";
import React, { useContext, useEffect, useState } from "react";
import { IconButton, Grid, Typography, Paper, Button } from "@mui/material";
import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export default function PaginationHome() {
  const [current, setCurrent] = useState(1);
  const [initial, setInitial] = useState(0);
  const [final, setFinal] = useState(4);
  const { pageData, setPageData, data } = useContext(Context);
  const navigate = useNavigate();

  // Calculate the total number of pages
  const pages = Math.ceil(data.length / 4);

  useEffect(() => {
    // Load initial page data
    const loadData = () => {
      const currentData = data.slice(initial, final);
      setPageData(currentData);
    };
    loadData();
  }, [initial, final, data, setPageData]);

  const handlePrev = () => {
    if (current > 1) {
      setCurrent(current - 1);
      setInitial(initial - 4);
      setFinal(final - 4);
    }
  };

  const handleNext = () => {
    if (current < pages) {
      setCurrent(current + 1);
      setInitial(initial + 4);
      setFinal(final + 4);
    }
  };

  return (
    <div>
      <NavNewUser />

      {/* Pagination Section */}
      <Grid container justifyContent="center" sx={{ mb: 2 }}>
        <Paper
          elevation={3}
          sx={{ padding: 2, display: "flex", alignItems: "center" }}
        >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Page {current} of {pages}
          </Typography>
          <IconButton
            color="primary"
            onClick={handlePrev}
            disabled={current <= 1}
            sx={{ mr: 1 }}
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
          onClick={() => navigate("/infinite")}
        >
          Infinite Scroller
        </Button>
      </Grid>

      {/* User Directory Table */}
      <UserDirectory />
    </div>
  );
}
