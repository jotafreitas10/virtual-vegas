# Projeto de Desenvolvimento Baseado na Web - Virtual Vegas

This is a starter app for a MERN stack application with authentication, designed to simulate a virtual casino environment without the use of real money. This project is ideal for those looking to create a secure and entertaining online casino gaming platform.

<img src="./frontend/public/screen.png" />

It includes the following:

- Backend API with Express & MongoDB
- Routes for authentication, logout, register, profile, update profile
- JWT authentication stored in HTTP-only cookie
- Protected routes and endpoints
- Custom middleware to check JSON web token and store in cookie
- Custom error middleware
- React Toastify notifications

## Usage

- Create a MongoDB database and obtain your `MongoDB URI` - [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register)

### Install Dependencies (frontend & backend)

```
npm install
cd frontend
npm install
```

### Run

```

# Run frontend (:3000) & backend (:5000)
npm run dev

# Run backend only
npm run server
```

## Build & Deploy

```
# Create frontend prod build
cd frontend
npm run build
```
