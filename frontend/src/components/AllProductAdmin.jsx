import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../comp_css/AllProductAdmin.css";
import axios from "axios";
import api from "../Router/api";
import UpdateProductForm from "./UpdateProductForm";

const AllProductAdmin = () => {
  const { productId } = useParams();
  const [products, setProducts] = useState([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    axios
      .get("http://127.0.0.1:8080/ecom/products/all?sort=desc")
      .then((response) => {
        const sortedProducts = response.data.sort(
          (a, b) => b.productId - a.productId
        );
        setProducts(sortedProducts);
      })
      .catch((error) => {
        console.error("Error fetching data from the API: ", error);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [productId]);

  const updateProduct = (productIdToUpdate) => {
    const productToUpdate = products.find(
      (product) => product.productId === productIdToUpdate
    );
    setSelectedProduct(productToUpdate);
    setShowUpdateModal(true);
  };

  const closeUpdateModal = () => {
    setSelectedProduct(null);
    setShowUpdateModal(false);
  };

  const handleUpdate = (updatedProduct) => {
    api
      .put(`/ecom/products/update/${updatedProduct.productId}`, updatedProduct)
      .then(() => {
        fetchProducts();
        closeUpdateModal();
      })
      .catch((error) => {
        console.error("Error updating product: ", error.response?.data?.message);
      });
  };

  const deleteProduct = (productIdToDelete) => {
    api
      .delete(`/ecom/products/${productIdToDelete}`)
      .then(() => {
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product.productId !== productIdToDelete)
        );
      })
      .catch((error) => {
        console.error("Error deleting product: ", error.response?.data?.message);
      });
  };

  return (
    <>
      <h1 style={{ color: "green", textAlign: "center", margin: "5px" }}>
        ALL Live Products
      </h1>

      {showUpdateModal && (
        <div className="update-modal">
          <UpdateProductForm
            product={selectedProduct}
            onUpdate={handleUpdate}
            onClose={closeUpdateModal}
          />
        </div>
      )}

      {products.length === 0 ? (
        <p style={{ textAlign: "center", color: "red" }}>No products available.</p>
      ) : (
        <div className="product-container1">
          {products.map((product) => (
            <div className="product-card1" key={product.productId}>
              <div className="product-image11">
                <img src={product.imageUrl} alt={product.name} />
              </div>
              <div className="product-info1">
                <h2>{product.name}</h2>
                <p>Product ID: {product.productId}</p>
                <p>Category: {product.category}</p>
                <p>
                  Description:{" "}
                  {product.description.length > 50
                    ? product.description.substring(0, 50) + "..."
                    : product.description}
                </p>
                <h2 className="product-price1">Price: ₹ {product.price}</h2>
                <div className="button-container1">
                  <button
                    className="update"
                    onClick={() => updateProduct(product.productId)}
                  >
                    Update
                  </button>
                  <button
                    className="delete"
                    onClick={() => deleteProduct(product.productId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AllProductAdmin;
