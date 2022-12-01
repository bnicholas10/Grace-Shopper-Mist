import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteFromCart, fetchCart } from "../api";
import "./css/Cart.css";

const Cart = (props) => {
  const { cart, setCart, user, token } = props;
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  const handleDeleteFromCart = async (e, cartId) => {
    e.preventDefault();
    const item = await deleteFromCart(token, cartId);
    // console.log("DELETE RESULT: ", item);
    if (!item || !item.success) {
      console.log("something went wrong");
    } else {
      const cartItems = await fetchCart(token);
      setCart(cartItems.data);
      navigate("/cart");
    }
  };

  return (
    <div id="userCart">
      {user ? <h1>{user.username}'s Cart</h1> : <h1>Cart</h1>}
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
      {cart.length ? <p>Total: ${total}</p> : <></>}
      {cart.length ? <button>Checkout</button> : <></>}
    </div>
  );
};

export default Cart;
