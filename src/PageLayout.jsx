import React from "react";
import { Outlet } from "react-router-dom";
import { NavBar } from "./NavBar/NavBar";

export function PageLayout() {
  return (
    <>
      <NavBar />
      <div style={{ paddingTop: '80px' }}>
        <Outlet />
      </div>
    </>
  );
}
