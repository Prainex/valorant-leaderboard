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
import { useState } from 'react';
import { AppBar, Box, Button, Container, CssBaseline, Drawer, Stack, Pagination, IconButton, List, ListItem, ListItemText, ListItemButton, Toolbar, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function Home() {
    const [page, setPage] = useState(1);
    const [bgImage, setBgImage] = useState('')
    const [drawerOpen, setDrawerOpen] = useState(false);

    const handlePageChange = async (event, value) => {
      setPage(value);
    };

    const updateImage = async (imageURL) => {
      setBgImage(`url(${imageURL})`)
    };

    const toggleDrawer = (open) => () => {
      setDrawerOpen(open);
    };

    const drawerContent = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ width: 250 }}
        >
          <List>
            <ListItem>
              <ListItemButton
                onClick={() => updateImage('https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/stylizedbackgroundimage.png')}
                sx={{
                backgroundImage: 'url(https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                height: 90,
                width: 350,
                color: 'White',  // Hide text
                border: 'none', // Remove default border
                '&:hover': {
                  backgroundColor: 'transparent', // Ensure no additional color on hover
                },
              }}
            >
          <ListItemText disableTypography
            primary={
              <Typography 
                variant="h5" 
                color="#fffff" 
                fontWeight="bold"
                sx={{ 
                  textAlign: 'center',
                  '-webkit-text-stroke': '0.5px #000',}}>Ascent</Typography>}
          />
        </ListItemButton>
      </ListItem>
    </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ mr: 2 }}
                    >
                      <Image 
                        src="/abstract.svg"
                        alt="PAM Icon"
                        width={48}  // Set the desired width
                        height={48}  // Set the desired height
                        />
                    </IconButton>
                    <Typography variant="h6" noWrap component="div">
                        PAM - #1 Valorant Analyst Tool
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerContent()}
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3, mt: 8 }}
            >
                <Container maxWidth="lg">
                    <Box 
                        width="100%"
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
                    <Box 
                        border='4px solid #333'
                        width="100%"
                        height="600px" 
                        sx={{
                            backgroundImage: bgImage,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                        <Box 
                            width="100%"
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
                            width="100%"
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
                </Container>
            </Box>
        </Box>
    );
}
