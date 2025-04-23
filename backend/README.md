# BYTE Backend Setup Guide

This guide will help you set up the backend for the BYTE project.

---

## 📋 Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v16 or higher)  
  [Download Node.js](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Firebase Project** with Admin SDK credentials
- **Google Cloud API** enabled for Gmail access
- **Environment Variables** (shared within the team)

---

## 🚀 Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/YOUR-ORG/BYTE.git
cd BYTE/backend
```

---

### 2️⃣ Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

---

### 3️⃣ Configure Environment Variables

Create a `.env` file in the `backend` directory and add the following variables:

```env
PORT=3000
FIREBASE_PROJECT_ID=your-firebase-project-id
FIREBASE_PRIVATE_KEY="your-firebase-private-key"
FIREBASE_CLIENT_EMAIL=your-firebase-client-email
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> 🔑 **Note:** Ensure the private key is properly escaped or wrapped in quotes if it contains special characters.

---

### 4️⃣ Start the Backend Server

Run the following command to start the backend server:

```bash
node server.js
```

The server will run on `http://localhost:3000` by default.

---

## 🔧 Additional Configuration

### Enable Gmail API

1. Go to the [Google Cloud Console](https://console.cloud.google.com/).
2. Enable the **Gmail API** for your project.
3. Download the OAuth 2.0 credentials JSON file and use the `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` in your `.env` file.

---

### Firebase Admin SDK

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Navigate to **Project Settings > Service Accounts**.
3. Generate a new private key and use the credentials in your `.env` file.

---

## 🛠️ Testing the Backend

You can test the backend using tools like **Postman** or **cURL**. Example endpoints:

- **Fetch Gmail Flight Data**  
  `GET http://localhost:3000/api/gmail/flights`

- **Fetch Flight by Flight Number**  
  `GET http://localhost:3000/api/:flightNumber`

---

## 📖 Learn More

- [Firebase Admin SDK Documentation](https://firebase.google.com/docs/admin/setup)
- [Gmail API Documentation](https://developers.google.com/gmail/api)
- [Express.js Documentation](https://expressjs.com/)

---
