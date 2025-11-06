import React, { useState } from "react";
import axios from "axios";

export default function CreateBlog() {
  const [namaPenulis, setNamaPenulis] = useState("");
  const [emailPenulis, setEmailPenulis] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaPenulis.trim() === "") {
      setError("Nama Penulis is required");
      return;
    }

    try {
      const response = await axios.post("https://tugas1-pw-2.vercel.app/api/api/penulis", {
        nama: namaPenulis,
        email: emailPenulis,
      });

      if (response.status === 201) {
        setSuccess("Penulis created successfully!");
        setNamaPenulis("");
      } else {
        setError("Failed to create Penulis");
      }
    } catch (error) {
      setError("An error occurred while creating Penulis");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4"> Add Penulis</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaPenulis" className="form-label">
            {" "}
            Nama Penulis
          </label>

          <input type="text" className="form-control" id="namaPenulis" value={namaPenulis} onChange={(e) => setNamaPenulis(e.target.value)} placeholder="Enter Penulis Name" />
        </div>
        <div className="mb-3">
          <label htmlFor="emailPenulis" className="form-label">
            {" "}
            Email
          </label>

          <input type="text" className="form-control" id="emailPenulis" value={emailPenulis} onChange={(e) => setEmailPenulis(e.target.value)} placeholder="Enter Email" />
        </div>
        <button type="submit" className="btn btn-primary">
          Add
        </button>
      </form>
    </div>
  );
}
