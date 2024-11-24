import React, { useState, useEffect } from "react";
import { Link, Navigate, useNavigate,  } from "react-router-dom";
import axios from "axios";
import "../comp_css/Product.css";
import api from "../Router/api";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceOrder, setPriceOrder] = useState("All");
  const [nameSearch, setNameSearch] = useState("");
  const [userid, setUserid] = useState(localStorage.getItem("userid"));

  const navigate = useNavigate();

  const filterProducts = (category, priceOrder, nameSearch, data) => {
    let filtered = [...data];

    if (category !== "All") {
      filtered = filtered.filter(
        (product) => product.category === category
      );
    }

    if (priceOrder === "LowToHigh") {
      filtered = filtered.sort((a, b) => a.price - b.price);
    } else if (priceOrder === "HighToLow") {
      filtered = filtered.sort((a, b) => b.price - a.price);
    }

    if (nameSearch.trim() !== "") {
      const searchQuery = nameSearch.toLowerCase();
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery)
      );
    }

    setFilteredProducts(filtered);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8080/ecom/products/all")
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  }, []);

  useEffect(() => {
    filterProducts(selectedCategory, priceOrder, nameSearch, products);
  }, [selectedCategory, priceOrder, nameSearch, products]);

  const addProductToCart = (productid) => {
    api
      .post(`/ecom/cart/add-product?userId=${userid}&productId=${productid}`)
      .then((response) => {
        localStorage.setItem("cartid", response.data.cartId);
        alert("Product added to Cart");
      })
      .catch((error) => {
        navigate("/login")
        console.error("Error registering:", error);
      });
  };

  return (
    <div className="product-page">
      <div className="filter-section">
        <h2>Filter</h2>
        <hr />
        <label>Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All</option>
          <option value="vegetables">Vegetable</option>
          <option value="fruits">Fruits</option>
          <option value="electronics">Electronic</option>
          <option value="gadgets">Gadgets</option>
        </select>
        <br />
        <label>Price:</label>
        <div>
          <select
            value={priceOrder}
            onChange={(e) => setPriceOrder(e.target.value)}
          >
            <option value="All">All</option>
            <option value="LowToHigh">Low to High</option>
            <option value="HighToLow">High to Low</option>
          </select>
        </div>

        <br />
        <div>
          <h4>By Name</h4>
          <input
            type="text"
            placeholder="Search by name"
            value={nameSearch}
            onChange={(e) => setNameSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <h1 className="no-products">Product Not Found...</h1>
        ) : (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.productId}>
              <div className="product-image1">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product-info">
                <h2>{product.name}</h2>
                <p>
                  <strong>Category:</strong> {product.category}
                </p>
                <p>
                  <strong>Description:</strong>{" "}
                  {product.description}
                </p>
                <h2 className="product-price">Price: ₹ {product.price}</h2>
                <p>
                  <strong>Rating:</strong>{" "}
                  {product.reviews?.[0]?.rating || "Not Available"}
                </p>
                <div className="product-btn">
                  <button onClick={() => addProductToCart(product.productId)}>
                    Add to Cart
                  </button>
                    <Link
                      to={`/product/${product.productId}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                      
                      <button>View</button>
                    </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Product;
