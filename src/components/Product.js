import { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./product.css";
import "./singleProduct.css";
import { IoIosCloseCircleOutline } from "react-icons/io";
import {
  FaCheck,
  FaFacebook,
  FaHeart,
  FaInstagram,
  FaSnapchat,
  FaTiktok,
  FaTwitterSquare,
} from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { FaCommentDots } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Comments from "./comments/Comments";
import { addToFav, deletFromFav } from "../store/favorite-slice";
import { addToCart } from "../store/cartSlice";

function Products({ product, setVideoRef, autoplay }) {
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [option, setOption] = useState(false);
  const [addcart, setAddcart] = useState(false);
  const [social, setSocial] = useState(false);
  const [des, setDes] = useState(false);
  const [img, setImg] = useState(false);
  const [comment, setComment] = useState(false);
  const [liked, setLiked] = useState(false);
  const [changeBackground, setChangeBackground] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty + 1;
      if (tempQty > product.stock) tempQty = product.stock;
      return tempQty;
    });
  };

  const decreaseQty = () => {
    setQuantity((prevQty) => {
      let tempQty = prevQty - 1;
      if (tempQty < 1) tempQty = 1;
      return tempQty;
    });
  };
  const addToCartHandler = (product) => {
    // - product.price * (product.discountPercentage / 100);
    let discountedPrice = product.price;
    let totalPrice = quantity * product.price;
    let productColor = product.images[changeBackground];
    let productWeight = product.stock; //edit

    dispatch(
      addToCart({
        ...product,
        quantity: quantity,
        totalPrice,
        discountedPrice,
        productColor,
        productWeight,
      })
    );
  };
  function desToggel() {
    setDes((des) => !des);
    setImg(false);
    setOption(false);
    setSocial(false);
  }
  function desToggel2() {
    setImg((img) => !img);
    setDes(false);
    setOption(false);
    setSocial(false);
  }
  const handleCart = () => {
    setTimeout(() => {
      setAddcart(false);
    }, 2000);
  };

  // Function to convert likes count to a number
  const parseLikesCount = (count) => {
    if (typeof count === "string") {
      if (count.endsWith("K")) {
        return parseFloat(count) * 1000;
      }
      return parseInt(count);
    }
    return count;
  };

  // Function to format likes count
  const formatLikesCount = (count) => {
    if (count >= 10000) {
      return (count / 1000).toFixed(1) + "K";
    }
    return count;
  };

  const handleLikeClick = () => {
    setLiked((prevLiked) => !prevLiked);
  };

  const videoRef = useRef(null);

  useEffect(() => {
    if (autoplay) {
      videoRef.current.play();
    }
  }, [autoplay]);

  const onVideoPress = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  };
  return (
    <Container className="content">
      <Row className="">
        <Col xxl className="co">
          <div className="card-content">
            {" "}
            {/*video*/}
            <img src={product.images[1]} alt="" />
          </div>
          <div className="sidebar">
            <div className="price">
              <p className="m-0 text-white">{product.price}</p>
              <span className="text-white">SAR</span>
            </div>
            <div
              className="item"
              onClick={() => {
                liked
                  ? dispatch(deletFromFav(product))
                  : dispatch(addToFav(product));
              }}
            >
              <FaHeart
                style={{
                  color: liked ? "#FF0000" : "white",
                }}
                onClick={handleLikeClick}
              />
              <span>
                {formatLikesCount(
                  parseLikesCount(product.price) + (liked ? 1 : 0)
                )}
              </span>
            </div>
            <div
              className="item"
              onClick={() => {
                setOption((option) => !option);
                setSocial(false);
              }}
            >
              <FaCartPlus />
              <span>Add</span>
            </div>
            <div
              className="item"
              onClick={() => {
                setComment((comment) => !comment);
                setOption(false);
                setSocial(false);
              }}
            >
              <FaCommentDots />
              <span>80</span>
            </div>
            <div
              className="item"
              onClick={() => {
                setSocial((social) => !social);
                setOption(false);
              }}
            >
              <FaShare />
            </div>
          </div>
          <div className={option ? "option" : "hide-option"}>
            <div
              className="close"
              onClick={() => setOption((option) => !option)}
            >
              <IoIosCloseCircleOutline />
            </div>
            <main className="">
              <div className="product-single">
                <div className="container p-0">
                  <div className="product-single-content bg-white d-grid">
                    <div className="product-single-l">
                      <div className="product-img">
                        <div className="product-img-zoom">
                          <img
                            src={product.images[changeBackground]}
                            alt=""
                            className="img-cover h-100"
                          />
                        </div>
                        <div className="product-img-thumbs d-flex align-center">
                          {product.images.map((image, index) => {
                            return (
                              <div
                                className="thumb-item"
                                onClick={() => setChangeBackground(index)}
                              >
                                <img src={image} alt="" className="img-cover" />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div className="product-single-r">
                      <div className="product-details font-manrope">
                        <div className="title">{product.title}</div>
                        <div className="price">
                          <div className="d-flex align-center">
                            <div className="old-price">
                              Price: {product.price * quantity} SAR
                            </div>
                          </div>
                        </div>

                        <div className="qty flex align-center m-1">
                          <div className="qty-text mb-2">Quantity:</div>
                          <div className="qty-change d-flex">
                            <button
                              type="button"
                              className="qty-decrease d-flex justify-content-center"
                              onClick={() => decreaseQty()}
                            >
                              -
                            </button>
                            <div className="qty-value d-flex justify-content-center">
                              {quantity}
                            </div>
                            <button
                              type="button"
                              className="qty-increase d-flex justify-content-center"
                              onClick={() => increaseQty()}
                            >
                              +
                            </button>
                          </div>
                          {product.stock === 0 ? (
                            <div className="qty-error text-uppercase bg-danger text-white">
                              out of stock
                            </div>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </main>
            <div
              className="send-cart text-center mt-4 text-white"
              onClick={() => {
                setAddcart((addcart) => !addcart);
                handleCart();
                setOption((option) => !option);
                addToCartHandler(product);
              }}
            >
              Add to Cart
            </div>
          </div>
          <div className={addcart ? "added-cart" : "hide-cart"}>
            <FaCheck />
            <p className="mb-0 ms-2">Added Sucssesfully</p>
          </div>
          <div className={social ? "social" : "hidden"}>
            <div className="links">
              <FaFacebook />
              <FaTiktok />
              <FaSnapchat />
              <FaInstagram />
              <FaTwitterSquare />
            </div>
          </div>
          <div className="description">
            <div className="description-btn">
              <p className="" onClick={() => desToggel()}>
                Description
              </p>
              <p className="" onClick={() => desToggel2()}>
                Photos
              </p>
            </div>
          </div>
          <div className={des ? "des-info" : "hide"}>
            <div className="close" onClick={() => setDes((des) => !des)}>
              <IoIosCloseCircleOutline />
            </div>
            <h3 className="text-center">{product.title}</h3>
            <p>{product.description}</p>
          </div>
          <div className={img ? "product-image" : "hide"}>
            <div className="close" onClick={() => setImg((img) => !img)}>
              <IoIosCloseCircleOutline />
            </div>
            <div className="product-info p-2">
              <div className="image">
                <img src={product.images[changeBackground]} alt="" />
              </div>
            </div>
            <div className="product-slider-img">
              {product.images.map((image, index) => {
                return (
                  <div onClick={() => setChangeBackground(index)}>
                    <img src={image} alt="" />
                  </div>
                );
              })}
            </div>
          </div>
          <div className={comment ? "com" : "hide-comment"}>
            <div
              className="close"
              onClick={() => setComment((comment) => !comment)}
            >
              <IoIosCloseCircleOutline />
            </div>
            <div className="comm">
              <Comments
                product={product}
                commentsUrl="http://localhost:3004/comments"
                currentUserId="1"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
export default Products;
