import React, { useEffect, useState } from "react";
import Slider from "../components/Slider";
import { Link } from "react-router-dom";
import axios from "axios";
import "../comp_css/Home.css";

const Home = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const slideImages = [
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1691935239_Freedom_Finds.jpg?im=Resize=(1680,320)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1691950461_Handloom_Sarees_in_Colors_of_India.jpg?im=Resize=(1680,320)",
    "https://www.jiomart.com/images/cms/aw_rbslider/slides/1691612739_Aaj_Ki_Deals_Desktop.jpg?im=Resize=(1680,320)",
  ];
  const styleFixedImg = {
    width: "100%",
    height: "25vh",
    marginTop: "10px",
    marginBottom: "10px",
  };

  useEffect(() => {
    document.title = "Ecommerce | Home Page";
    return () => {
      document.title = "Ecommerce App";
    };
  }, []);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/ecom/products/all")
      .then((response) => {
        const products = response.data;
        const groupedProducts = products.reduce((acc, product) => {
          if (!acc[product.category]) {
            acc[product.category] = [];
          }
          acc[product.category].push(product);
          return acc;
        }, {});

        setProductsByCategory(groupedProducts);
      })
      .catch((error) => {
        console.error("Error fetching data from the API:", error);
      });
  }, []);

  return (
    <>
      <div>
        <Slider images={slideImages} interval={4000} />
      </div>

      <div className="product-section">
        {Object.keys(productsByCategory)
          .slice(0, 5)
          .map((category) => (
            <div key={category} className="category-section">
              <h2 className="category-title">{category}</h2>
              <div className="category-products">
                {productsByCategory[category].slice(0).map((product) => (
                  <Link className="product-card" to={`/product/${product.productId}`} key={product.productId}>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="product-image"
                      />
                      <h3 className="product-name">{product.name}</h3>
                  </Link>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
