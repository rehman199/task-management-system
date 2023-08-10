# Task Management System - README

## Table of Contents

- [Description](#description)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Setting Up Environment Variables](#setting-up-environment-variables)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [License](#license)
- [Author](#author)

---

## Description

Welcome to the Task Management System! This is a Full MERN (MongoDB, Express, React, Node.js) Stack application designed to help you manage and organize your tasks efficiently. The project consists of both frontend and backend components that work seamlessly together to provide a user-friendly task management experience.

---

## Prerequisites

Before you begin, ensure you have the following prerequisites:

- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [npm](https://www.npmjs.com/) (v8.0.0 or higher)

---

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/rehman199/task-management-system.git
   ```

2. Navigate to the project root directory:

   ```bash
   cd task-management-system
   ```

3. Install the project dependencies for both the frontend and backend:

   ```bash
   npm run install:all
   ```

---

## Setting Up Environment Variables

1. In the root directory of the `frontend` and `backend` folders, locate the `.env.example` files.

2. Copy the contents of `.env.example` and create a new file named `.env` in respective directories.

3. Paste the copied contents into their respective `.env`.

4. Modify the values in `.env` to match your desired configuration. These environment variables are used for configuring the frontend and backend applications.

---

## Usage

1. Start the development server for both the frontend and backend concurrently:

   ```bash
   npm run dev
   ```

2. Access the frontend application in your web browser at [http://localhost:3000](http://localhost:3000).

3. Interact with the Task Management System, create tasks, edit them, and enjoy a seamless task management experience.

---

## Running Tests

The `tests` directory within the `backend` folder contains all the backend test files.

To run the tests for the backend, follow these steps:

1. Ensure you have completed the installation steps mentioned in the main README to install the project dependencies.

2. Navigate to the `backend` directory:

   ```bash
   cd backend
   ```

3. Run the Jest tests using the following command:

   ```bash
   npm test
   ```

Jest will automatically discover and execute all the test files within the `tests` directory and provide you with test results and coverage information.

---

## Technologies

The Task Management System is built using the following technologies:

- Frontend:

  - [Next.js](https://nextjs.org/) - React framework for server-side rendering and frontend development.
  - [Material-UI](https://mui.com/) - React UI framework for creating stylish and responsive UI components.
  - [Redux Toolkit](https://redux-toolkit.js.org/) - State management library for managing application state.
  - [axios](https://axios-http.com/) - Promise-based HTTP client for making API requests.

- Backend:
  - [Node.js](https://nodejs.org/) - JavaScript runtime for building server-side applications.
  - [Express](https://expressjs.com/) - Web application framework for building APIs and handling HTTP requests.
  - [MongoDB](https://www.mongodb.com/) - NoSQL database for storing task and user data.
  - [Mongoose](https://mongoosejs.com/) - Object Data Modeling (ODM) library for MongoDB and Node.js.
  - [JEST](https://jestjs.io/docs/getting-started/) - Jest is a delightful JavaScript Testing Framework.

---

## Project Structure

The project is organized into the following directories:

- `frontend`: Contains the frontend application built using Next.js and React.
- `backend`: Contains the backend application built using Node.js, Express, and MongoDB.

---

## License

This project is licensed under the [ISC License](LICENSE).

---

## Author

- Name: Rehman Aziz
- GitHub: [https://github.com/rehman199](https://github.com/rehman199)

Feel free to reach out if you have any questions or feedback regarding this project.

---

Thank you for using the Task Management System! We hope this application helps you stay organized and productive.
