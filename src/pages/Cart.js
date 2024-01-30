import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../utils/images";
import { Link } from "react-router-dom";
import { formatPrice } from "../utils/helpers";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
  getCartTotal,
} from "../store/cartSlice";
import "../components/cart.css";

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const { itemsCount, totalAmount } = useSelector((state) => state.cart);

  if (carts.length === 0) {
    return (
      <div className="home">
        <div className="container my-5 text-center d-flex justify-content-center align-content-center">
          <div className="empty-cart d-flex justify-content-center flex-column align-content-center text-center">
            <img src={shopping_cart} alt="" />
            <span className="fw-6 fs-15 text-gray">
              Your shopping cart is empty.
            </span>
            <Link
              to="/"
              className="shopping-btn fw-5 text-decoration-none text-center text-dark"
            >
              Go shopping Now
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home">
      <div className="cart pb-5">
        <div className="container">
          <div className="cart-ctable">
            <div className="cart-chead">
              {carts.map((cart, idx) => {
                return (
                  <Fragment>
                    <div className="cart-ctr fw-6">
                      <div className="cart-cth">
                        <span className="cart-ctxt">Product</span>
                        <span className="cart-ctxt">{cart.title}</span>
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">Unit Price</span>
                        <span className="cart-ctxt">
                          {formatPrice(cart.discountedPrice)}
                        </span>
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">Quantity</span>
                        <div className="cart-ctd">
                          <div className="qty-change d-flex text-center">
                            <button
                              type="button"
                              className="qty-decrease flex align-center justify-center"
                              onClick={() =>
                                dispatch(
                                  toggleCartQty({ id: cart.id, type: "DEC" })
                                )
                              }
                            >
                              -
                            </button>

                            <div className="qty-value flex align-center justify-center">
                              {cart.quantity}
                            </div>

                            <button
                              type="button"
                              className="qty-increase flex align-center justify-center"
                              onClick={() =>
                                dispatch(
                                  toggleCartQty({ id: cart.id, type: "INC" })
                                )
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">Total Price</span>
                        <span className="cart-ctxt text-orange">
                          {formatPrice(cart.totalPrice)}
                        </span>
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">Actions</span>
                        <div className="cart-ctd">
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => dispatch(removeFromCart(cart.id))}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>

            <div className="cart-cfoot d-flex">
              <div className="cart-cfoot-l mb-3 d-flex justify-content-between">
                <button
                  type="button"
                  className="clear-cart-btn text-uppercase me-3"
                  onClick={() => dispatch(clearCart())}
                >
                  <i className="fas fa-trash"></i>
                  <span className="mx-1">Clear Cart</span>
                </button>
                <button
                  type="button"
                  className="checkout-bt"
                >
                  Check Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
