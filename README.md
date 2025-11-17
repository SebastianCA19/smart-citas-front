# Smart Citas - Frontend
[![Ask DeepWiki](https://devin.ai/assets/askdeepwiki.png)](https://deepwiki.com/SebastianCA19/smart-citas-front)

Smart Citas is the frontend application for a modern medical appointment management system. It provides a seamless experience for both patients and doctors to manage appointments, medical records, and personal information through dedicated user interfaces.

## Features

### For Patients
- **Authentication**: Secure registration and login for patients.
- **Appointment Management**:
    - Schedule new appointments by selecting type, location, doctor, date, and available time slots.
    - View a list of upcoming appointments for the current month.
    - View a complete history of all past and future appointments.
- **Appointment Actions**: Confirm attendance or cancel appointments (cancellations restricted to more than 24 hours in advance).
- **Medical Records**: Access and view personal medical records created by doctors.
- **User Profile**: View personal profile information and log out.

### For Doctors
- **Secure Authentication**: Registration and login restricted to users with a `@smartcitas.com` email.
- **Appointment Dashboard**: View and manage all appointments scheduled by patients.
- **Patient Search**: Filter appointments by patient's national ID (cédula).
- **Medical Records Management**:
    - Create, view, and update patient medical records directly from an appointment.
    - Access a comprehensive list of all medical records in the system.
    - Search records by patient name or national ID.
- **Dedicated Interface**: A sidebar-based layout for easy navigation between appointments and medical records.

## Technology Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI & Animation**: [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/)
- **Notifications**: [React Hot Toast](https://react-hot-toast.com/)

## Project Structure

The project utilizes the Next.js App Router with route groups to organize the application's different sections:

- `app/(main)`: The public-facing landing page.
- `app/(auth)`: The login and registration flows.
- `app/(patients)`: The dashboard and features for logged-in patients.
- `app/(doctors)`: The dashboard and tools for logged-in doctors.
- `app/components`: Reusable React components, organized by feature (e.g., `patients`, `doctors`, `index`).
- `app/components/types`: TypeScript type definitions for core data models like `Appointment` and `MedicalRecord`.

## Getting Started

This project is the frontend part of the Smart Citas application and requires the corresponding backend services to be running.

### Prerequisites

Ensure the backend microservices are running on their respective ports:
- **Users/Doctors Service**: `http://localhost:8081`
- **Appointments Service**: `http://localhost:8082`
- **Medical Records Service**: `http://localhost:8083`

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/sebastianca19/smart-citas-front.git
    cd smart-citas-front
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Available Scripts

In the project directory, you can run:

- `npm run dev`: Starts the development server.
- `npm run build`: Builds the app for production.
- `npm start`: Starts a production server.
- `npm run lint`: Lints the codebase using ESLint.
