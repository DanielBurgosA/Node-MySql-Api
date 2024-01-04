### API Documentation

Welcome to the API documentation for our product management system. Below are the available endpoints:

---

#### Import Products

- **Endpoint:** `POST /api/products/import`
- **Description:** Import products from a JSONL file. For the import process, ensure the 'large_products.jsonl' file is present in the project folder.

#### Create Product

- **Endpoint:** `POST /api/products/product`
- **Description:** Create a new product.

#### Create Variant

- **Endpoint:** `POST /api/products/variant`
- **Description:** Create a new variant for a product.

#### Get All Products with Variants

- **Endpoint:** `GET /api/products/all`
- **Description:** Retrieve all products with their variants.

#### Get All Products

- **Endpoint:** `GET /api/products/allProducts`
- **Description:** Retrieve all available products.

#### Get Product by ID

- **Endpoint:** `GET /api/products/products/:id`
- **Description:** Retrieve a specific product by its ID.

#### Update Product

- **Endpoint:** `PUT /api/products/product`
- **Description:** Update an existing product.

#### Update Variant

- **Endpoint:** `PUT /api/products/variant`
- **Description:** Update an existing variant.

#### Delete Product

- **Endpoint:** `DELETE /api/products/product`
- **Description:** Delete a product.

#### Delete Variant

- **Endpoint:** `DELETE /api/products/variant`
- **Description:** Delete a variant.

---
