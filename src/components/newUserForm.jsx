import React, { useState, useContext } from "react";
import axios from "axios";
import { Context } from "./contextProvider";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

export default function NewUserForm() {
  const { setData, setRegister } = useContext(Context);

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

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function validateForm() {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key]) {
        newErrors[key] = `${key} is required`;
      }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
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
        const response = await axios.post(
          "https://jsonplaceholder.typicode.com/users",
          payload
        );

        if (response.status === 201) {
          setData((prev) => [...prev, payload]);
          alert("User data submitted successfully!");
          setRegister(false);
          setFormData({
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
        }
      } catch (error) {
        console.error("Error submitting data:", error);
        alert("An error occurred while submitting data.");
        setRegister(false);
      }
    }
  }

  return (
    <Dialog 
      open={true} 
      onClose={() => setRegister(false)} 
      sx={{
        "& .MuiDialog-paper": {
          backgroundColor: "white", // Set the entire modal background to white
          width: { xs: "90%", sm: "80%", md: "60%", lg: "50%" }, // Adjust width for different screen sizes
          maxWidth: "90%", // Maximum width
          borderRadius: "8px", // Rounded corners
        },
      }}
    >
      <DialogTitle>
        New User Registration
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => setRegister(false)}
          aria-label="close"
          style={{ position: "absolute", top: 10, right: 10 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          backgroundColor: "white", // White background for the content area
          padding: "20px",
          borderRadius: "8px", // Rounded corners for content
        }}
      >
        {[ 
          { label: "ID", id: "id", type: "number" },
          { label: "Name", id: "name", type: "text" },
          { label: "Email", id: "email", type: "email" },
          { label: "Username", id: "username", type: "text" },
          { label: "Phone", id: "phone", type: "text" },
          { label: "Website", id: "website", type: "text" },
        ].map((field) => (
          <div key={field.id} style={{ marginBottom: "10px" }}>
            <TextField
              fullWidth
              variant="outlined"
              label={field.label}
              id={field.id}
              type={field.type}
              placeholder={`Enter ${field.label}`}
              value={formData[field.id]}
              onChange={handleChange}
              error={Boolean(errors[field.id])}
              helperText={errors[field.id]}
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
            />
          </div>
        ))}

        <fieldset style={{ marginBottom: "10px", border: "none" }}>
          <legend>Address</legend>
          {[ 
            { label: "Street", id: "street" },
            { label: "Suite", id: "suite" },
            { label: "City", id: "city" },
            { label: "Zipcode", id: "zipcode" },
          ].map((field) => (
            <div key={field.id}>
              <TextField
                fullWidth
                variant="outlined"
                label={field.label}
                id={field.id}
                placeholder={`Enter ${field.label}`}
                value={formData[field.id]}
                onChange={handleChange}
                error={Boolean(errors[field.id])}
                helperText={errors[field.id]}
                sx={{ backgroundColor: "white", borderRadius: "4px" }}
              />
            </div>
          ))}
        </fieldset>

        <fieldset style={{ border: "none" }}>
          <legend>Company</legend>
          {[ 
            { label: "Name", id: "companyName" },
            { label: "Catch Phrase", id: "catchPhrase" },
            { label: "BS", id: "bs" },
          ].map((field) => (
            <div key={field.id}>
              <TextField
                fullWidth
                variant="outlined"
                label={field.label}
                id={field.id}
                placeholder={`Enter ${field.label}`}
                value={formData[field.id]}
                onChange={handleChange}
                error={Boolean(errors[field.id])}
                helperText={errors[field.id]}
                sx={{ backgroundColor: "white", borderRadius: "4px" }}
              />
            </div>
          ))}
        </fieldset>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} color="primary" variant="contained" fullWidth>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
}
