import React from "react";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import Canvas from "./components/Canvas";

const App = () => {
  return (
    <>
      <Navbar />
      <Search />
      <Canvas width="1280px" height="1024px" />
    </>
  )
}

export default App;
