import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import { useContext } from "react";
import { Context } from "./contextProvider";
import { TableRow, TableCell, IconButton, Box } from "@mui/material";

export default function UserProfileCard({ user }) {
  const { id, company, name, username, email } = user;
  const { setEditData, setOpen, data, setData } = useContext(Context);

  function handleEdit(idd) {
    setOpen(true);

    const filtered = data.find((item) => item.id === idd);
    if (filtered) {
      setEditData(filtered);
    } else {
      console.error("User not found");
    }
  }

  async function handleDelete() {
    if (id) {
      try {
        const response = await axios.delete(
          `https://jsonplaceholder.typicode.com/users/${id}`
        );

        if (response.status === 200) {
          setData((prev) => prev.filter((user) => user.id !== id));
          alert("User data deleted successfully!");
          setOpen(false);
        }
      } catch (error) {
        console.error("Error deleting data:", error);
        alert("An error occurred while deleting data.");
      }
    } else {
      alert("No user selected to delete.");
    }
  }

  return (
    <TableRow key={id} sx={{ borderColor: "#000", border: 1 }}>
      <TableCell sx={{ borderColor: "#000", border: 1 }}>{id}</TableCell>
      <TableCell sx={{ borderColor: "#000", border: 1 }}>{username}</TableCell>
      <TableCell sx={{ borderColor: "#000", border: 1 }}>{name}</TableCell>
      <TableCell sx={{ borderColor: "#000", border: 1 }}>{email}</TableCell>
      <TableCell sx={{ borderColor: "#000", border: 1 }}>
        {company.name}
      </TableCell>
      <TableCell sx={{ borderColor: "#000", border: 1 }}>
        <Box display="flex" justifyContent="center">
          <IconButton color="primary" onClick={() => handleEdit(id)}>
            <EditIcon />
          </IconButton>
          <IconButton color="error" onClick={() => handleDelete(id)}>
            <DeleteForeverIcon />
          </IconButton>
        </Box>
      </TableCell>
    </TableRow>
  );
}
