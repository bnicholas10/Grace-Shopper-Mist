import { useState } from "react";
import "./css/Cart.css";

const Cart = (props) => {
  const { cart, setCart, user } = props;
  const [total, setTotal] = useState(0);
  return (
    <div id="userCart">
      {user ? <h1>{user.username}'s Cart</h1> : <h1>Cart</h1>}
      {cart.map((game, i) => {
        return (
          <div key={i} className="gameCard">
            <img src={game.image} alt="test Image" />
            <div>
              <h3>{game.name}</h3>
              <p>Publisher: {game.publisher}</p>
              <p>Rating: {game.rating}</p>
              <p>${game.price}</p>
            </div>

            <button>Remove</button>
          </div>
        );
      })}
      {cart.length ? <p>Total: ${total}</p> : <></>}
      {cart.length ? <button>Checkout</button> : <></>}
    </div>
  );
};

export default Cart;
