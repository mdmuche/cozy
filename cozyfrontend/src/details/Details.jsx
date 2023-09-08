import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

//toastify step 1
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Details() {
  const { user } = useAuthContext();
  let [prod, setProd] = useState(null);
  let { id } = useParams();
  let [disable, setDisable] = useState(false);
  let redirecting = useNavigate();

  //toastify step 2
  const notify = () =>
    toast.success("product deleted successfully!", {
      theme: "dark",
      position: "top-center",
      duration: 5000,
    });

  useEffect(() => {
    if (!user) {
      return;
    }

    axios
      .get(`http://localhost:4000/api/ecommerce/singleproduct/${id}`)
      .then((res) => {
        setProd(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  });

  const handleDelete = function (x) {
    if (!user) {
      return;
    }
    notify();

    setDisable(true);
    console.log("blog deleted!", id);
    axios
      .post("http://localhost:4000/api/ecommerce/deleteproduct", { id: id })
      .then((res) => {
        console.log(res.data);
        redirecting("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      {prod && (
        <Container className="mt-4 text-center justify-content-center align-content-center">
          <h1>{prod.prodName}</h1>
          <div className="text-center">
            <img
              className="img-fluid w-5 h-5 my-5"
              src={prod.prodImg_url}
              alt=""
            />
          </div>
          <div className="text-center text-muted mx-3 p-3 lead lh-2 fs-4">
            <h2 className="text-primary fw-bold display-5">{prod.prodPrice}</h2>
            <p>{prod.prodDetails}</p>
          </div>
          <div className="btn-group text-center my-5">
            <Link to={"/"} className="btn btn-light btn-outline-primary">
              Back
            </Link>
            <Link
              to={`/update/${prod._id}`}
              className="btn btn-light btn-outline-success mx-3"
            >
              Update
            </Link>
            <Button
              onClick={(e) => handleDelete(prod._id)}
              className="btn btn-light btn-outline-warning"
              disabled={disable}
            >
              Delete
            </Button>
          </div>
        </Container>
      )}
      <ToastContainer />
    </div>
  );
}

export default Details;
