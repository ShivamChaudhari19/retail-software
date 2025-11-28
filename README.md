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

It is built with a modular architecture so new features (GST, reports, barcode scanning, etc.) can be added easily.

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
- Postman  
- MySQL Workbench  

---

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
