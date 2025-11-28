Retail Software 🛒

A lightweight retail billing and inventory management system built for small shops and businesses.
It includes a React.js frontend and a Spring Boot backend, providing fast billing, product/category management, and basic inventory tracking.

⚡ Overview

This system helps streamline core retail operations:

Manage product categories

Manage products with pricing, stock, and images

Generate bills/invoices

Record payment details

Track stock and basic sales activity

Dashboard for quick insights

The architecture is modular, making it easy to add future features like GST, analytics, barcode scanning, thermal printing, etc.

🏗️ Tech Stack
Frontend

React.js

React Router

Axios

React Hot Toast

Custom CSS

Backend

Java + Spring Boot

Spring Web

Spring Data JPA

Hibernate

MySQL

Lombok

Tools

Git / GitHub

IntelliJ / VS Code

Postman

MySQL Workbench

📁 Project Structure
```retail-software/
│
├── client/                         # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       ├── context/
│       ├── service/
│       ├── pages/
│       └── App.js
│
├── retail_software/                # Spring Boot backend
│   ├── src/main/java/
│   │   └── in/shivamchaudhari/retail_software/
│   │       ├── controller/
│   │       ├── entity/
│   │       ├── io/
│   │       ├── repository/
│   │       ├── service/
│   │       └── RetailSoftwareApplication.java
│   ├── src/main/resources/
│   │   └── application.properties
│
└── uploads/                        # Product image storage
```
🛠️ Setup Instructions
1️⃣ Clone the Repository
git clone https://github.com/ShivamChaudhari19/retail-software.git
cd retail-software

🖥️ Backend Setup (Spring Boot)
2️⃣ Configure Database

Edit application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/retail_software
spring.datasource.username=root
spring.datasource.password=yourpassword

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

3️⃣ Run Backend
mvn spring-boot:run


Backend runs on:

http://localhost:8080

🌐 Frontend Setup (React)
1️⃣ Move to frontend
cd client

2️⃣ Install dependencies
npm install

3️⃣ Run frontend
npm start


Frontend runs on:

http://localhost:3000

🚀 Core Features
✔️ Category Management

Add / edit / delete categories

Validation for duplicates

✔️ Product Management

Add product with name, category, price, stock, and image

Update & delete products

Auto-mapped to category

✔️ Billing System

Add items to bill

Quantity selection

Auto-total calculation

Discount support

Save bill details

✔️ Payment Handling

Multiple payment methods

Razorpay-ready structure

Save payment details

✔️ Dashboard

Total categories

Total products

Total sales

Activity summary

🗂️ API Endpoints Summary
Category

POST /api/category

GET /api/category

DELETE /api/category/{id}

Product

POST /api/product

GET /api/product

GET /api/product/{id}

DELETE /api/product/{id}

Payment

POST /api/payment

GET /api/payment

Orders

POST /api/order

GET /api/order

GET /api/order-items/{orderId}

🧪 Testing

Use the Postman collection inside:

/retail_software/postman/

🔮 Future Enhancements

GST & tax calculation

Barcode scanning

Thermal printer receipts

Sales analytics dashboard

Multi-user (Admin/Cashier)

Role-based authentication

Supplier management

Advanced inventory tracking

Offline-first support

🤝 Contributing

Fork project

Create feature branch

Commit changes

Open pull request

📜 License

Open-source — free to use, modify, and extend.

👨‍💻 Developers
Shivam Chaudhari

Retail & Inventory Software Developer
GitHub: ShivamChaudhari19

Rohan Bhaware

Retail & Inventory Software Developer
GitHub: RohanBhaware24

Pravin Bhagwat

Retail & Inventory Software Developer
GitHub: pravinbhagwat95

If you want, I can improve formatting, add screenshots, badges, flow diagrams, API docs,
