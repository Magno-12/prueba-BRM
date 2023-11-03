# Inventory Management System API

This project is an API developed using Node.js and Express for an inventory management system. The API allows for the management of products in the inventory, making purchases, and user management with administrator and client roles. Additionally, there's a user 
registration and authentication system. Below are the steps to run the project and how to use each of the available endpoints.

## Requirements to Run the Project

### Clone the Repository

## Clone the repository to your machine:

```python
git clone https://github.com/Magno-12/prueba-BRM
cd inventory-management-api
```

## Configure Environment Variables
- Copy the `.env.example` file to `.env` and configure the necessary environment variables such as the database connection string, port, and secret keys.

## Install Dependencies

- Ensure you have Node.js installed on your system. You can download it from https://nodejs.org/.
- Install the project's dependencies using npm:
```python
npm install
```

## Run the Application
- Start the application using the following command:
```python
npm start
```
**or**
```python
nodemon app.js
```
The application will run on the port configured in your .env file or on the default port 3000.

Available Endpoints
Below are the available endpoints and how to use them:

## User Authentication
### User Registration
- Method: POST
- Route: `/auth/register`
- Description: Allows users to register in the application.
- Request Parameters: Provide a JSON in the request body with the following fields: `username`, `email`, and `password`.
- Successful Response (Status Code 201):

```JSON
{
  "username": "Magnodev",
  "email": "magno@example.com",
  "password": "secretpassword",
  "role": "client"
}
```

### User Login
- Method: POST
- Route: /auth/login
- Description: Allows users to log in to the application.
- Request Parameters: Provide a JSON in the request body with the following fields: `email` and `password`.
- Successful Response (Status Code 200):

```JSON
{
  "username": "Magnodev",
  "email": "magno@example.com",
  "password": "secretpassword",
}
```

## Product Management
### List Products
- Method: GET
- Route: /products
- Description: Retrieves the list of available products in the inventory.
- Successful Response (Status Code 200):

```JSON
[
  {
    "id": 1,
    "name": "Product 1",
    "price": 10.99
  },
  {
    "id": 2,
    "name": "Product 2",
    "price": 19.99
  }
]
```
### Create a Product
- Method: POST
- Route: /products
- Description: Allows administrators to create a new product.
- Request Parameters: Provide a JSON in the request body with the following fields: name and price.
- Successful Response (Status Code 201):

```JSON
{
  "lotNumber": "P12345",
  "name": "Product 1",
  "price": 10.99,
  "quantityAvailable": 100
}
```

### Update a Product
- Method: PUT
- Route: /products/:id
- Description: Allows administrators to update an existing product.
- Request Parameters: Provide the product's ID in the URL and a JSON in the request body with the fields you want to update.
- Successful Response (Status Code 200):

 ```JSON
{
  "lotNumber": "P12345",
  "name": "Product 1 new",
  "price": 10.10,
  "quantityAvailable": 100
}
```
### Delete a Product
- Method: DELETE
- Route: /products/:id
- Description: Allows administrators to delete an existing product.
- Request Parameters: Provide the product's ID in the URL.
- Successful Response (Status Code 204, No Content)

### Make Purchases
- Create a Purchase
- Method: POST
- Route: /purchase
- Description: Allows clients to make a purchase.
- Request Parameters: Provide a JSON in the request body with the purchase details, including the list of products and their quantities.
- Successful Response (Status Code 201):

```json
{
  "products": [
    {
      "productId": uuid,
      "quantity": 5,
      "price": 10.99
    },
    {
      "productId": uuid,
      "quantity": 3,
      "price": 19.99
    }
  ]
```

## User Management
### Get User Information

- Method: GET
- Route: /users/:id
- Description: Retrieves information about a specific user.
- Request Parameters: Provide the user's ID in the URL.
- Successful Response (Status Code 200):

```json
{
  "id":uuid,
  "username": "Magnodev",
  "email": "magno@example.com",
  "role": "client"
}
```
### Update User Information
- Method: PUT
- Route: /users/:id
- Description: Allows users to update their own information.
- Request Parameters: Provide the user's ID in the URL and a JSON in the request body with the fields you want to update.
- Successful Response (Status Code 200):

```json
{
  "username": "Magnodev",
  "email": "magno@example.com",
  "role": "client"
}
```

### Delete a User

- Method: DELETE
- Route: /users/:id
- Description: Allows users to delete their own account.
- Request Parameters: Provide the user's ID in the URL.
- Successful Response (Status Code 204, No Content)

### Recommendations:
- The use of the Postman tool is recommended for endpoint testing. You can download Postman from https://www.postman.com/downloads/.
- Make sure to correctly set the environment variables in the .env file, especially the MySQL online database connection string. You will not need to run the "node config/sync-db.js" command if you use an online database.
- for apidoc you just need to open the index.html
