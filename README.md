# SFIT EXAM AUTOMATION SYSTEM

## Project Overview

The SFIT EXAM AUTOMATION SYSTEM is a comprehensive solution designed to enhance the efficiency and accuracy of examination result management within SFIT. Built using the MERN stack (MongoDB, Express.js, React.js, Node.js), this system automates key processes in exam result generation and management.


## Project Structure

```
project-root/
│
├── backend/
│   └── server.js
│
└── frontend/
    └── myapp/
        └── src/
            └── App.js
```

## Setup Instructions

### Backend Setup

1. Open a terminal and navigate to the backend directory:
   ```
   cd backend
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the backend server:
   ```
   nodemon server
   ```

The backend server should now be running on `http://localhost:5000` (or whichever port you've configured).

### Frontend Setup

1. Open a new terminal window and navigate to the frontend directory:
   ```
   cd frontend/myapp/
   ```

2. Install the required dependencies:
   ```
   npm install
   ```

3. Start the frontend development server:
   ```
   npm run start
   ```

The frontend application should now be running on `http://localhost:3000`.

## Accessing the Application

Once both the backend and frontend servers are running, you can access the full application by opening a web browser and navigating to `http://localhost:3000`.

## System Base Functionality

The system implements the following for various user requests:

1. Login
2. Subject Addition
3. Enter Marks
4. Get Marks
5. Get Students
6. Update Marks
7. Upload Excel
8. Analysis
9. Generate Reports
10. Generate Gazette
11. Teacher-Subject Subscription Model

Each of these functionalities follows a specific set of steps to ensure secure and efficient operation. For detailed information on each step, please refer to the system documentation.

## Additional Information

- Ensure you have Node.js and npm (Node Package Manager) installed on your system before starting the setup process.
- If you encounter any issues during setup, please check the console output for error messages and ensure all dependencies are correctly installed.
- For development purposes, the backend uses `nodemon` to automatically restart the server when changes are detected. Ensure you have `nodemon` installed globally or as a dev dependency.

## Contributing

We welcome contributions to the SFIT EXAM AUTOMATION SYSTEM. Please read our contributing guidelines before submitting pull requests.

## License

[Add your license information here]

## Support

For any queries or support, please contact the SFIT IT department.
