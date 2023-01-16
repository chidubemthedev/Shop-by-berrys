import React, { useEffect } from "react";
import Link from "next/link";
import { BsBagCheckFill } from "react-icons/bs";
import { runFireworks } from "../lib/utils";
import { useStateContext } from "../context/StateContext";

const Success = () => {
  const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

  useEffect(() => {
    localStorage.clear();
    setCartItems([]);
    setTotalPrice(0);
    setTotalQuantities(0);
    runFireworks();
  }, [setCartItems, setTotalPrice, setTotalQuantities]);

  return (
    <div className="success-wrapper">
      <div className="success">
        <p className="icon">
          <BsBagCheckFill />
        </p>
        <h2>Thank you for your order!</h2>
        <p className="email-msg">Check your email for the reciept.</p>
        <p className="description">
          If you have any questions, please email
          <a href="mailto:order@example.com" className="email">
            order@example.com
          </a>
        </p>
        <Link href="/">
          <button className="btn" type="button" width="300px">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Success;
