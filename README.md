# Remove Background App

## Description

The Remove Background App is a React-based web application that allows users to upload images and remove their backgrounds using the Remove.bg API. This simple and user-friendly interface lets you upload images via drag-and-drop or file input, preview them, and download the processed images without backgrounds.

## Features

- Upload images via drag-and-drop or file selection
- Preview the uploaded image
- Remove the background from images using the Remove.bg API
- Download the processed image with the background removed
- Responsive design that works on various screen sizes

## Technologies Used

- **React**: A JavaScript library for building user interfaces.
- **Material-UI**: A popular React UI framework for designing beautiful and responsive web applications.
- **Axios**: A promise-based HTTP client for making requests to the Remove.bg API.
- **Remove.bg API**: A service for removing image backgrounds.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/remove-background-app.git
   ```

2. **Navigate to the project directory**:
   ```bash
   cd remove-background-app
   ```

3. **Install the dependencies**:
   ```bash
   npm install
   ```

4. **Run the application**:
   ```bash
   npm start
   ```

   The application will be available at `http://localhost:3000`.

## Usage

1. Drag and drop an image into the designated area or click the "Upload files" button to select an image from your device.
2. After the image is uploaded, you can preview it.
3. Click the "Supprimer le fond" button to remove the background.
4. Once the background is removed, you can download the new image by clicking the "Télécharger l'image" button.

## API Key

To use the Remove.bg API, you need to obtain an API key:

1. Sign up at [Remove.bg](https://www.remove.bg/api) and create an API key.
2. Replace the placeholder API key in the `handleRemoveBackground` function in `App.js` with your actual API key:

   ```javascript
   headers: {
     'X-Api-Key': 'YOUR_API_KEY_HERE', // Replace with your API key
   },
   ```
