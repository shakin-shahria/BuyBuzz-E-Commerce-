# BuyBuzz

**BuyBuzz** is a full-featured e-commerce web application built with **React** (frontend) and **Laravel** (backend), providing a seamless and secure shopping experience. It includes a standard **admin panel built with Laravel** where all administrative tasks can be managed efficiently.

---

## Demo Video


https://github.com/user-attachments/assets/b3d023fd-8bc4-4446-acb7-b08ed326ec78



---

## Features

### User Features
- User authentication (register, login, password reset)
- Browse products and categories
- Product search and detailed view
- Shopping cart management
- Checkout & secure payment with SSL
- Order history and tracking
- Fully responsive design

### Admin Panel Features (Built with Laravel)
- Product management (add, update, delete)
- Category management
- Order management and tracking
- User management and role-based access
- Standard e-commerce analytics and dashboard
- Complete backend control over the platform

### Security & Performance
- SSL encryption for all transactions
- Role-based access control
- Optimized API and frontend performance

---

## Tech Stack
- **Frontend:** React, React Router, Axios, Tailwind CSS
- **Backend & Admin Panel:** Laravel 11, PHP 8+, MySQL/PostgreSQL
- **Authentication & Security:** Laravel Sanctum / JWT, SSL
- **Payment Gateway:** Stripe / PayPal
- **Version Control:** Git & GitHub

---

## Folder Structure

buybuzz/
├─ frontend/    # React app
├─ backend/     # Laravel backend & admin panel
├─ README.md



---

## Installation

### Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
Frontend
```
Copy code
cd frontend
npm install
npm start
Contributing
Open issues or submit pull requests. Contributions to improve features, fix bugs, and enhance the experience are welcome.

License
This project is licensed under the MIT License.



