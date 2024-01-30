import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAsyncProducts, getAllProducts } from "../store/productSlice";
import Product from "../components/Product";

function Home() {
  const products = useSelector(getAllProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncProducts());
  }, []);

  return (
    <div className="home">
      {products.map((product) => {
        return <Product product={product} />;
      })}
    </div>
  );
}

export default Home;
