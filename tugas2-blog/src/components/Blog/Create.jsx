import React, { useState } from "react";
import axios from "axios";

export default function CreateBlog() {
  const [namaBlog, setNamaBlog] = useState("");
  const [isi, setIsi] = useState("");
  const [tanggal_penulisan, setTanggal_Penulisan] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaBlog.trim() === "") {
      setError("Judul Blog is required");
      return;
    }

    try {
      const response = await axios.post("https://tugas1-pw-2.vercel.app/api/api/blog", {
        nama: namaBlog,
      });

      if (response.status === 201) {
        setSuccess("Blog created successfully!");
        setNamaBlog("");
      } else {
        setError("Failed to create Blog");
      }
    } catch (error) {
      setError("An error occurred while creating blog");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4"> Create Blog</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaBlog" className="form-label">
            {" "}
            Judul Blog
          </label>
          <input type="text" className="form-control" id="namaBlog" value={namaBlog} onChange={(e) => setNamaBlog(e.target.value)} placeholder="Enter Blog Name" />

          <label htmlFor="isi" className="form-label">
            Isi
          </label>
          <input type="text" className="form-control" id="isi" value={isi} onChange={(e) => setIsi(e.target.value)} placeholder="Enter Isi" />
        </div>
        <div className="mb-3">
          <label htmlFor="isi" className="form-label">
            Tanggal Penulisan
          </label>
          <input type="text" className="form-control" id="tanggal_penulisan" value={tanggal_penulisan} onChange={(e) => setIsi(e.target.value)} pattern="\d{4}-\d{2}-\d{2}" placeholder="YYYY-MM-DD" />
        </div>

        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
