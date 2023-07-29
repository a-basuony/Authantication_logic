import React, { useState } from "react";
import classes from "./Register.module.css";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [formData, setFromData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFromData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.username) {
      errors.username = "Username is required.";
    }

    if (!formData.email) {
      errors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email format.";
    }

    if (formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters long.";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      setError("");
      fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBfNBK1RX-9NWYbUYQjQrIldWclWVon284",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      )
        .then(async (response) => {
          if (response.ok) {
            // Registration successful, handle the success case

            navigate("/login");
            console.log("Registration successful!");
          } else {
            // Registration failed, handle the error case
            const data = await response.json();
            setError(data.message || "Registration failed.");
          }
        })
        .catch((err) => {
          setIsLoading(false);
          setError(err);
        })
        .finally((res) => {
          setIsLoading(false);
          setFromData({
            username: "",
            email: "",
            password: "",
          });
        });
    }
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <div>
          <label className={classes.label}>User Name</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            className={classes.input}
          />
          {validationErrors.username && (
            <p className={classes.error}>{validationErrors.username}</p>
          )}
        </div>
        <div>
          <label className={classes.label}>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={classes.input}
          />
          {validationErrors.email && (
            <p className={classes.error}>{validationErrors.email}</p>
          )}
        </div>
        <div>
          <label className={classes.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className={classes.input}
          />
          {validationErrors.password && (
            <p className={classes.error}>{validationErrors.password}</p>
          )}
        </div>
        <div>
          <label className={classes.label}></label>
          {error && <p className={classes.error}>{error}</p>}
          {isLoading && <p className={classes.loading}>Loading...</p>}

          <button type="submit" className={classes.button} disabled={isLoading}>
            Signup
          </button>
          <p className={classes.haveAccount}>
            Login with existing account <Link to="/login">Login</Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Register;
