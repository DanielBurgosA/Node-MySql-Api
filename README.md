### API Documentation

Welcome to the API documentation for our product management system. Below are the available endpoints:

---

### Getting Started

To start the project, follow these steps:

1. Run `npm install` to install dependencies.
2. Execute `npm start` to lift the server on port 3001 using Nodemon.



#### Import Products

- **Endpoint:** `POST /products/import`
- **Description:** Import products from a JSONL file. For the import process, ensure the 'large_products.jsonl' file is present in the 'file' folder within the project.

#### Create Product

- **Endpoint:** `POST /products/product`
- **Description:** Create a new product.

#### Create Variant

- **Endpoint:** `POST /products/variant`
- **Description:** Create a new variant for a product.

#### Get All Products with Variants

- **Endpoint:** `GET /products/all`
- **Description:** Retrieve all products with their variants.

#### Get All Products

- **Endpoint:** `GET /products/allProducts`
- **Description:** Retrieve all available products.

#### Get Product by ID

- **Endpoint:** `GET /products/products/:id`
- **Description:** Retrieve a specific product by its ID with variants.

#### Update Product

- **Endpoint:** `PUT /products/product`
- **Description:** Update an existing product.

#### Update Variant

- **Endpoint:** `PUT /products/variant`
- **Description:** Update an existing variant, it uses de productId as indexes in the models to optimize the search.

#### Delete Product

- **Endpoint:** `DELETE /products/product`
- **Description:** Delete a product and all of its variants.

#### Delete Variant

- **Endpoint:** `DELETE /products/variant`
- **Description:** Delete a variant.

---

### JWT Token

#### Generate Token

- **Endpoint:** `POST /api/token`
- **Description:** Generates a JWT token for testing purposes. Configure the environment variables for the user ID and username before using this endpoint.

#### Protected Route

- **Endpoint:** `GET /api/protected_route`
- **Description:** A protected route that requires a valid JWT token. Include the generated token in the 'authorization' header without the 'Bearer' prefix to access this route.

---
Ensure that the 'large_products.jsonl' file is available in the project folder before utilizing the import functionality. The routes support various operations for managing products and their variants.
