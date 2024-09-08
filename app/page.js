// 'use client'
// import Image from "next/image";
// import styles from "./page.module.css";
// import { useState, useEffect } from 'react'
// import { firestore } from '@/firebase'
// import { Box, Modal, Typography, Stack, TextField, Button, Pagination } from '@mui/material'
// import { collection, deleteDoc, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore"
'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, Typography, Stack, Pagination } from '@mui/material';
import { useState } from 'react';

export default function Home() {
    const [page, setPage] = useState(1);
    const [bgImage, setBgImage] = useState('')

    const handlePageChange = async (event, value) => {
      setPage(value);
    };

    const updateImage = async (imageURL) => {
      setBgImage(`url(${imageURL})`)
    };

  return (
    <Box 
      width="100vw" 
      height="100vh" 
      display="flex" 
      flexDirection="column"
      justifyContent="center" 
      alignItems="center"
      gap={2}
    > 
      <Box 
        width="1000px" 
        minHeight="15px" 
        display="flex"
        alignItems="center" 
        justifyContent="center"
        padding="0 16px"
      >
        <Typography variant="h2" color="#333" fontWeight="bold">
          Scrim Data Entry
        </Typography>
      </Box>
      <Box display="flex" gap={2}>
      <Button 
        variant="contained"
        onClick={()=> updateImage('https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/stylizedbackgroundimage.png')} 
        sx={{
          width: 350, 
          height: 90,
          backgroundImage: 'url(https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png)',  // Image for the button
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          color: 'white',  // Hide text
          border: 'none', // Remove default border
        }}
        >
          {/* Hidden text for accessibility */}
          Ascent
        </Button>
      </Box>
      <Box 
        border='4px solid #333'
        width="1008px" 
        height="600px" 
        sx={{
          backgroundImage: bgImage,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <Box 
          width="1000px" 
          height="50px"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bgcolor="transparent"
        >
          <Typography variant="h3" color="#fff">
            Round {page}
          </Typography>
        </Box>
        <Stack 
          width="1000px" 
          height="400px" 
          spacing={2} 
          overflow="auto"
        >
          {/* Content goes here */}
        </Stack>
      </Box>
      <Pagination 
        count={24} 
        variant="outlined" 
        color="secondary"
        page={page}
        onChange={handlePageChange} 
      />
    </Box>
  );
}
