import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "./contextProvider";
import CloseIcon from "@mui/icons-material/Close";

export default function NewUserForm() {
  const { setData, setRegister, editData, openEdit, setOpen, setEditData } =
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

  useEffect(() => {
    if (editData) {
        console.log(editData);
      setFormData({
        id: editData.id,
        name: editData.name,
        email: editData.email,
        username: editData.username,
        street: editData.street || "",
        suite: editData.suite || "",
        city: editData.city || "",
        zipcode: editData.zipcode || "",
        phone: editData.phone,
        website: editData.website,
        companyName: editData.name || "",
        catchPhrase: editData.catchPhrase || "",
        bs: editData.bs || "",
      });
      setEditData([]);
    }
  }, [editData]);

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  }

  function validateForm() {
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "id") {
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
        let response;
        if (editData) {
          // Update user data
          response = await axios.put(
            `https://jsonplaceholder.typicode.com/users/${formData.id}`,
            payload
          );
        } else {
          // Create new user
          response = await axios.post(
            "https://jsonplaceholder.typicode.com/users",
            payload
          );
        }

        if (response.status === (formData.id ? 200 : 201)) {
          if (formData.id) {
            // If updating, replace the updated user in state
            setData((prev) =>
              prev.map((user) => (user.id === formData.id ? payload : user))
            );
          } else {
            // If new user, add it to state
            setData((prev) => [...prev, payload]);
          }
          alert(
            `User data ${formData.id ? "updated" : "submitted"} successfully!`
          );
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
    <form
      onSubmit={handleSubmit}
      style={{
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
        {formData.id ? "Edit User" : "New User Registration"}
      </h1>
      <button
        onClick={() => setRegister(false)}
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <CloseIcon />
      </button>

      {[{ label: "ID", id: "id", type: "number", disabled: formData.id }]
        .concat([
          { label: "Name", id: "name", type: "text" },
          { label: "Email", id: "email", type: "email" },
          { label: "Username", id: "username", type: "text" },
          { label: "Phone", id: "phone", type: "text" },
          { label: "Website", id: "website", type: "text" },
        ])
        .map((field) => (
          <div key={field.id} style={{ marginBottom: "10px" }}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type={field.type}
              id={field.id}
              placeholder={`Enter ${field.label}`}
              value={formData[field.id]}
              onChange={handleChange}
              disabled={field.disabled || false}
            />
            {errors[field.id] && (
              <p style={{ color: "red", margin: 0 }}>{errors[field.id]}</p>
            )}
          </div>
        ))}

      <fieldset style={{ marginBottom: "10px" }}>
        <legend>Address</legend>
        {[
          { label: "Street", id: "street" },
          { label: "Suite", id: "suite" },
          { label: "City", id: "city" },
          { label: "Zipcode", id: "zipcode" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type="text"
              id={field.id}
              placeholder={`Enter ${field.label}`}
              value={formData[field.id]}
              onChange={handleChange}
            />
            {errors[field.id] && (
              <p style={{ color: "red", margin: 0 }}>{errors[field.id]}</p>
            )}
          </div>
        ))}
      </fieldset>

      <fieldset>
        <legend>Company</legend>
        {[
          { label: "Name", id: "companyName" },
          { label: "Catch Phrase", id: "catchPhrase" },
          { label: "BS", id: "bs" },
        ].map((field) => (
          <div key={field.id}>
            <label htmlFor={field.id}>{field.label}</label>
            <input
              type="text"
              id={field.id}
              placeholder={`Enter ${field.label}`}
              value={formData[field.id]}
              onChange={handleChange}
            />
            {errors[field.id] && (
              <p style={{ color: "red", margin: 0 }}>{errors[field.id]}</p>
            )}
          </div>
        ))}
      </fieldset>

      <button
        type="submit"
        style={{
          display: "block",
          margin: "20px auto",
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {editData ? "Update" : "Submit"}
      </button>
    </form>
  );
}
