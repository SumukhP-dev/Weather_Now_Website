import { JSX } from "react"
import NavBar from "./NavBar"
import React from 'react';
import { ReactNode } from 'react';

type ReactNodeComponentProps = {
    children: ReactNode;
};

const Layout = ({ children }: ReactNodeComponentProps): JSX.Element => {
  return (
    <>
      <NavBar />
      <main>{children}</main>
    </>
  )
}

export default Layout