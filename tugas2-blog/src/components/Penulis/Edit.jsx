import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function Edit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://tugas1-pw-2.vercel.app/api/api/penulis/${id}`)
      .then((response) => {
        setNama(response.data.result.nama);
      })
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setError("Data tidak ditemukan");
      });
  }, [id]);

  const handleChange = (e) => {
    setNama(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`https://tugas1-pw-2.vercel.app/api/api/penulis/${id}`, { nama })
      .then((response) => {
        Swal.fire({
          title: "Success!",
          text: "Penulis updated successfully",
          icon: "success",
        });
        navigate("/penulis");
      })
      .catch((error) => {
        console.error("Error updating data", error);
        Swal.fire("Error", "There was an issue deleting the data.", "error");
      });
  };
  return (
    <div>
      <h2>Edit Penulis</h2>
      {error && <p className="text-danger"> {error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="nama" className="form-label">
            Nama Penulis
          </label>

          <input type="text" className="form-control" id="nama" value={nama} onChange={handleChange} required />
        </div>
        <button type="submit" className=" btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
}
