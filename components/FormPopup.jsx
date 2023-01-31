import React, { useRef, useState } from "react";
import { useStateContext } from "../context/StateContext";
import Success from "../pages/success";
import { useRouter } from "next/router";

const FormPopup = ({ onClose, setShowCart }) => {
  const {totalPrice} = useStateContext();
  const [error, setError] = useState({name: '', email: '', phoneNumber: 0})
  const nameRef = useRef(null)
  const emailRef = useRef(null)
  const numberRef = useRef(null)
  const router = useRouter();


  const handleFormSubmit = (event) => {
    event.preventDefault()

    const name = nameRef.current.value
    const email = emailRef.current.value
    const phoneNumber = numberRef.current.value

    if (!name) {
      setError({ ...error, name: "Name is required." });
    }
    if (!email) {
      setError({ ...error, email: "Email is required." });
    }
    if (!phoneNumber) {
      setError({ ...error, phoneNumber: "Phone number is required." });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError({ ...error, email: "Invalid email address." });
    }

    console.log(name, email, phoneNumber)
    handlePaymentsPaystack(email)
    

  }

  const handlePaymentsPaystack = (email) => {
    let handler = PaystackPop.setup({
      key: "pk_test_9b3694a5d585f48ed2e2deb8136eb34ad8d2d356", // Replace with your public key
      email: email,
      amount: totalPrice * 100,
      ref: `${+Math.floor(Math.random() * 1000000000 + 1)}`, // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      // label: "Optional string that replaces customer email"
      onClose: function () {
        // router.push('/success')
        alert("Window closed.");
      },
      callback: function (response) {
        onClose()
        setShowCart()
        router.push("/success");
        let message = "Payment complete! Reference: " + response.reference;
        alert(message);
      },
    });

    handler.openIframe();
  };

  return (
    <div className="form-modal">
      <div className="form-overlay" />
      <div>
        <div>FormPopup</div>
        <button onClick={onClose}>&times;</button>
      </div>

      <form onSubmit={handleFormSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" required id="name" ref={nameRef} /> <br />
          {error.name && <p style={{ color: "red" }}>{error.name}</p>}

          <label htmlFor="email">Email</label>
          <input type="email" required id="email" ref={emailRef} /> <br />
          {error.email && <p style={{ color: "red" }}>{error.email}</p>}

          <label htmlFor="number">Phone Number</label>
          <input type="tel" required id="number" ref={numberRef} /> <br />
          {error.phoneNumber && <p style={{ color: "red" }}>{error.phoneNumber}</p>}

          <button>Proceed to pay</button>
        </div>
      </form>
    </div>
  );
};

export default FormPopup;
