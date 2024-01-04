### API Documentation

Welcome to the API documentation for our product management system. Below are the available endpoints:

---

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
- **Description:** Retrieve a specific product by its ID.

#### Update Product

- **Endpoint:** `PUT /products/product`
- **Description:** Update an existing product.

#### Update Variant

- **Endpoint:** `PUT /products/variant`
- **Description:** Update an existing variant.

#### Delete Product

- **Endpoint:** `DELETE /products/product`
- **Description:** Delete a product and all of its variants.

#### Delete Variant

- **Endpoint:** `DELETE /products/variant`
- **Description:** Delete a variant.

---

Ensure that the 'large_products.jsonl' file is available in the project folder before utilizing the import functionality. The routes support various operations for managing products and their variants.
