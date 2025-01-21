import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./contextProvider";
import CloseIcon from "@mui/icons-material/Close";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Grid,
  IconButton,
  Box,
} from "@mui/material";

export default function EditUserForm() {
  const { openEdit, setData, editData, setOpen, setEditData } =
    useContext(Context);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    email: "",
    username: "",
    street: "",
    suite: "",
    city: "",
    zipcode: "",
    phone: "",
    website: "",
    companyName: "",
    catchPhrase: "",
    bs: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setFormData({
        id: editData.id,
        name: editData.name,
        email: editData.email,
        username: editData.username,
        street: editData.address?.street || "",
        suite: editData.address?.suite || "",
        city: editData.address?.city || "",
        zipcode: editData.address?.zipcode || "",
        phone: editData.phone,
        website: editData.website,
        companyName: editData.company?.name || "",
        catchPhrase: editData.company?.catchPhrase || "",
        bs: editData.company?.bs || "",
      });
      setEditData(null);
    }
  }, [editData, setEditData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "id") {
        newErrors[key] = `${key.replace(/([A-Z])/g, " $1")} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const payload = {
        id: formData.id,
        name: formData.name,
        email: formData.email,
        username: formData.username,
        address: {
          street: formData.street,
          suite: formData.suite,
          city: formData.city,
          zipcode: formData.zipcode,
        },
        phone: formData.phone,
        website: formData.website,
        company: {
          name: formData.companyName,
          catchPhrase: formData.catchPhrase,
          bs: formData.bs,
        },
      };

      try {
        const response = await axios.put(
          `https://jsonplaceholder.typicode.com/users/${formData.id}`,
          payload
        );

        if (response.status === 200) {
          setData((prev) =>
            prev.map((user) => (user.id === formData.id ? payload : user))
          );
          alert("User data updated successfully!");
          setOpen(false);
        }
      } catch (error) {
        console.error("Error updating data:", error);
        alert("An error occurred while updating data.");
      }
    }
  };

  return (
    <Dialog
      open={openEdit}
      onClose={() => setOpen(false)}
      fullWidth
      maxWidth="sm"
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "white", // Set the background of the modal to white
        },
      }}
    >
      <DialogTitle>
        Edit User
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setOpen(false)}
          aria-label="close"
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "white", // Set background color to white for content area
        }}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {[
              { label: "Name", id: "name" },
              { label: "Email", id: "email" },
              { label: "Username", id: "username" },
              { label: "Phone", id: "phone" },
              { label: "Website", id: "website" },
            ].map((field) => (
              <Grid item xs={12} key={field.id}>
                <TextField
                  label={field.label}
                  id={field.id}
                  fullWidth
                  value={formData[field.id]}
                  onChange={handleChange}
                  variant="outlined"
                  error={!!errors[field.id]}
                  helperText={errors[field.id]}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              <Box>
                <strong>Address</strong>
              </Box>
              {[
                { label: "Street", id: "street" },
                { label: "Suite", id: "suite" },
                { label: "City", id: "city" },
                { label: "Zipcode", id: "zipcode" },
              ].map((field) => (
                <Grid item xs={12} key={field.id}>
                  <TextField
                    label={field.label}
                    id={field.id}
                    fullWidth
                    value={formData[field.id]}
                    onChange={handleChange}
                    variant="outlined"
                    error={!!errors[field.id]}
                    helperText={errors[field.id]}
                  />
                </Grid>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Box>
                <strong>Company</strong>
              </Box>
              {[
                { label: "Name", id: "companyName" },
                { label: "Catch Phrase", id: "catchPhrase" },
                { label: "BS", id: "bs" },
              ].map((field) => (
                <Grid item xs={12} key={field.id}>
                  <TextField
                    label={field.label}
                    id={field.id}
                    fullWidth
                    value={formData[field.id]}
                    onChange={handleChange}
                    variant="outlined"
                    error={!!errors[field.id]}
                    helperText={errors[field.id]}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  );
}
