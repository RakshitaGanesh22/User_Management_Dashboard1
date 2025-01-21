import React, { useContext } from "react";
import { Context } from "./contextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import UserProfileCard from "./userProfileCard";
import EditUserForm from "./EditUserForm";
import {
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

export default function UserDirectory() {
  const { pageData, loading, openEdit, finiteOpen, infiniteData } =
    useContext(Context);

  return (
    <div>
      {/* Loading Spinner */}
      {loading && (
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      )}

      {/* User Details Table */}
      <Grid container justifyContent="center" sx={{ mt: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Users Details
        </Typography>
        <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer>
            <Table
              aria-label="user details"
              sx={{ borderColor: "#000", border: 1 }}
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography variant="h6" align="center" color="#000">
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center" color="#000">
                      UserName
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center" color="#000">
                      Full Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center" color="#000">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center" color="#000">
                      Company Name
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography variant="h6" align="center" color="#000">
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(!finiteOpen ? pageData : infiniteData).map((user) => (
                  <UserProfileCard key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      {/* Edit User Form */}
      {openEdit && <EditUserForm />}
    </div>
  );
}
