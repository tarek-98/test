import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { FaMoneyBillAlt, FaTruck } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import "../components/checkOut.css";
import { fetchUsers } from "../store/user-slice";
import { addToCart, getAllCarts } from "../store/cartSlice";

function CheckOut() {
  const dispatch = useDispatch();
  const carts = useSelector(getAllCarts);
  const user = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(fetchUsers(5));
  }, []);

  const CartWeight = carts.reduce((acc, product) => {
    acc += product.productWeight * product.quantity;
    return acc;
  }, 0);

  function handleChargePrice() {
    if (CartWeight < 15) {
      const price = 20;
      return price;
    } else if (CartWeight < 25) {
      const price = 25;
      return price;
    } else if (CartWeight < 35) {
      const price = 30;
      return price;
    } else if (CartWeight < 50) {
      const price = 35;
      return price;
    }
  }

  return (
    <div className="home">
      <div className="address" dir="rtl">
        <Row>
          <Col>
            <div className="title d-flex justify-content-between">
              <p className="m-0">
                <FaMoneyBillAlt className="ms-2" />
                الدفع & عنوان الشحن
              </p>
              <p className="m-0">
                <span className="fw-bold">+</span> أضافة
              </p>
            </div>
            <div className="content">
              <div className="main-address">
                <label
                  htmlFor="main-add"
                  className="d-flex align-content-center p-2 pt-4 pb-4"
                >
                  <input type="radio" name="address" id="main-add" checked />
                  <p className="m-0 ms-2 me-2">{user.username},</p>
                  <p className="m-0">{user.username},</p>
                </label>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="charge" dir="rtl">
        <Row>
          <Col>
            <div className="title d-flex justify-content-between">
              <p className="m-0">
                <FaTruck className="ms-2 truck" />
                خيارات التسليم
              </p>
            </div>
            <div className="content">
              <div className="main-address">
                <label
                  htmlFor="charge-add"
                  className="d-flex align-content-center p-2 pt-4 pb-4"
                >
                  <input type="radio" name="charge" id="charge-add" checked />
                  <p className="m-0 ms-2 me-2">
                    {" "}
                    الشحن مع ارامكس (الوزن :{CartWeight} كجم)
                  </p>
                  <p className="me-4 m-0">السعر {handleChargePrice()} ر.س</p>
                </label>
                <span className="d-flex align-content-center text-black-50 pe-3 pb-2">
                  (وقت التوصيل من 2 حتى 8 أيام عمل )
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="charge" dir="rtl">
        <Row>
          <Col>
            <div className="title d-flex justify-content-between">
              <p className="m-0">
                <FaTruck className="ms-2 truck" />
                خيارات التسليم
              </p>
            </div>
            <div className="content">
              <div className="main-address">
                <label
                  htmlFor="charge-add2"
                  className="d-flex align-content-center p-2 pt-4 pb-4"
                >
                  <input type="radio" name="charge" id="charge-add2" checked />
                  <p className="m-0 ms-2 me-2">
                    {" "}
                    الشحن مع المخرجين (الوزن :{CartWeight} كجم)
                  </p>
                  <p className="me-4 m-0">السعر 00 ر.س</p>
                </label>
                <span className="d-flex align-content-center text-black-50 pe-3 pb-2">
                  ( مبلغ الشحن يدفع للمخرج عند الإستلام )
                </span>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CheckOut;
