import { useContext } from "react";

import { Link, NavLink } from "react-router-dom";
import clsx from "clsx";

import { AuthContext } from "@/context/AuthProvider";
import { Button, Type } from "@/components/Button";

import cn from "../style.module.scss";

function Sidebar() {
  const { setUser } = useContext(AuthContext);

  return (
    <div className={clsx(cn["sidebar"])}>
      <Button style={{ textAlign: "left !important" }}>+ New Product</Button>
      <div className="hr"></div>
      <span
        style={{ cursor: "pointer" }}
        onClick={(e) => {
          setUser(null);
        }}
      >
        <i className="fa-solid fa-right-from-bracket"></i>
        &nbsp; Log out
      </span>
      <div className="hr"></div>

      <NavLink
        to="/home"
        className={({ isActive, isPending, isTransitioning }) =>
          isPending
            ? "pending"
            : isActive
            ? "active"
            : isTransitioning
            ? "transitioning"
            : ""
        }
      >
        <i className="fa-solid fa-gauge"></i>
        &nbsp; Dashboard
      </NavLink>
      <div className="hr"></div>
      <NavLink
        to="/products"
        className={({ isActive, isPending, isTransitioning }) =>
          isPending
            ? "pending"
            : isActive
            ? "active"
            : isTransitioning
            ? "transitioning"
            : ""
        }
      >
        <i className="fa-solid fa-table-columns"></i>
        &nbsp; Products
      </NavLink>
    </div>
  );
}

export default Sidebar;
