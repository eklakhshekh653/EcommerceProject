package Ecom.ServiceImpl;

import java.util.List;
import java.util.Optional;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import Ecom.Exception.ProductException;
import Ecom.Model.Product;
import Ecom.ModelDTO.ProductDTO;
import Ecom.Repository.ProductRepository;
import Ecom.Service.ProductService;


@Service
@RequiredArgsConstructor
public class ProductServiceImpl implements ProductService {

    private final ProductRepository productRepository;

    @Override
    public Product addProduct(Product product) throws ProductException {
        if (product == null)
            throw new ProductException("Product Can not be Null");
        return productRepository.save(product);
    }

    @Override
    public Product updateProduct(Product updatedProduct, Integer productId){

        Product oldproduct = productRepository.findById(productId).orElse(null);

        if (oldproduct != null){
            oldproduct.setName(updatedProduct.getName());
            oldproduct.setImageUrl(updatedProduct.getImageUrl());
            oldproduct.setDescription(updatedProduct.getDescription());
            oldproduct.setPrice(updatedProduct.getPrice());
            oldproduct.setCategory(updatedProduct.getCategory());
            return productRepository.save(oldproduct);
        }
        return null;
        }

    @Override
    public List<Product> getProductByName(String name) throws ProductException {

        List<Product> existProductByName = productRepository.findByName(name);
        if (existProductByName.isEmpty()) {
            throw new ProductException("Product Not found with name " + name);
        }
        return existProductByName;
    }

    @Override
    public List<Product> getAllProduct(String keyword, String sortDirection, String sortBy) throws ProductException {

        Sort sort = Sort.by(sortDirection.equals("asc") ? Sort.Direction.ASC : Sort.Direction.DESC,sortBy);

        List<Product> products;

        if (keyword != null) {

            products = productRepository.findAllByNameContainingIgnoreCase(keyword, sort);
        } else {
            products = productRepository.findAll(sort);
        }
        if (products.isEmpty()) {
            throw new ProductException("Product List Empty");
        }

        return products;

    }

    @Override
    public List<Product> getAllProducts() throws ProductException {
        List<Product> allproduct = productRepository.findAll();
        return allproduct;
    }

    @Override
    public List<Product> getProductByCategory(String category) throws ProductException {
        // Retrieve products by category from the database
        List<Product> allproductCategoryName = productRepository.getProductCategoryName(category);
        if (allproductCategoryName.isEmpty())
            throw new ProductException("Product with category Name " + category + " not found.");

        return allproductCategoryName;
    }


    @Override
    public void removeProduct(Integer productId) throws ProductException {

        Product existingProduct = productRepository.findById(productId)
                .orElseThrow(() -> new ProductException("Product with ID " + productId + " not found."));

        productRepository.delete(existingProduct);
    }

    @Override
    public Product getSingleProduct(Integer productId) {

        Product single = productRepository.findById(productId).orElseThrow(() -> new ProductException("Product not found"));
        return single;
    }


}
