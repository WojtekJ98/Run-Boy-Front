// components/Loader.js
import Image from "next/image";
import React from "react";
import Logo from "../public/img/Logo1.svg";

const Loader = ({ progress }) => {
  return (
    <div style={loaderStyles.container}>
      <div style={loaderStyles.logo}>
        <Image src={Logo} alt="Logo Run Boy" />
      </div>
      <div style={loaderStyles.spinner}></div>
      {progress !== undefined && (
        <div style={loaderStyles.progress}>{progress}%</div>
      )}
    </div>
  );
};

const loaderStyles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f0f0f0",
  },
  logo: { fontSize: "24px", marginBottom: "20px" },
  spinner: {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTop: "5px solid #333",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  progress: { marginTop: "10px", fontSize: "18px" },
};

export default Loader;
