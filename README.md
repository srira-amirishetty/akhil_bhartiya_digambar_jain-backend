**Full User Dashboard Backend API Documentation**

**Project Type:** User Dashboard System for Shayata Trust (with Health, Education, Finance, Membership, Auth, and Payment Modules)
**Tech Stack:** Node.js, Express, MongoDB, Multer (for uploads), JWT (for auth)

---

## 🔐 Authentication Module

### 1. **Register User**

**POST /api/auth/register**

* **Body:** `{ name, email, password, mobile }`
* **Response:** Success or error message

### 2. **Login User**

**POST /api/auth/login**

* **Body:** `{ email, password }`
* **Response:** JWT token & user info

---

## 👤 Member Management

### 1. **Add Member**

**POST /api/members**

* **Body:** `{ name, mobile, dob, address, relation, aadharNumber, profile }`
* **Image Upload:** `multipart/form-data`

### 2. **Get All Members**

**GET /api/members**

* Returns list of all members

### 3. **Update Member**

**PUT /api/members/\:id**

### 4. **Delete Member**

**DELETE /api/members/\:id**

---

## 🏥 Shayata Health Application

### 1. **Submit Health Application**

**POST /api/shayata/health**

* **Body:** `{ userId, illnessType, doctorName, hospitalName, estCost, documents }`
* **Upload:** Image/PDF via `documents` field

### 2. **Get Health Applications**

**GET /api/shayata/health/\:userId**

---

## 🎓 Shayata Education Application

### 1. **Submit Education Application**

**POST /api/shayata/education**

* **Body:** `{ userId, schoolName, courseName, fees, documents }`

### 2. **Get Applications**

**GET /api/shayata/education/\:userId**

---

## 💸 Finance Aid (Loan or Donation Request)

### 1. **Submit Finance Request**

**POST /api/shayata/finance**

* **Body:** `{ userId, reason, amount, incomeProof, documents }`

### 2. **Get Finance Applications**

**GET /api/shayata/finance/\:userId**

---

## 💳 Payment and Receipt

### 1. **Make a Payment to Trust**

**POST /api/payments**

* **Body:** `{ userId, amount, method (UPI/Bank), transactionId, date }`

### 2. **Generate Receipt**

**GET /api/payments/receipt/\:paymentId**

* Generates a digital receipt with trust info and user payment

---

## 🧾 Common Models Example

### 📄 `User.js`

```js
{
  name, email, password (hashed), mobile, dob, address, role
}
```

### 📄 `Member.js`

```js
{
  name, dob, relation, address, aadharNumber, profile
}
```

### 📄 `Health.js`, `Education.js`, `Finance.js`

```js
{
  userId, type-specific fields, documents (array of file paths), status
}
```

### 📄 `Payment.js`

```js
{
  userId, amount, method, transactionId, date, receiptUrl
}
```

---

## 🔒 Security Practices

* JWT Auth for protected routes
* Role-based access (`admin`, `user`)
* Input validation with `express-validator`
* File upload security with `multer` and file type checks

---

## ✅ Sharing Options

* Export this to **PDF**, **Notion**, **Markdown**, or GitHub README
* Share Postman collection for testing endpoints

---

Let me know if you'd like the Postman collection or backend code generation.
