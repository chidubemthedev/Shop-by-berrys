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
import Success from "../pages/success";
import { useRouter } from "next/router";
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

  const router = useRouter();

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

  const handlePaymentsPaystack = () => {
    let handler = PaystackPop.setup({
      key: "pk_test_9b3694a5d585f48ed2e2deb8136eb34ad8d2d356", // Replace with your public key
      email: "chukwudubem7@gmail.com",
      amount: totalPrice * 100,
      ref: `${+Math.floor(Math.random() * 1000000000 + 1)}`, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function () {
        // router.push('/success')
        alert("Window closed.");
      },
      callback: function (response) {
        router.push("/success");
        let message = "Payment complete! Reference: " + response.reference;
        alert(message);
      },
    });

    handler.openIframe();
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
                      <h5>{item.name}</h5>
                      <h4>#{item.price}</h4>
                    </div>
                    <div className="flex bottom">
                      <div>
                        <p className="quantity-desc">
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
                      </div>
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
              {/* <button className="btn" type="button" onClick={sendToWhatsapp}>Continue on WhatsApp</button> */}
              <a
                href="https://api.whatsapp.com/send?phone=2347089936232"
                target="_blank"
                rel="noreferrer"
              >
                Continue on WhatsApp
              </a>
            </div>
          </div>
        )}

        {paymentActive && <FormPopup onClose={() => setPaymentActive(false)} />}
      </div>
    </div>
  );
};

export default Cart;
