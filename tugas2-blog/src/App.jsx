import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes, NavLink } from "react-router-dom";

const Home = React.lazy(() => import("./components/Home"));

const PenulisList = React.lazy(() => import("./components/Penulis/List"));
const PenulisCreate = React.lazy(() => import("./components/Penulis/Create"));
const PenulisEdit = React.lazy(() => import("./components/Penulis/Edit"));

const BlogList = React.lazy(() => import("./components/Blog/List"));
const BlogCreate = React.lazy(() => import("./components/Blog/Create"));
const BlogEdit = React.lazy(() => import("./components/Blog/Edit"));

function App() {
  return (
    <Router>
      {/* NavBar */}
      <nav class="navbar navbar-expand-lg bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            BLOG
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">
                  Home
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/blog">
                  Blog
                </NavLink>
              </li>
              <li class="nav-item">
                <NavLink className="nav-link" to="/penulis">
                  Penulis
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Suspense fallback={<div>Loading . . .</div>}>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/blog" element={<BlogList></BlogList>}></Route>
          <Route path="/blog/create" element={<BlogCreate></BlogCreate>}></Route>
          <Route path="/blog/edit/:id" element={<BlogEdit></BlogEdit>}></Route>
          <Route path="/penulis" element={<PenulisList></PenulisList>}></Route>
          <Route path="/penulis/create" element={<PenulisCreate></PenulisCreate>}></Route>
          <Route path="/penulis/edit/:id" element={<PenulisEdit></PenulisEdit>}></Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
