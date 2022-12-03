import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFromCart, fetchCartandPurchased } from "../api";
import "./css/Cart.css";

const Cart = (props) => {
  const { cart, setCart, user, token } = props;
  const navigate = useNavigate();

  const handleFetchCart = async (token) => {
    if (!token) {
      return;
    }
    const result = await fetchCartandPurchased(token);
    // console.log("CART ITEMS: ", cartItems.data);
    setCart(result.data.cartItems);
  };

  const handleDeleteFromCart = async (e, cartId) => {
    e.preventDefault();
    const item = await deleteFromCart(token, cartId);
    // console.log("DELETE RESULT: ", item);
    if (!item || !item.success) {
      console.log("something went wrong");
    } else {
      const result = await fetchCartandPurchased(token);
      setCart(result.data.cartItems);
      navigate("/cart");
    }
  };

  useEffect(() => {
    handleFetchCart(token);
  }, [token]);

  let total = 0;
  for (let game of cart) {
    total = total + +game.price;
  }

  return (
    <div id="userCart">
      {user ? (
        <h1>{user.username}'s Cart</h1>
      ) : (
        <h1>Please log in to view cart</h1>
      )}
      {cart.map((game, i) => {
        return (
          <div key={i} className="gameCard">
            <img src={game.image} alt="Image" />

            <div id="cartGameInfo">
              <Link to={`/games/${game.id}`}>{game.name}</Link>
              <p>Publisher: {game.publisher}</p>
              <p>Rating: {game.rating}</p>
              <p>${game.price}</p>
            </div>

            <button
              onClick={(e) => {
                handleDeleteFromCart(e, game.cartId);
              }}
            >
              Remove
            </button>
          </div>
        );
      })}
      {cart.length ? <p id="checkoutTotal">Total: ${total}</p> : <></>}
      {cart.length ? (
        <Link className="checkoutButton" to={"/cart/checkout"}>
          Checkout
        </Link>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Cart;
