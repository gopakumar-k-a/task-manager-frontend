# React + Vite Front-End Mini Project

This project is a front-end application built using React and Vite. It provides a minimal setup with Hot Module Replacement (HMR) and includes ESLint rules for maintaining code quality.

## Features

- **React + Vite**: Utilizes Vite for fast development builds and React for building the user interface.
- **Task Management**: Users can add, edit, delete, and organize their tasks efficiently.
- **User Authentication**: Includes user registration and login functionalities with JWT authentication.
- **Real-Time Updates**: Stay updated with real-time task changes using Socket.io.
- **Data Visualization**: View statistics about your tasks through visual graphs and charts.

## Project Overview

The application includes the following key features:

### Slides

1. **Welcome to Task Manager**
   - **Description**: An application that allows you to manage your tasks with ease. Login, Register, and start managing your tasks today!

2. **Register and Login**
   - **Description**: Create an account with your Email ID and Password. Secure your tasks with safe login options and manage access with JWT-based authentication.

3. **Add and Manage Tasks**
   - **Description**: Easily add tasks, view your task list, and manage them all in one place. Edit or delete your tasks with just a click.

4. **Real-Time Task Updates**
   - **Description**: Get real-time updates on task changes, whether a task is added, edited, or deleted, without needing to refresh your page.

5. **Task Statistics and Visualization**
   - **Description**: Get insights into your task management with visual data on completed, pending, and overdue tasks.

## Backend Integration

The task management process involves the following backend technologies:

- **Task API**: Uses RESTful API endpoints for handling task creation, editing, deletion, and retrieval.
- **Real-Time Communication**: Uses [Socket.io](https://socket.io/) for real-time updates to the task list across all connected clients.
- **Database**: Task information is stored in [MongoDB](https://www.mongodb.com/) for persistent storage and easy retrieval.
- **Authentication**: Uses [JSON Web Tokens (JWT)](https://jwt.io/) for secure user authentication and authorization.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gopakumar-k-a/task-manager-frontend.git
   cd task-manager-frontend
