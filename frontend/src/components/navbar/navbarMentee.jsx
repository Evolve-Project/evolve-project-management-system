import React from "react";
import {Link} from "react-router-dom"
const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg bg-primary navbar-dark">
     
        <div class="container-fluid">
        <a class="navbar-brand" href="#">
          Hello! Mentee
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <Link class="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" to="/about">
                About
              </Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="#">
                
              </Link>
            </li>
            <li class="nav-item">
              <a class="nav-link disabled" aria-disabled="true">
             
              </a>
            </li>
          </ul>
        </div>
      </div>
        
    </nav>
  );
};

export default Navbar;
//ALT SHIFT F - formatter

