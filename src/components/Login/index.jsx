import clsx from "clsx";
import { Text, Size, Boldness } from "../Typography";

import loginImage from "@/assets/login_image.png";
import cn from "./style.module.scss";

function Login() {
  return (
    <div className={clsx(cn["login-wrapper"])}>
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
          <form className={clsx(cn["login-form"])}>
            <Text
              size={Size.md}
              boldness={Boldness.lower}
              style={{
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              <label htmlFor="username">Username</label>
            </Text>
            <input type="text" id="username" placeholder="Your username here" />
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
            <input type="text" id="password" placeholder="Your password here" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
