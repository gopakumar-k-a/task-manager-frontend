# React + Vite Front-End Mini Project

This project is a front-end application built using React and Vite. It provides a minimal setup with Hot Module Replacement (HMR) and includes ESLint rules for maintaining code quality.

## Features

- **React + Vite**: Utilizes Vite for fast development builds and React for building the user interface.
- **Image Management**: Users can upload, manage, and organize their images efficiently.
- **Authentication**: Includes user registration and login functionalities.
- **Image Editing**: Allows users to edit or delete images and titles.
- **Drag and Drop**: Rearrange images using drag and drop functionality.

## Project Overview

The application includes the following key features:

### Slides

1. **Welcome to imageDrive**
   - **Description**: An application that allows you to manage your images with ease. Login, Register, and start uploading!

2. **Register and Login**
   - **Description**: Create an account using your Email ID and Phone number, and secure it with a password. Forgot your password? No worries, reset it anytime!

3. **Add and Manage Images**
   - **Description**: Easily add images with titles, view your uploads, and manage them all in one place. Edit or delete your images with just a click.

4. **Rearrange Images**
   - **Description**: Drag and drop to rearrange your images. Save the order that best suits your needs.

5. **Edit and Delete**
   - **Description**: Need to update an image or its title? Edit it! Want to remove it? Delete it with ease.

## Backend Integration

The image upload and management process involves the following backend technologies:

- **Image Upload**: Uses [Multer](https://www.npmjs.com/package/multer) to handle file uploads in Node.js.
- **Storage**: Uploaded images are stored in an [Amazon S3 bucket](https://aws.amazon.com/s3/) for scalable and secure file storage.
- **Database**: Information about the uploaded images (such as titles and URLs) is saved in [MongoDB](https://www.mongodb.com/) for persistent storage and easy retrieval.

## Getting Started

To get started with this project, follow these steps:

1. **Clone the Repository**
   ```bash
   git clone https://github.com/gopakumar-k-a/imageDrive-frontend.git
   cd imageDrive-frontend
