import React, { useEffect } from "react";

const Alert = ({ msg, type, removeAlert }) => {
  useEffect(() => {
    let timeout = setTimeout(() => removeAlert(), 2000);
    return () => {
      clearTimeout(timeout);
    };
  });

  return <p className={`alert alert-${type}`}>{msg}</p>;
};

export default Alert;
