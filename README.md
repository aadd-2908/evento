# Evento - Event Management System

Evento is an Event Management System built using React, Vite, Spring Boot, and a relational database. It allows users to view, create, and book tickets for events, making it easier to manage and organize events.

## Features

- **Home Page**: Displays a list of upcoming events.
- **Sign In**: Allows users to sign up or log in to their account.
- **Login**: User authentication to access the dashboard and other features.
- **Ticket Booking**: Allows users to book tickets for events with images.
- **Event Organizing**: Event organizers can create and manage events.
- **Booked Events**: Users can view their booked events.

## Tech Stack

### Frontend
- **React.js**: A JavaScript library for building user interfaces.
- **Vite**: A fast build tool for modern web projects.
- **CSS**: Styling of the components.

### Backend
- **Spring Boot**: Java-based framework to build backend APIs.
- **JPA/Hibernate**: For database interaction.
- **MySQL/PostgreSQL**: Relational database for storing events and user data.

## Setup Instructions

### Prerequisites

- Node.js (for frontend)
- Java 8 or above (for backend)
- MySQL or PostgreSQL database
- Maven (for backend dependencies)

### Frontend Setup

1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/Evento.git
    cd Evento/frontend
    ```

2. Install dependencies:

    ```bash
    npm install
    ```

3. Run the development server:

    ```bash
    npm run dev
    ```

   The frontend will be available at `http://localhost:3000`.

### Backend Setup

1. Navigate to the backend folder:

    ```bash
    cd Evento/backend
    ```

2. Install dependencies using Maven:

    ```bash
    mvn install
    ```

3. Configure your database in the `application.properties` or `application.yml` file.

4. Run the Spring Boot application:

    ```bash
    mvn spring-boot:run
    ```

   The backend API will be available at `http://localhost:8080`.

### Database Setup

1. Create a database for the project (e.g., `evento_db`).
2. Set up your database configurations in the `application.properties` (e.g., `spring.datasource.url`).

### Testing the Application

1. Open the frontend in your browser at `http://localhost:3000`.
2. Create a new user or log in with existing credentials.
3. Browse the events and test ticket booking functionality.

## Project Structure

