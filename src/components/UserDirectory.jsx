import React from "react";
import { useContext } from "react";
import { Context } from "./contextProvider";
import CircularProgress from "@mui/material/CircularProgress";
import UserProfileCard from "./userProfileCard";
import EditUserForm from "./EditUserForm";
import {
  Grid2,
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
  const { pageData, loading, openEdit } = useContext(Context);

  return (
    <div>
      {loading && (
        <Grid2 container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid2>
      )}

      <Grid2 container justifyContent="center" sx={{ mt: 3 }}>
        <Typography variant="h4" align="center">
          Users Details
        </Typography>
        <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer border="1" sx={{ borderColor: "#000" }}>
            <Table
              aria-label="user details"
              border="1"
              sx={{ borderColor: "#000" }}
            >
              <TableHead border="1" sx={{ borderColor: "#000" }}>
                <TableRow border="1" sx={{ borderColor: "#000" }}>
                  <TableCell sx={{ borderColor: "#000", border: 1 }}>
                    <Typography variant="h6" align="center" color="#000">
                      ID
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderColor: "#000", border: 1 }}>
                    <Typography variant="h6" align="center" color="#000">
                      UserName
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderColor: "#000", border: 1 }}>
                    <Typography variant="h6" align="center" color="#000">
                      Full Name
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderColor: "#000", border: 1 }}>
                    <Typography variant="h6" align="center" color="#000">
                      Email
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderColor: "#000", border: 1 }}>
                    <Typography variant="h6" align="center" color="#000">
                      Company Name
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ borderColor: "#000", border: 1 }}>
                    <Typography variant="h6" align="center" color="#000">
                      Actions
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody sx={{ borderColor: "#000", border: 1 }}>
                {pageData.map((user) => (
                  <UserProfileCard key={user.id} user={user} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid2>

      {openEdit && <EditUserForm />}
    </div>
  );
}
