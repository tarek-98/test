import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./footer.css";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faInbox,
  faUser,
  faCartShopping,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { getAllCarts } from "../store/cartSlice";

function Footer() {
  const carts = useSelector(getAllCarts);
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary nav-buttom home"
      fixed="bottom"
    >
      <Container>
        <div className="nav-item">
          <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faHouse} className="icon active" />
            <span className="item-name active">Home</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faMessage} className="icon active" />
            <span className="item-name active">Chat</span>
          </Link>
        </div>
        <div className="nav-item pop">
          <Link to="/cart" className="nav-item">
            <FontAwesomeIcon icon={faCartShopping} className="icon active" />
            <span className="badge bg-white text-dark">{carts.length}</span>
            <span className="item-name">Cart</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/categories" className="nav-item">
            <FontAwesomeIcon icon={faInbox} className="icon active" />
            <span className="item-name">Sections</span>
          </Link>
        </div>
        <div className="nav-item">
          <Link to="/profile" className="nav-item">
            <FontAwesomeIcon icon={faUser} className="icon active" />
            <span className="item-name">Profile</span>
          </Link>
        </div>
      </Container>
    </Navbar>
  );
}

export default Footer;
