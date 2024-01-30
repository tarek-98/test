import { useEffect, useRef, useState } from "react";
import { Carousel, Col, Container, Row } from "react-bootstrap";
import "./product.css";
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
import { addToCart } from "../store/cartSlice";
import Comments from "./comments/Comments";
import { addToFav, deletFromFav } from "../store/favourite-slice";
import { fetchAsyncProductSingle, getAllProducts } from "../store/productSlice";

function SingleProduct({
  src,
  id,
  price,
  likes,
  image,
  title,
  description,
  color,
  singleproduct,
  setVideoRef,
  autoplay,
}) {
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();
  const [option, setOption] = useState(false);
  const [addcart, setAddcart] = useState(false);
  const [social, setSocial] = useState(false);
  const [des, setDes] = useState(false);
  const [img, setImg] = useState(false);
  const [comment, setComment] = useState(false);
  const [liked, setLiked] = useState(false);

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

  // const videoRef = useRef(null);

  // useEffect(() => {
  //   if (autoplay) {
  //     videoRef.current.play();
  //   }
  // }, [autoplay]);

  // const onVideoPress = () => {
  //   if (videoRef.current.paused) {
  //     videoRef.current.play();
  //   } else {
  //     videoRef.current.pause();
  //   }
  // };
  return (
    <Container className="content">
      <Row className="">
        <Col xxl className="co">
          <div className="card-content">
            <div className="card-content">
              <img src={singleproduct.images[1]} alt="" />
            </div>
          </div>
          <div className="sidebar">
            <div className="price">
              <p className="m-0 text-white">{singleproduct.price}</p>
              <span className="text-white">SAR</span>
            </div>
            <div
              className="item"
              onClick={() => {
                liked
                  ? dispatch(deletFromFav(singleproduct))
                  : dispatch(addToFav(singleproduct));
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
                  parseLikesCount(singleproduct.price) + (liked ? 1 : 0)
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
            <div className="pricee">
              <p className="text-white fw-bold fs-4">
                Price: {singleproduct.price} SAR
              </p>
            </div>
            <div
              className="send-cart text-center mt-4 text-white"
              onClick={() => {
                setAddcart((addcart) => !addcart);
                handleCart();
                dispatch(addToCart(singleproduct));
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
            <h3 className="text-center">{singleproduct.title}</h3>
            <p>{singleproduct.description}</p>
          </div>
          <div className={img ? "product-image" : "hide"}>
            <Carousel data-bs-theme="dark">
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={singleproduct.thumbnail}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={singleproduct.thumbnail}
                  alt="First slide"
                />
              </Carousel.Item>
            </Carousel>
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
                product={singleproduct}
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
export default SingleProduct;
