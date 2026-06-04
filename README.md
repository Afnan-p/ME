# Afnan - Premium Full Stack Portfolio

A high-end, premium SaaS-style personal portfolio built with the MERN stack (MongoDB, Express, React, Node.js). 

## Features
- **Dynamic Content Management:** Full Admin CMS to manage projects, skills, services, settings, and stats.
- **Secure Dashboard:** JWT-authenticated Admin Dashboard.
- **Premium Design System:** Dark-mode SaaS aesthetic with custom styling, Framer Motion animations, and beautiful typography.
- **Live Contact Form:** Real-time inquiry submissions saved to database and visible in Admin dashboard.
- **Cloudinary Integration:** Image uploading for project media management.

## Tech Stack
- **Frontend:** React, Vite, Tailwind CSS, Framer Motion, React Router DOM, Axios.
- **Backend:** Node.js, Express, MongoDB Atlas, Mongoose, JWT, Cloudinary, Multer.

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Afnan-p/ME.git
cd ME
```

### 2. Setup the Server (Backend)
Navigate to the `server` directory and install dependencies:
```bash
cd server
npm install
```
Create a `.env` file in the `server` folder with the following variables:
```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
npm run dev
```

### 3. Setup the Client (Frontend)
Open a new terminal, navigate to the `client` directory, and install dependencies:
```bash
cd client
npm install
```
Create a `.env` file in the `client` folder:
```env
VITE_API_URL=http://localhost:5001
```
Start the frontend development server:
```bash
npm run dev
```

## Admin Access
- **URL:** `http://localhost:5173/admin/login`
- **Username:** `admin` (or what you set in `.env`)
- **Password:** `admin123` (or what you set in `.env`)

---
Built by [Afnan](https://github.com/Afnan-p)
