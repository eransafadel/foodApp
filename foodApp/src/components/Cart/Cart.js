import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import { Fragment, useContext } from "react";
import CartItem from "./CartItem";
import CartContext from "../../store/cart-context";
import Checkout from "./Checkout";
import { useRef, useState } from "react";

const Cart = (props) => {
  const [isSubmit, setIsSubmit] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);
  const [isCheckout, setIsCheckout] = useState(false);
  const cartCtx = useContext(CartContext);
  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    setIsSubmit(true);
    const res = await fetch(
      "https://react-http-91060-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
      }
    );
    setIsSubmit(false);
    setdidSubmit(true);
    cartCtx.clearCart();
  };

  const cartitems = (
    <ul>
      {cartCtx.items.map((item, index) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <Fragment>
      {cartitems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isCheckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!isCheckout && modalActions}
    </Fragment>
  );

  const isSubmittingModalContent = <p>Sending order data..</p>;
  const didSubmitModalContent = 
  <Fragment>
  <p>Succesfully sent the order!</p>
  <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
      </div>
  </Fragment>

  return <Modal 
  onClose={props.onClose}>
  {!isSubmit&&!didSubmit&& cartModalContent}
  {isSubmit&& isSubmittingModalContent}
  {!isSubmit&& didSubmit&&didSubmitModalContent}
  </Modal>;
};

export default Cart;
