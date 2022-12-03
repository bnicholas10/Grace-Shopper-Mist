import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCart, purchaseCart } from "../api";
import "./css/Checkout.css";

const Checkout = (props) => {
  const { cart, setCart, token } = props;
  const navigate = useNavigate();
  const [contactInfo, setContactInfo] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    email: "",
    phoneNumber: "",
  });
  const [billingInfo, setBillingInfo] = useState({
    cardNumber: "",
    cardholderName: "",
    expirationDate: "",
    cvvCode: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  let total = 0;
  for (let game of cart) {
    total = total + +game.price;
  }

  //   if (
  //     Object.values(contactInfo).every((item) => item.length > 2) &&
  //     Object.values(billingInfo).every((item) => item.length > 2)
  //   ) {
  //     console.log("Works as intended");
  //   } else {
  //     console.log("Something is missing");
  //   }

  const handleFieldClear = () => {
    setContactInfo({
      firstName: "",
      lastName: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      email: "",
      phoneNumber: "",
    });
    setBillingInfo({
      cardNumber: "",
      cardholderName: "",
      expirationDate: "",
      cvvCode: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });
  };

  const handleCheckOut = async (e) => {
    e.preventDefault();
    if (
      Object.values(contactInfo).every(Boolean) &&
      Object.values(billingInfo).every(Boolean)
    ) {
      for (let game of cart) {
        const result = await purchaseCart(token, game.cartId);
        console.log("result: ", result);
      }
      setMessage("Thank you for your order");
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
      setTimeout(async () => {
        setMessage("");
        const cartItems = await fetchCart(token);
        setCart(cartItems.data);
      }, 2100);
    } else {
      setError("Please fill out all fields");
      setTimeout(() => {
        setError("");
      }, 2500);
    }
  };

  return (
    <div id="checkoutPage">
      {cart.length ? (
        <div id="checkout">
          <p id="checkoutConfirmationMessage">{message}</p>
          <p id="checkoutErrorMessage">{error}</p>
          <h1 id="checkoutHeader">Checkout</h1>
          <button onClick={handleFieldClear} id="clearFields">
            Clear All Fields
          </button>
          <form className="checkoutForm" onSubmit={handleCheckOut}>
            <h3>Contact Info</h3>
            <div id="contactInfo">
              <input
                type={"input"}
                value={contactInfo.firstName}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    firstName: event.target.value,
                  });
                }}
                placeholder="First Name *"
              />
              <input
                type={"input"}
                value={contactInfo.lastName}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    lastName: event.target.value,
                  });
                }}
                placeholder="Last Name *"
              />
              <input
                type={"input"}
                value={contactInfo.address}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    address: event.target.value,
                  });
                }}
                placeholder="Address *"
              />
              <input
                type={"input"}
                value={contactInfo.city}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    city: event.target.value,
                  });
                }}
                placeholder="City *"
              />
              <input
                type={"input"}
                value={contactInfo.state}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    state: event.target.value,
                  });
                }}
                placeholder="State *"
              />
              <input
                type={"input"}
                value={contactInfo.zipCode}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    zipCode: event.target.value,
                  });
                }}
                placeholder="ZIP Code *"
              />
              <input
                type={"input"}
                value={contactInfo.email}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    email: event.target.value,
                  });
                }}
                placeholder="Email *"
              />
              <input
                type={"input"}
                value={contactInfo.phoneNumber}
                onChange={(event) => {
                  setContactInfo({
                    ...contactInfo,
                    phoneNumber: event.target.value,
                  });
                }}
                placeholder="Phone Number *"
              />
            </div>

            <h3>Billing Info</h3>
            <div id="billingInfo">
              <input
                type={"input"}
                value={billingInfo.cardNumber}
                onChange={(event) => {
                  setBillingInfo({
                    ...billingInfo,
                    cardNumber: event.target.value,
                  });
                }}
                placeholder="Card Number *"
              />
              <input
                type={"input"}
                value={billingInfo.cardholderName}
                onChange={(event) => {
                  setBillingInfo({
                    ...billingInfo,
                    cardholderName: event.target.value,
                  });
                }}
                placeholder="Cardholder Name *"
              />
              <input
                type={"input"}
                value={billingInfo.expirationDate}
                onChange={(event) => {
                  setBillingInfo({
                    ...billingInfo,
                    expirationDate: event.target.value,
                  });
                }}
                placeholder="Expiration Date *"
              />
              <input
                type={"input"}
                value={billingInfo.cvvCode}
                onChange={(event) => {
                  setBillingInfo({
                    ...billingInfo,
                    cvvCode: event.target.value,
                  });
                }}
                placeholder="CVV Code *"
              />
              <input
                type={"input"}
                value={billingInfo.address}
                onChange={(event) => {
                  setBillingInfo({
                    ...billingInfo,
                    address: event.target.value,
                  });
                }}
                placeholder="Address *"
              />
              <input
                type={"input"}
                value={billingInfo.city}
                onChange={(event) => {
                  setBillingInfo({
                    ...billingInfo,
                    city: event.target.value,
                  });
                }}
                placeholder="City *"
              />
              <input
                type={"input"}
                value={billingInfo.state}
                onChange={(event) => {
                  setBillingInfo({
                    ...billingInfo,
                    state: event.target.value,
                  });
                }}
                placeholder="State *"
              />
              <input
                type={"input"}
                value={billingInfo.zipCode}
                onChange={(event) => {
                  setBillingInfo({
                    ...billingInfo,
                    zipCode: event.target.value,
                  });
                }}
                placeholder="ZIP Code *"
              />
            </div>
            <div>
              <p id="checkoutTotal">Total: ${total}</p>
              <button className="checkoutButton" type="submit">
                Complete
              </button>
            </div>
          </form>
        </div>
      ) : (
        <h1 id="emptyCartMessage">
          Please add items to your cart to check out
        </h1>
      )}
    </div>
  );
};

export default Checkout;
