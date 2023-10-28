import React, { useRef, useState } from "react";
import Link from "next/link";
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { toast } from "react-hot-toast";
import { useStateContext } from "../context/StateContext";
import { urlFor } from "../lib/client";
import getStripe from "../lib/getStripe";
import FormPopup from "./FormPopup";

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const [paymentActive, setPaymentActive] = useState(false);

  const handleCheckout = async () => {
    console.log(cartItems);
    const stripe = await getStripe();

    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cartItems),
    });

    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <div className="cart-wrapper" ref={cartRef}>
      <div className="cart-container">
        <button
          className="cart-heading"
          type="button"
          onClick={() => setShowCart(false)}
        >
          <AiOutlineLeft />
          <span className="heading">Your Cart</span>
          <span className="cart-num-items">({totalQuantities} items)</span>
        </button>

        {cartItems.length < 1 ? (
          <div className="empty-cart">
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <Link href="/">
              <button
                className="btn"
                type="button"
                onClick={() => setShowCart(false)}
              >
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="product-container">
            {cartItems.length >= 1 &&
              cartItems.map((item) => (
                <div className="product" key={item._id}>
                  <img
                    className="cart-product-image"
                    src={urlFor(item?.image[0])}
                    alt=""
                  />
                  <div className="item-desc">
                    <div className="flex top">
                      <h5 className="font-bold">{item.name}</h5>
                      <h4 className="font-medium">#{item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div className="flex justify-between">
                        <p className="quantity-desc flex items-center max-w-fit">
                          <span
                            className="minus"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "dec")
                            }
                          >
                            <AiOutlineMinus />
                          </span>
                          <span className="num">{item.quantity}</span>
                          <span
                            className="plus"
                            onClick={() =>
                              toggleCartItemQuantity(item._id, "inc")
                            }
                          >
                            <AiOutlinePlus />
                          </span>
                        </p>
                        <button
                          className="remove-item"
                          type="button"
                          onClick={() => onRemove(item)}
                        >
                          <TiDeleteOutline />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        )}

        {cartItems.length >= 1 && (
          <div className="cart-bottom">
            <div className="total">
              <h3>Subtotal:</h3>
              <h3>#{totalPrice}</h3>
            </div>
            <div className="btn-container">
              <button
                className="btn"
                type="button"
                onClick={() => setPaymentActive(!paymentActive)}
              >
                Pay Now
              </button>
              {/* <a
                href="https://api.whatsapp.com/send?phone=2347089936232"
                target="_blank"
                rel="noreferrer"
              >
                <button className="btn" type="button">
                  Continue on WhatsApp
                </button>
              </a> */}
            </div>
          </div>
        )}

        {paymentActive && (
          <FormPopup
            onClose={() => setPaymentActive(false)}
            setShowCart={() => setShowCart(false)}
          />
        )}
      </div>
    </div>
  );
};

export default Cart;
