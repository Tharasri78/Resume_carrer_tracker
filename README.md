# Resume Job Tracker

A full-stack MERN application that helps users organize and track their job search.
Users can manage job applications, track interview stages, store resumes, and receive follow-up notifications from a centralized dashboard.

---

## Live Application

Frontend
https://resume-job-tracker-bay.vercel.app

Backend API
https://resume-job-tracker-1.onrender.com

---

## Features

* User authentication (JWT based login & registration)
* Secure protected routes
* Job application tracking
* Resume management
* Application status tracking (Applied, Interview, Rejected, Selected)
* Dashboard statistics
* Follow-up reminders
* Notification system
* Responsive user interface

---

## Tech Stack

Frontend

* React
* Vite
* Axios
* React Router

Backend

* Node.js
* Express.js
* JWT Authentication

Database

* MongoDB Atlas

Deployment

* Vercel (Frontend)
* Render (Backend)

---

## Project Architecture

Client → React Application (Vercel)
API → Node.js / Express Server (Render)
Database → MongoDB Atlas

---

## Folder Structure

Frontend

src
api – API request services
components – reusable UI components
context – authentication state management
pages – application views
styles – CSS modules

Backend

src
routes – API route definitions
controllers – request handlers
models – MongoDB schemas
middleware – authentication and error handling
utils – helper functions

---

## Environment Variables

Frontend

VITE_API_BASE_URL=https://resume-job-tracker-1.onrender.com/api

Backend

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secure_secret_key

---

## Installation

Clone the repository

git clone https://github.com/Tharasri78/Resume_carrer_tarcker

Install backend dependencies

cd Backend
npm install

Run backend server

npm run dev

Install frontend dependencies

cd Frontend
npm install

Run frontend

npm run dev

---

## API Endpoints

Authentication
POST /api/auth/register
POST /api/auth/login

Jobs
GET /api/jobs
POST /api/jobs
PUT /api/jobs/:id
DELETE /api/jobs/:id

Dashboard
GET /api/dashboard/stats

Notifications
GET /api/notifications

---

## Author

Thara Sri
BBA Computer Science
KG College of Arts and Science

---

## License

This project is intended for learning and portfolio demonstration.
