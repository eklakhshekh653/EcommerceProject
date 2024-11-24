import React from "react";
import { Link } from "react-router-dom";
import "../comp_css/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-grid">
        <div className="footer-section">
          <h4>POLICY INFO</h4>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Sale</li>
            <li>Terms of Use</li>
            <li>Report Abuse & Takedown Policy</li>
            <li>FAQ</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>COMPANY</h4>
          <ul>
            <li>shekh@eCommerceApp</li>
            <li>Careers</li>
            <li>Blog</li>
            <li>Sitemap</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>E-Commerse</h4>
          <ul>
            <li>Product App</li>
            <li>Sell on our Website</li>
            <li>Media Enquiries</li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>POPULAR LINKS</h4>
          <ul>
            <li>Top Product</li>
            <li>Groceries</li>
            <li>Vegetable</li>
            <li>Fruits</li>
          </ul>
        </div>
        <div className="footer-section">
        <input type="text" placeholder="Enter your email" />
          <div className="subscribe-box">
            <button>SUBSCRIBE</button>
          </div>
          <p className="admin-link" >
            <Link to="/admin-Login"  style={{color:"white"}}>Admin Access</Link>
          </p>
        </div>
      </div>

    </div>
  );
};

export default Footer;
