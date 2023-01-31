import React from "react";

const FormPopup = ({ onClose }) => {
  return (
    <div className="form-modal">
      <div>
        <div>FormPopup</div>
        <button onClick={onClose}>Close</button>
      </div>

      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" required /> <br />
          <label htmlFor="email">Email</label>
          <input type="email" required /> <br />
          <label htmlFor="number">Phone Number</label>
          <input type="number" required /> <br />
          <button>Proceed to pay</button>
        </div>
      </form>
    </div>
  );
};

export default FormPopup;
