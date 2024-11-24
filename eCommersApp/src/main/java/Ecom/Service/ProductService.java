package Ecom.Service;

import java.util.List;

import Ecom.Exception.ProductException;
import Ecom.Model.Product;

public interface ProductService {
	
	public Product addProduct(Product products)throws ProductException;
	
	public Product updateProduct(Product product, Integer productId)throws ProductException;
	
	public List<Product> getProductByName(String name)throws ProductException;
	
	public List<Product> getAllProduct(String keyword, String sortDirection, String sortBy)throws ProductException;

	List<Product> getAllProducts() throws ProductException;

	public List<Product> getProductByCategory(String catagory) throws ProductException;
	
	public void removeProduct(Integer productId)throws ProductException;

	public Product getSingleProduct(Integer productId);


}
 