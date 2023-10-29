import React, { useRef, useState, Fragment } from "react";
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
import { Dialog, Transition } from "@headlessui/react";
import { useRouter } from "next/router";

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

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const numberRef = useRef(null);
  const shippingAddressRef = useRef(null);
  const cityRef = useRef(null);
  const router = useRouter();

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const handlePaymentsPaystack = (email) => {
    const simplifiedCartItems = cartItems.map((item) => ({
      name: item.name,
      type: item._type,
      quantity: item.quantity,
    }));
    console.log(simplifiedCartItems);

    let handler = PaystackPop.setup({
      key: "pk_test_9b3694a5d585f48ed2e2deb8136eb34ad8d2d356", // Replace with your public key
      email: email,
      amount: totalPrice * 100,
      ref: `${+Math.floor(Math.random() * 1000000000 + 1)}`, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      metadata: {
        custom_fields: [
          {
            display_name: "Cart Items", // Display name for the custom field
            variable_name: "cart_items", // Variable name for the custom field
            value: JSON.stringify(simplifiedCartItems), // Convert cartItems to a JSON string
          },
        ],
      },
      onClose: function () {
        // router.push('/success')
        alert("Window closed.");
      },
      callback: function (response) {
        console.log("success");
        closeModal();
        // onClose();
        setShowCart();
        router.push("/success");
        let message = "Payment complete! Reference: " + response.reference;
        // alert(message);
      },
    });

    handler.openIframe();
  };

  const handleFormSubmit = () => {
    const name = nameRef.current.value;
    const email = emailRef.current.value;
    const phoneNumber = numberRef.current.value;
    const shippingAddress = shippingAddressRef.current.value;
    const city = cityRef.current.value;

    console.log(name, email, phoneNumber, shippingAddress, city);
    handlePaymentsPaystack(email);
  };

  return (
    <>
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
                <button className="btn" type="button" onClick={openModal}>
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
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[200]" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Kindly fill in details for shipping
                  </Dialog.Title>

                  <div className="mt-2">
                    <div className="mt-2">
                      <label htmlFor="name">Full Name</label>
                      <br />
                      <input
                        className="border-2 border-black w-full h-[50px] rounded-md px-2"
                        type="text"
                        required
                        id="name"
                        ref={nameRef}
                      />
                    </div>

                    <div className="mt-2">
                      <label htmlFor="email">Email Address</label>
                      <br />
                      <input
                        className="border-2 border-black w-full h-[50px] rounded-md px-2"
                        type="email"
                        required
                        id="email"
                        ref={emailRef}
                      />
                    </div>

                    <div className="mt-2">
                      <label htmlFor="number">Phone Number</label>
                      <br />
                      <input
                        className="border-2 border-black w-full h-[50px] rounded-md px-2"
                        type="tel"
                        required
                        id="number"
                        ref={numberRef}
                      />
                    </div>

                    <div className="mt-2">
                      <label htmlFor="shipping">Shipping Address</label>
                      <br />
                      <input
                        className="border-2 border-black w-full h-[50px] rounded-md px-2"
                        type="text"
                        required
                        id="shipping"
                        ref={shippingAddressRef}
                      />
                    </div>

                    <div className="mt-2">
                      <label htmlFor="city">City</label>
                      <br />
                      <input
                        className="border-2 border-black w-full h-[50px] rounded-md px-2"
                        type="text"
                        required
                        id="city"
                        ref={cityRef}
                      />
                    </div>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-[15px] border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:scale-105"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-[#f02d34] px-4 py-2 text-sm font-medium text-white hover:scale-105"
                      onClick={handleFormSubmit}
                    >
                      Proceed to pay
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default Cart;
