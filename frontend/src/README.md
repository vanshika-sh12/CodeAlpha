ShopEase – Online Shopping Website

Project Overview

ShopEase is a responsive online shopping website built to provide users with a simple and attractive shopping experience. Users can browse products, search by name, filter by category, and manage their shopping cart.

Features

- Responsive and user-friendly interface
- Product listing with images and prices
- Search products by name
- Filter products by category
- Add products to the shopping cart
- Increase or decrease product quantities
- Remove products from the cart
- Automatic cart total calculation
- Backend API for retrieving product data

Technologies Used

- Frontend: React.js, JavaScript, HTML, CSS
- Development Tool: Vite
- Backend: Node.js, Express.js
- API: REST API
- Product Data: JSON file

Project Structure

CodeAlpha/
├── backend/
│   ├── products.json
│   ├── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
└── README.md

How to Run the Project

1. Start the Backend

Open a terminal in the backend directory and run:

npm install
node server.js

The backend runs at "http://localhost:5000".

2. Start the Frontend

Open a second terminal in the frontend directory and run:

npm install
npm run dev

Open the local URL displayed in the terminal, usually "http://localhost:5173".

API Endpoint

- "GET /api/products" – Returns the available product list in JSON format.

Testing

The following features have been tested:

- Product loading through the backend API
- Search and category filters
- Cart operations and price calculations
- Navigation and product images
- Responsive layout on mobile screens
- Browser refresh and empty search results
- Browser Console and backend operation

Future Improvements

- MongoDB database integration
- User registration and login
- Order placement and order history
- Secure payment integration
- Persistent shopping cart

Project Status

The core shopping interface and product API are implemented and tested. Product data currently comes from a JSON file; database integration and payment functionality are future improvements.