# Food Delivery Frontend

This is the **frontend** of the Food Delivery application.  
It is built with **React.js** and styled using **Tailwind CSS**.  
This project connects to the backend API to provide a full food delivery experience.

---

## Features

- User authentication (login & signup)
- Browse food items with category
- Search for food items
- Add items to cart
- Place orders and view order history
- Responsive UI for mobile and desktop
- Admin panel for managing food items (if connected to backend)

---

## Technologies Used

- **React.js** – Frontend framework
- **Tailwind CSS** – Styling and responsive design
- **React Router** – Client-side routing
- **React Icons** – Icons library
- **React Toastify** – Notifications and alerts
- **Axios / Fetch API** – HTTP requests to backend

---

## Project Structure

frontend/
├── public/ // Public assets (index.html, favicon, etc.)
├── src/
│ ├── assets/ // Images, icons, logos
│ ├── components/ // Reusable React components (buttons, cards, etc.)
│ ├── context/ // React Context API for global state
│ ├── pages/ // App pages/screens (Home, Login, Cart, etc.)
│ ├── App.jsx // Main App component
│ └── index.jsx // React entry point
├── package.json // Project dependencies and scripts
└── tailwind.config.js // Tailwind CSS configuration
