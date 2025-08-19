"use client";

import { Link } from "react-router-dom";
import styled from "styled-components";
import weather_now_logo from "../assets/images/logos/weather_now_logo.png";

const Nav = styled.nav``;

const NavBar = () => {
  return (
    <Nav className="bg-white text-black flex h-16 font-bold mb-10">
      <div className="w-40 h-15 object-fit m-2">
        <img src={weather_now_logo} alt="weather logo"></img>
      </div>
      <div className="flex mt-2">
        <div className="p-3">
          <Link to="/">Home</Link>
        </div>
        <div className="p-3">
          <Link to="/contact">Contact Us</Link>
        </div>
        <div className="p-3">
          <Link to="/forecast">Forecast</Link>
        </div>
        <div className="p-3">
          <Link to="/openaiaichatbot">OpenAI AI Chatbot</Link>
        </div>
        <div className="p-3">
          <Link to="/ragaichatbot">RAG AI Chatbot</Link>
        </div>
      </div>
    </Nav>
  );
};

export default NavBar;
