import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";
import Swal from "sweetalert2";

export default function List() {
  const [blog, setBlog] = useState([]);
  const handleDelete = (id, nama) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    }).then((response) => {
      if (response.isConfirmed) {
        axios
          .delete(`https://tugas1-pw-2.vercel.app/api/api/blog/${id}`)
          .then((response) => {
            setBlog(blog.filter((data) => data.id !== id));
            Swal.fire({
              title: "Deleted!",
              text: "Your data has been deleted.",
              icon: "success",
            });
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
            Swal.fire("Error", "There was an issue deleting the data.", "error");
          });
      }
    });
  };
  useEffect(() => {
    axios.get("https://tugas1-pw-2.vercel.app/api/api/blog").then((response) => {
      console.log(response.data);
      setBlog(response.data);
    });
  }, []);

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>List Blog</h2>
        <NavLink to="/blog/create" className="btn btn-primary">
          + Create
        </NavLink>
      </div>

      <div className="table-responsive">
        <table className="table table-hover table-bordered align-middle">
          <thead className="table-light">
            <tr className="text-center">
              <th style={{ width: "15%" }}>Judul</th>
              <th style={{ width: "10%" }}>Tanggal</th>
              <th style={{ width: "10%" }}>Penulis</th>
              <th style={{ width: "45%" }}>Isi</th>
              <th style={{ width: "20%" }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {blog.map((data) => (
              <tr key={data.id}>
                <td>{data.judul}</td>
                <td className="text-center">{data.tanggal_penulisan}</td>
                <td className="text-center">{data.penulis.nama}</td>
                <td className="text-truncate" style={{ maxWidth: "450px" }}>
                  {data.isi}
                </td>
                <td className="text-center">
                  <button onClick={() => handleDelete(data.id)} className="btn btn-danger btn-sm me-2">
                    Hapus
                  </button>
                  <NavLink to={`/blog/edit/${data.id}`} className="btn btn-warning btn-sm">
                    Ubah
                  </NavLink>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
