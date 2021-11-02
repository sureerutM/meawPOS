import React from "react";
import { BrowserRouter } from "react-router-dom"
import { AppWrapper } from "./components/AppWrapper";
import { Routes } from "./Routes";



export const App = () => {
  return (

    <BrowserRouter>
      <AppWrapper >
        <Routes />
      </AppWrapper>
    </BrowserRouter>

    )
}