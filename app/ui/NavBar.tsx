"use client";

import Link from "next/link";
import styled from "styled-components";
import weather_now_logo from "@/app/weather_now_logo.png";
import Image from "next/image";

const Nav = styled.nav``;

const NavBar = () => {
  return (
    <Nav className="bg-white text-black flex h-20 font-bold">
      <div className="w-40 h-20 object-fit m-2">
        <Image src={weather_now_logo} alt="weather logo"></Image>
      </div>
      <div className="flex">
        <div className="p-5">
          <Link href="/home">Home</Link>
        </div>
        <div className="p-5">
          <Link href="/home/contact">Contact Us</Link>
        </div>
        <div className="p-5">
          <Link href="/home/forecast">Forecast</Link>
        </div>
        <div className="p-5">
          <Link href="/home/heatmap">Heatmap</Link>
        </div>
      </div>
    </Nav>
  );
};

export default NavBar;
