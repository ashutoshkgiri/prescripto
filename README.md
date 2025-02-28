# Prescripto

## Overview
Prescripto is a healthcare management platform that allows patients to book appointments, consult doctors, and manage prescriptions seamlessly. It also provides an admin panel for managing doctor profiles, availability, and operational data.

## Features
- **User Dashboard**: Patients can book and manage their appointments.
- **Doctor Management**: Admins can add, update, and manage doctor details and schedules.
- **Role-Based Access Control**: Different permissions for users, doctors, and admins.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Availability Checking**: Only available slots are shown when booking an appointment.
- **Notifications**: Users receive alerts when they book or cancel appointments.
- **Payment Integration**: Secure payment gateway for booking consultations (WIP).
- **Upcoming Feature**: Email reminders for appointments.

## Tech Stack
- **Front-end**: React.js
- **Back-end**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT (JSON Web Token)

## Installation
1. **Clone the repository**
   ```sh
   git clone https://github.com/yourusername/prescripto.git](https://github.com/ashutoshkgiri/prescripto.git
   cd prescripto
   ```
2. **Install dependencies**
   ```sh
  frontend- npm run dev;
  backend-npm run dev;
   ```
3. **Set up environment variables**
   Create a `.env` file in the root directory and add:
   ```env
   MONGODB_URI=''
   CLOUDINARY_NAME=''
   CLOUDINARY_API_KEY=''
   CLOUDINARY_SECRET_KEY=''
   ADMIN_EMAIL=''
   ADMIN_PASSWORD=''
   JWT_KEY='MERNSTACK'
   CURRENCY="INR"
   RAZORPAY_KEY_ID=''
   RAZORPAY_KEY_SECRET=''
   VITE_BACKEND_URL=''
   ```
   Make sure to replace `<your_value>` with the actual values.

4. **Run the project**
   ```sh
   npm start
   ```

## API Endpoints
| Method | Endpoint         | Description                     |
|--------|-----------------|---------------------------------|
| POST   | /api/auth/login | User login                     |
| POST   | /api/auth/register | User registration           |
| GET    | /api/doctors    | Fetch all doctors              |
| POST   | /api/appointments | Book an appointment         |

## Contributing
Contributions are welcome! Feel free to fork the repo and submit a pull request.

## Contact
For any inquiries, contact Ashutosh kumar giri at ashgiri49455@gmail.com

