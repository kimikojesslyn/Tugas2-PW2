import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit() {
  const navigate = useNavigate();
  const [namaBlog, setNamaBlog] = useState("");
  const [isiBlog, setIsi] = useState("");
  const [tanggalPenulisan, setTanggal_Penulisan] = useState("");
  const [penulisID, setPenulisID] = useState("");
  const [PenulisList, setPenulisList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://tugas1-pw-2.vercel.app/api/api/blog/${id}`)
      .then((response) => {
        setNamaBlog(response.data.result.nama);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Data tidak ditemukan");
      });
  }, [id]);

  const handleChange = (e) => {
    setNamaBlog(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`https://tugas1-pw-2.vercel.app/api/api/blog/${id}`, { namaBlog })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Blog updated successfully",
          icon: "success",
        });
        navigate("/blog");
      })
      .catch((error) => {
        console.error("Error updating data", error);
        Swal.fire("Error", "There was an issue deleting the data.", "error");
      });
  };
  return (
    <div>
      <h2>Edit Blog</h2>
      {error && <p className="text-danger"> {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="namaBlog" className="form-label">
            Judul Blog
          </label>
          <input type="text" className="form-control" id="namaBlog" value={namaBlog} onChange={handleChange} required />
        </div>

        <button type="submit" className=" btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
