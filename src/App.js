import React, { useState, useCallback } from 'react';
import axios from 'axios';
import { AppBar, Toolbar, Typography, Container, Button, Box, Grid, CardMedia } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function App() {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [bgRemovedUrl, setBgRemovedUrl] = useState(null);

  // Function to handle image upload via drag-and-drop or file input
  const handleImageUpload = (file) => {
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
    setBgRemovedUrl(null); // Reset if uploading a new image
  };

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const onDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  }, []);

  const onDragOver = (e) => e.preventDefault();

  // Function to send image to the remove.bg API
  const handleRemoveBackground = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    try {
      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': 'dRzZKA5KckYG3YLXtXZDQbhm', // Replace with your API key
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'blob',
      });

      const blob = new Blob([response.data], { type: 'image/png' });
      const url = URL.createObjectURL(blob);
      setBgRemovedUrl(url);
    } catch (error) {
      console.error("Erreur lors de la suppression du fond :", error);
    }
  };

  const handleDownload = () => {
    if (!bgRemovedUrl) return;
    const link = document.createElement('a');
    link.href = bgRemovedUrl;
    link.download = 'image-sans-fond.png';
    link.click();
  };

  return (
    <div className='app'>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Remove Background App</Typography>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" style={{ padding: '20px', paddingTop: '50px' }}>
        <Typography color='white' variant="h4" align="center" gutterBottom>
          Supprimez le fond de vos images
        </Typography>

        {/* Drag-and-drop area */}
        {!previewUrl && (
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            style={{
              border: '2px dashed #1976d2',
              borderRadius: '8px',
              padding: '40px',
              paddingTop: '60px',
              textAlign: 'center',
              position: 'relative',
              marginBottom: '20px',
              transition: 'background-color 0.2s',
              cursor: 'pointer',
              backgroundColor: '#373d48',
            }}
          >
            <Button
              variant="contained"
              startIcon={<CloudUploadIcon />}
              style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              component="label"
            >
              Upload files
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{ display: 'none' }}
              />
            </Button>
          </div>
        )}

        {/* Display image preview only before background removal */}
        {!bgRemovedUrl && (
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <CardMedia
                component="img"
                image={previewUrl}
                style={{
                  maxHeight: '400px', // Max height for the preview image
                  maxWidth: '100%', // Ensure it doesn't exceed the container width
                  objectFit: 'contain',
                  display: 'block',
                  margin: 'auto',
                  borderRadius: '8px',
                }}
              />
            </Grid>
          </Grid>
        )}

        {/* Display image only after background removal */}
        {bgRemovedUrl && (
          <Grid container spacing={2} style={{ marginTop: '20px' }}>
            <Grid item xs={12}>
              <CardMedia
                component="img"
                alt="Image sans fond"
                image={bgRemovedUrl}
                title="Image sans fond"
                style={{
                  maxHeight: '400px', // Max height for the image with removed background
                  maxWidth: '100%', // Ensure it doesn't exceed the container width
                  objectFit: 'contain',
                  display: 'block',
                  margin: 'auto',
                }}
              />
            </Grid>
          </Grid>
        )}

        {/* Buttons to remove background or download image */}
        {image && (
          <Box textAlign="center" marginY={2}>
            {bgRemovedUrl ? (
              <Button
                variant="contained"
                color="success"
                onClick={handleDownload}
                startIcon={<DownloadIcon />}
                style={{ padding: '10px 20px' }}
              >
                Télécharger l'image
              </Button>
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={handleRemoveBackground}
                style={{ padding: '10px 20px' }}
              >
                Supprimer le fond
              </Button>
            )}
          </Box>
        )}
      </Container>
    </div>
  );
}

export default App;
