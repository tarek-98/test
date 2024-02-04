import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProducts, getAllProducts } from "../store/productSlice";
import Product from "../components/Product";

function Home() {
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, []);

  const videoRefs = useRef([]);
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.8, // Adjust this value to change the scroll trigger point
    };

    // This function handles the intersection of videos
    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const videoElement = entry.target;
          videoElement.play();
        } else {
          const videoElement = entry.target;
          videoElement.pause();
        }
      });
    };

    const observer = new IntersectionObserver(
      handleIntersection,
      observerOptions
    );

    // We observe each video reference to trigger play/pause
    videoRefs.current.forEach((videoRef) => {
      observer.observe(videoRef);
    });

    // We disconnect the observer when the component is unmounted
    return () => {
      observer.disconnect();
    };
  }, [products]);
  const handleVideoRef = (index) => (ref) => {
    videoRefs.current[index] = ref;
  };

  return (
    <div className="home">
      {products.map((product, index) => {
        return (
          <Product product={product} setVideoRef={handleVideoRef(index)} autoplay/>
        );
      })}
    </div>
  );
}

export default Home;
