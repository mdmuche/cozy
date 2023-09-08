import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container, Col, Row, Form, Button } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

//toastify step 1
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Update() {
  const { user } = useAuthContext();
  let { uid } = useParams();
  let [prod, setProd] = useState("");
  let [prodName, setProdName] = useState("");
  let [prodPrice, setProdPrice] = useState("");
  let [prodSnippet, setProdSnippet] = useState("");
  let [prodDetails, setProdDetails] = useState("");
  let [prodImg, setProdImg] = useState("");
  let [preview, setPreview] = useState(null);
  let redirecting = useNavigate();
  let [disable, setDisable] = useState(false);
  const [error, setError] = useState(null);

  //toastify step 2
  const notify = () =>
    toast.success("product updated successfully!", {
      theme: "dark",
      position: "top-center",
      duration: 5000,
    });

  useEffect(() => {
    if (!user) {
      return;
    }
    axios
      .get(`http://localhost:4000/api/ecommerce/singleproduct/${uid}`)
      .then((res) => {
        setProd(res.data);
        setProdName(res.prodName.data);
        setProdPrice(res.prodPrice.data);
        setProdDetails(res.prodDetails.data);
        setProdSnippet(res.prodSnippet.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [uid]);

  const handleSubmit = function (e) {
    if (!user) {
      setError("You must be logged in");
      return;
    }
    e.preventDefault(e);
    setDisable(true);
    //Update form-data like in postman
    const formData = new FormData();
    formData.append("prodName", prodName);
    formData.append("prodPrice", prodPrice);
    formData.append("prodSnippet", prodSnippet);
    formData.append("prodDetails", prodDetails);
    formData.append("prodImg", prodImg);
    formData.append("id", uid);

    console.log(formData);

    axios
      .patch(`http://localhost:4000/api/ecommerce/updateproduct`, formData)
      .then((res) => {
        console.log(res.data);
        if (res.data.status === true) {
          redirecting(`/details/${uid}`);
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div>
      <Container>
        <h1 className="my-3 display-5 fw-bold text-center text-success">
          Product Update for {uid}
        </h1>
        <Row className="row justify-content-center align-content-center">
          <Col className="col-6">
            <Form
              onSubmit={(e) => handleSubmit(e)}
              encType="multipart/form-data"
            >
              <Form.FloatingLabel label="prodName">
                <Form.Control
                  type="text"
                  name="prodName"
                  className="mt-3"
                  onChange={(e) => {
                    setProdName(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.FloatingLabel>
              <Form.FloatingLabel label="prodPrice">
                <Form.Control
                  type="text"
                  name="prodPrice"
                  className="mt-3"
                  onChange={(e) => {
                    setProdPrice(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.FloatingLabel>
              <Form.FloatingLabel label="prodSnippet">
                <Form.Control
                  as="textarea"
                  name="prodSnippet"
                  className="mt-3 h-25"
                  onChange={(e) => {
                    setProdSnippet(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.FloatingLabel>
              <Form.FloatingLabel label="prodDetails">
                <Form.Control
                  as="textarea"
                  name="prodDetails"
                  className="mt-3"
                  style={{ height: "150px" }}
                  onChange={(e) => {
                    setProdDetails(e.target.value);
                  }}
                  required
                ></Form.Control>
              </Form.FloatingLabel>
              <Form.Label className="mt-2">only prodImg(png/jpeg)</Form.Label>
              <Form.Control
                type="file"
                name="prodImg"
                onChange={(e) => {
                  setProdImg(e.target.files[0]);
                  setPreview(URL.createObjectURL(e.target.files[0]));
                }}
                required
              ></Form.Control>
              <div className="mt-4 text-center">
                <span>Previous Image: </span>
                <img
                  style={{ height: "50px", width: "50px" }}
                  src={prod && prod.prodImg_url}
                  alt={prod && prod.prodName}
                />
                <span className="mx-2">Upload Image: </span>
                {preview && (
                  <img
                    src={preview}
                    alt="Upload"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </div>
              <div className="text-center my-3">
                <Link
                  className="btn btn-light btn-outline-primary"
                  to={`/details/${uid}`}
                >
                  Back
                </Link>
                <Button
                  className="btn btn-light btn-outline-success mx-3"
                  type="submit"
                  disabled={disable}
                  onClick={notify}
                >
                  Update Product
                </Button>
              </div>
              {error && <div className="error">{error}</div>}
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer />
    </div>
  );
}

export default Update;
