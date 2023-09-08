import React from "react";
import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { AiOutlineShoppingCart } from "react-icons/ai";
import "./Nav.scss";

function Nav() {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  const handleClick = () => {
    logout();
  };

  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark fixed-top">
        <div class="container-fluid">
          <Link class="navbar-brand text-white" to={"/"}>
            Cozy
          </Link>
          {user && (
            <button
              class="navbar-toggler text-white bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          )}
          {user && (
            <div
              class="collapse navbar-collapse align-items-center justify-content-end"
              id="navbarNavAltMarkup"
            >
              <ul class="navbar-nav">
                <Link
                  class="nav-link text-white active"
                  aria-current="page"
                  to={"/"}
                >
                  All Product
                </Link>
                <Link class="nav-link text-white" to={"/create"}>
                  Create
                </Link>
                <Link class="nav-link text-white" to={"/about"}>
                  About
                </Link>
                <Link class="nav-link text-white" href="#">
                  <AiOutlineShoppingCart className="cart" />
                  [0]
                </Link>
                <Link>
                  <button className="mt-2 border-0" onClick={handleClick}>
                    Log out
                  </button>
                </Link>
              </ul>
            </div>
          )}
          {!user && (
            <button
              class="navbar-toggler text-white bg-white"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNavAltMarkup"
              aria-controls="navbarNavAltMarkup"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="navbar-toggler-icon"></span>
            </button>
          )}
          {!user && (
            <div
              class="collapse navbar-collapse align-items-center justify-content-end"
              id="navbarNavAltMarkup"
            >
              <ul class="navbar-nav">
                <Link class="nav-link text-white" to={"/login"}>
                  login
                </Link>
                <Link class="nav-link text-white" to={"/signup"}>
                  signup
                </Link>
              </ul>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Nav;
