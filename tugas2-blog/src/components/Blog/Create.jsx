import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateBlog() {
  const [namaBlog, setNamaBlog] = useState("");
  const [isiBlog, setIsi] = useState("");
  const [tanggalPenulisan, setTanggal_Penulisan] = useState("");
  const [penulisID, setPenulisID] = useState("");
  const [PenulisList, setPenulisList] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPenulis = async () => {
      try {
        const response = await axios.get("https://tugas1-pw-2.vercel.app/api/api/penulis");
        setPenulisList(response.data);
      } catch (error) {
        console.error("Error fetch data penulis:", error);
      }
    };

    fetchPenulis();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (namaBlog.trim() === "") {
      setError("Judul Blog is required");
      return;
    }

    try {
      const response = await axios
        .post("https://tugas1-pw-2.vercel.app/api/api/blog", {
          judul: namaBlog,
          isi: isiBlog,
          tanggal_penulisan: new Intl.DateTimeFormat("en-CA").format(new Date(tanggalPenulisan)),
          penulis_id: penulisID,
        })
        .catch((error) => {
          console.log(error);
          setError(error.response.data.message);
        });
      console.log("Response:", response.data);
      if (response.status === 201) {
        setSuccess("Blog created successfully!");
      } else {
        console.log("error");
        setError("Failed to create Blog");
      }
    } catch (error) {
      console.log("Error details:", error.response?.data);
      setError(JSON.stringify(error.response?.data));
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
          <input type="text" className="form-control" id="isi" value={isiBlog} onChange={(e) => setIsi(e.target.value)} placeholder="Enter Isi" />
        </div>
        <div className="mb-3">
          <label htmlFor="tanggal_penulisan" className="form-label">
            Tanggal Penulisan
          </label>
          <input type="date" className="form-control" id="tanggal_penulisan" value={tanggalPenulisan} onChange={(e) => setTanggal_Penulisan(e.target.value)} />
        </div>
        <div className="mb-4">
          <label htmlFor="penulisID" className="form-label">
            <strong>Nama Penulis</strong>
          </label>
          <select className="form-select" id="penulisID" value={penulisID} onChange={(e) => setPenulisID(e.target.value)}>
            <option value="">Pilih Penulis</option>
            {PenulisList.map((penulis) => (
              <option key={penulis.id} value={penulis.id}>
                {penulis.nama}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">
          Create
        </button>
      </form>
    </div>
  );
}
