import React, { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { shopping_cart } from "../utils/images";
import { Link } from "react-router-dom";
import {
  getAllCarts,
  removeFromCart,
  toggleCartQty,
  clearCart,
  addToCart,
} from "../store/cartSlice";
import "../components/cart.css";
import { Table } from "react-bootstrap";

const CartPage = () => {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);

  const CArtTotlaPrice = carts.reduce((acc, product) => {
    acc += product.price * product.quantity;
    return acc;
  }, 0);
  const CartWeight = carts.reduce((acc, product) => {
    acc += product.productWeight * product.quantity;
    return acc;
  }, 0);

  const VAT = CArtTotlaPrice * (15 / 100);
  const Services = CArtTotlaPrice * (5 / 100);
  const Total = CArtTotlaPrice + VAT + Services;
  const Weight = CartWeight; //dynamic

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
    <div className="home pb-5">
      <div className="cart pb-5" dir="rtl">
        <div className="container">
          <div className="cart-ctable">
            <div className="cart-chead">
              {carts.map((cart, idx) => {
                return (
                  <Fragment>
                    <div className="cart-ctr fw-6">
                      <div className="cart-cth">
                        <span className="cart-ctxt">اسم المنتج</span>
                        <span className="cart-ctxt">{cart.title}</span>
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">اللون</span>
                        <img
                          className="cart-ctxt"
                          src={cart.productColor}
                          alt=""
                        />
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">سعر الوحدة</span>
                        <span className="cart-ctxt">{cart.price} ر.س</span>
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">الكمية</span>
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
                        <span className="cart-ctxt">السعر الاجمالي</span>
                        <span className="cart-ctxt text-orange">
                          {cart.totalPrice} ر.س
                        </span>
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">الوزن</span>
                        <span className="cart-ctxt text-orange">
                          {cart.productWeight * cart.quantity} كجم
                        </span>
                      </div>
                      <div className="cart-cth">
                        <span className="cart-ctxt">حذف</span>
                        <div className="cart-ctd">
                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() => dispatch(removeFromCart(cart.id))}
                          >
                            حذف المنتج
                          </button>
                        </div>
                      </div>
                    </div>
                  </Fragment>
                );
              })}
            </div>
            <div className="col p-2">
              <Table striped bordered hover responsive>
                <tbody>
                  <tr>
                    <td>السعر الاجمالي</td>
                    <td>{CArtTotlaPrice.toFixed(2)} ر.س</td>
                  </tr>
                  <tr>
                    <td>ضريبة القيمة المضافة ( 15% )</td>
                    <td>{VAT.toFixed(2)} ر.س</td>
                  </tr>
                  <tr>
                    <td>رسوم خدمات جملة و بس شامل الضريبة</td>
                    <td>{Services.toFixed(2)} ر.س</td>
                  </tr>
                  <tr>
                    <td>الاجمالي النهائي</td>
                    <td>{Total.toFixed(2)} ر.س</td>
                  </tr>
                  <tr>
                    <td>الوزن الكلي</td>
                    <td>{Weight} كجم</td>
                  </tr>
                </tbody>
              </Table>
            </div>
            <div className="cart-cfoot d-flex">
              <div className="cart-cfoot-l mb-3 d-flex justify-content-between">
                <button
                  type="button"
                  className="clear-cart-btn text-uppercase me-3"
                  onClick={() => dispatch(clearCart())}
                >
                  <span className="mx-1">حذف العربة</span>
                </button>
                <Link
                  to="/account/checkout"
                  type="button"
                  className="checkout-bt me-2"
                >
                  أكمل لخيارات الشحن
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
