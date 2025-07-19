# 📚 Library Management API

A Node.js, Express, Mongoose, and TypeScript-powered **RESTful API** for managing books and borrow records with **Zod validation** and proper error handling.

---

## 🚀 **Features**

-  **Books Management**

   -  Add, retrieve, filter, sort, update, and delete books
   -  Retrieve book by ID
   -  Unique ISBN enforcement
   -  Copies & availability tracking

-  **Borrow Management**

   -  Borrow book copies
   -  Automatic stock decrement
   -  Prevent over-borrowing
   -  Due date handling
   -  Borrowed books summary with aggregation

-  **Validation**

   -  **Zod** for request validation
   -  **Mongoose** for DB-level validation
   -  Returns consistent `ValidationError`-style responses

-  **Error Handling**

   -  Custom error format matching Mongoose validation error structure

---

## 🛠️ **Tech Stack**

| Tech           | Purpose            |
| -------------- | ------------------ |
| **Node.js**    | Backend runtime    |
| **Express.js** | Web framework      |
| **TypeScript** | Type safety        |
| **Mongoose**   | MongoDB ODM        |
| **Zod**        | Request validation |
| **MongoDB**    | Database           |

---

## 📂 **Project Structure**

```
src/
├── app/
│   ├── controllers/      # Business logic
│   ├── models/           # Mongoose models
│   ├── interfaces/       # TypeScript interfaces
│   ├── validations/      # Zod schemas
│   └── routes/           # Express routers
├── server.ts             # Entry point (DB connection & server start)
├── app.ts                # Express app configuration
```

---

## ⚙️ **Setup Instructions**

### 1️⃣ Clone the repo:

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2️⃣ Install dependencies:

```bash
npm install
```

### 3️⃣ Create `.env` file:

```env
MONGODB_USER=yourMongoUser
MONGODB_PASSWORD=yourMongoPassword
PORT=3000
```

---

## 🥪 **Run the Project**

### Development:

```bash
npm run dev
```

### Production:

```bash
npm run build
```

---

## 📖 **API Endpoints**

### **Books**

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| POST   | `/books`         | Add a new book             |
| GET    | `/books`         | Get books with filter/sort |
| GET    | `/books/:bookID` | Get a book by ID           |
| PUT    | `/books/:bookID` | Update a book by ID        |
| DELETE | `/books/:bookID` | Delete a book by ID        |

#### **Query Params for **``

| Param    | Description                             |
| -------- | --------------------------------------- |
| `filter` | Filter by genre                         |
| `sortBy` | Field to sort by (default: `createdAt`) |
| `sort`   | `asc` or `desc`                         |
| `limit`  | Limit number of results (default: 10)   |

---

### **Borrow**

| Method | Endpoint  | Description        |
| ------ | --------- | ------------------ |
| POST   | `/borrow` | Borrow a book      |
| GET    | `/borrow` | Get borrow summary |

---

## 📃 **Validation Error Format**

All validation errors (Zod & Mongoose) return:

```json
{
   "message": "Validation failed",
   "success": false,
   "error": {
      "name": "ValidationError",
      "errors": {
         "fieldName": {
            "message": "Error message",
            "name": "ValidatorError",
            "properties": {
               "message": "Error message",
               "type": "validation-type"
            },
            "kind": "validation-type",
            "path": "fieldName",
            "value": "invalid-value"
         }
      }
   }
}
```

---

## ✅ **Example Requests**

### Create Book

```http
POST /books
Content-Type: application/json

{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "FICTION",
  "isbn": "9780061122415",
  "copies": 5
}
```

---

### Borrow Book

```http
POST /borrow
Content-Type: application/json

{
  "book": "64e1d3c4f0c123456789abcd",
  "quantity": 1,
  "dueDate": "2025-08-10"
}
```

---

### Borrow Summary

```http
GET /borrow
```

Returns total borrowed quantity per book with title & ISBN.

---

## 🧹 **Linting & Code Quality**

Run:

```bash
npm run lint
```

---

## 🛡️ **Future Improvements**

-  JWT-based authentication
-  Pagination for large datasets
-  Role-based access (admin/user)
-  Book return and fine calculation

---

## 🤝 **Contributing**

Feel free to fork this repo, open issues, or submit pull requests!

---

## 📝 **License**

MIT License
