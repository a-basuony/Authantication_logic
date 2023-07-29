import React from "react";

function Profile({ userData }) {
  const containerStyle = {
    textAlign: "center",
    fontSize: "18px",
    marginTop: "2rem",
    borderRadius: "5px",
  };
  return (
    <div style={containerStyle}>
      <h3>Profile</h3>
      <h5> your Email: {userData.email}</h5>
    </div>
  );
}

export default Profile;
