import React from "react";
import { Link, useLocation } from "react-router-dom";

export const CustomNavLink = ({
  activeClassName,
  className,
  inactiveClassName,
  to,
  ...rest
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const allClassName =
    className +
    (isActive === true ? ` ${activeClassName}` : ` ${inactiveClassName}`);

  return <Link className={allClassName} to={to} {...rest} />;
};
