import React from "react";

function Home() {
  const containerStyle = {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "2rem",
    borderRadius: "5px",
  };

  return (
    <div style={containerStyle}>
      <h2>Home</h2>
      <h5>Welcome to the home page!</h5>
    </div>
  );
}

export default Home;
