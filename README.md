# Retail Software 🛒  
A lightweight retail billing and inventory management system designed for small shops and businesses. The project includes a Java-based backend and a React-based frontend, enabling fast billing operations, product management, and category-based item organization.

---

## ⚡ Overview  
This software helps manage day-to-day retail operations such as:  
- Adding and managing product categories  
- Adding and managing products  
- Creating invoices/bills  
- Handling payment details  
- Tracking basic inventory  
- Providing a clean dashboard for quick operations  

The project is built with a modular architecture so new features (GST, reports, barcode scanning, etc.) can be added easily.

---

## 🏗️ Tech Stack  

### **Frontend**
- React.js  
- Axios  
- React Router  
- CSS (custom)  
- React Hot Toast  

### **Backend**
- Java  
- Spring Boot  
- Spring Web  
- Spring Data JPA  
- MySQL  
- Hibernate  
- Lombok  

### **Other Tools**
- Git / GitHub  
- IntelliJ / VS Code  
- Postman (for API testing)  
- MySQL Workbench  

## 📁 Project Structure

```bash
retail-software/
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

## 🛠️ Setup Instructions

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/ShivamChaudhari19/retail-software.git
cd retail-software
🖥️ Backend Setup (Spring Boot)
2️⃣ Configure Database

Update application.properties:

spring.datasource.url=jdbc:mysql://localhost:3306/retail_software
spring.datasource.username=root
spring.datasource.password=yourpassword
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

3️⃣ Run Backend

Using Maven or IDE:

mvn spring-boot:run


Backend runs on:

http://localhost:8080

🌐 Frontend Setup (React)
1️⃣ Move to client folder
cd client

2️⃣ Install dependencies
npm install

3️⃣ Run frontend
npm start


Frontend runs on:

http://localhost:3000

🚀 Core Features
✅ Category Management

Add, update, delete categories

Linked directly with products

Validations for duplicate entries

✅ Product Management

Add products with:

Name

Category

Price

Stock

Image

Edit and delete products

Automatic mapping to category

✅ Billing System

Add items to a bill

Quantity selector

Automatic total calculation

Discounts (extendable)

Save bill details

✅ Payment Handling

Supports multiple payment methods

Razorpay (extendable)

Payment details stored safely

✅ Dashboard

Overview of:

Total categories

Total products

Total sales

Daily activity

🗂️ API Endpoints (Summary)
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

Use Postman collection provided inside:

/retail_software/postman/

🔮 Future Enhancements

GST & tax calculation

Barcode scanning

Thermal printer receipts

Sales analytics dashboard

Multi-user (Admin / Cashier)

Role-based authentication

Supplier / purchase management

Advanced inventory tracking

Offline-first support

🤝 Contributing

Fork the project

Create a feature branch

Commit changes

Open a pull request

📜 License

This project is open-source.
You may use, modify, or extend it freely.

👨‍💻 Developer

Shivam Chaudhari
Retail & Inventory Software Developer
GitHub: ShivamChaudhari19

Rohan Bhaware
Retail & Inventory Software Developer
GitHub: RohanBhaware24

Pravin Bhagwat
Retail & Inventory Software Developer
GitHub: pravinbhagwat95
