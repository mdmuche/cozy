import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Button } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function Home() {
  const { user } = useAuthContext();
  let [db, setDb] = useState(null);
  let [like, setLike] = useState(0);

  const handleLike = function (id) {
    if (!user) {
      return;
    }
    axios
      .post(
        "http://localhost:4000/api/ecommerce/likes",
        { id, like: 1 },
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      )
      .then((res) => {
        console.log(res.data);
        setLike((like = like + 1));
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/ecommerce/allproduct", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((resp) => {
        setDb(resp.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [db, like, user.token]);
  return (
    <div>
      <Container>
        <h1>
          All Product
          {/* {location.state.id} */}
        </h1>
        <Row className="align-content-center justify-content-center gap-3">
          {db &&
            db.map((prod) => (
              <Col
                className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 my-4"
                key={prod._id}
              >
                <Card key={prod._id} className="shadow border-0 text-center">
                  <CardHeader>
                    <Card.Title>{prod.prodName}</Card.Title>
                  </CardHeader>
                  <Card.Body>
                    <Link title="view product" to={`/details/${prod._id}`}>
                      <Card.Img
                        variant="top"
                        className="img-fluid"
                        src={prod.prodImg_url}
                      ></Card.Img>
                    </Link>
                    <Card.Subtitle className="mt-3">
                      {prod.prodPrice}
                    </Card.Subtitle>
                    <Card.Text>{prod.prodSnippet}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="text-center">
                    <Button className="btn btn-primary btn-outline-light bg-dark border-0">
                      Cart
                    </Button>
                    <Button
                      className="btn btn-primary btn-outline-light bg-dark border-0 mx-2"
                      onClick={(e) => handleLike(prod._id)}
                    >
                      Like: {prod.prodLikes ? prod.prodLikes : 0}
                    </Button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  );
}

export default Home;
