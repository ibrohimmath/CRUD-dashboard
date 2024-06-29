import { useContext, useState } from "react";

import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";
import clsx from "clsx";

import { Text, Size, Boldness } from "@/components/Typography";
import { Button, Type } from "@/components/Button";
import { AuthContext } from "../../context/AuthProvider";

import loginImage from "@/assets/login_image.png";

import cn from "./style.module.scss";

function Login() {
  const { user, setUser } = useContext(AuthContext);
  const [userObj, setUserObj] = useState({
    username: "",
    password: "",
  });

  const [inputColor, setInputColor] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setUserObj({
      ...userObj,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputColor(false);
    try {
      const res = await axios({
        method: "post",
        url: "https://fakestoreapi.com/auth/login",
        data: userObj,
      });
      setUser(res.data.token);
      toast.success("You are logged in");
      setTimeout(() => {
        navigate("/home");
      }, 2800);
    } catch (err) {
      toast.error(errorMessage || "Wrong username or password");
      setInputColor(true);
    }
  };

  return (
    <div className={clsx(cn["login-wrapper"])}>
      <ToastContainer />
      <div className={clsx(cn["login"])}>
        <img
          src={loginImage}
          alt="Login Iiage"
          className={clsx(cn["login-background"])}
        />
        <div className={clsx(cn["login-content"])}>
          <Text
            size={Size.lg}
            boldness={Boldness.semibold}
            style={{ fontFamily: "'Poppins', sans-serif" }}
          >
            Login
          </Text>
          <Text
            boldness={Boldness.lower}
            style={{
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Donec tortor quam at duis tortor.
          </Text>
          <form onSubmit={handleSubmit} className={clsx(cn["login-form"])}>
            <Text
              size={Size.md}
              boldness={Boldness.lower}
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <label htmlFor="username">Username</label>
            </Text>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handleChange}
              placeholder="Your username here"
              value={userObj.username}
              style={{ borderColor: inputColor ? "red" : "" }}
            />
            <Text
              size={Size.md}
              boldness={Boldness.lower}
              style={{
                marginTop: "1.5rem",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <label htmlFor="password">Password</label>
            </Text>
            <input
              type="text"
              id="password"
              name="password"
              value={userObj.value}
              placeholder="Your password here"
              onChange={handleChange}
              style={{ borderColor: inputColor ? "red" : "" }}
            />
            <Button type={Type.secondary} style={{ marginTop: "2rem" }}>
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
