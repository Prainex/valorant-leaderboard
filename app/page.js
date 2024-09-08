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
import AgentDropdown from "./agentdropdown";

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

    const MapButton = ({ image, backgroundImage, label, onClick }) => (
        <ListItem>
            <ListItemButton
                onClick={onClick}
                sx={{
                    backgroundImage: `url(${backgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: 70,
                    width: 350,
                    color: 'White',
                    border: 'none',
                    '&:hover': {
                        backgroundColor: 'transparent',
                    },
                }}
            >
                <ListItemText
                    disableTypography
                    primary={
                        <Typography
                            variant="h5"
                            color="#fffff"
                            fontWeight="bold"
                            sx={{
                                textAlign: 'center',
                                '-webkit-text-stroke': '0.6px #000',
                            }}
                        >
                            {label}
                        </Typography>
                    }
                />
            </ListItemButton>
        </ListItem>
    );

    const drawerContent = () => (
        <Box
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
            sx={{ width: 250 }}
        >
          <List>
            <MapButton 
            label= "Abyss"
            backgroundImage="https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/listviewicon.png"
            onClick={() => updateImage('https://media.valorant-api.com/maps/224b0a95-48b9-f703-1bd8-67aca101a61f/premierbackgroundimage.png')}
            />
            <MapButton 
            label= "Ascent"
            backgroundImage="https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/7eaecc1b-4337-bbf6-6ab9-04b8f06b3319/premierbackgroundimage.png")}
            />
            <MapButton 
            label= "Bind"
            backgroundImage="https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/2c9d57ec-4431-9c5e-2939-8f9ef6dd5cba/premierbackgroundimage.png")}
            />
            <MapButton 
            label= "Breeze"
            backgroundImage="https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/2fb9a4fd-47b8-4e7d-a969-74b4046ebd53/premierbackgroundimage.png")}
            />
            <MapButton 
            label= "Fracture"
            backgroundImage="https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/b529448b-4d60-346e-e89e-00a4c527a405/premierbackgroundimage.png")}
            />
            <MapButton 
            label= "Haven"
            backgroundImage="https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/2bee0dc9-4ffe-519b-1cbd-7fbe763a6047/premierbackgroundimage.png")}
            />
            <MapButton 
            label= "Icebox"
            backgroundImage="https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/e2ad5c54-4114-a870-9641-8ea21279579a/premierbackgroundimage.png")}
            />
            <MapButton 
            label= "Lotus"
            backgroundImage="https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/2fe4ed3a-450a-948b-6d6b-e89a78e680a9/premierbackgroundimage.png")}
            />
            <MapButton
            label= "Pearl"
            backgroundImage="https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/fd267378-4d1d-484f-ff52-77821ed10dc2/premierbackgroundimage.png")}
            />
            <MapButton
            label= "Split"
            backgroundImage="https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/d960549e-485c-e861-8d71-aa9d1aed12a2/premierbackgroundimage.png")}
            />
            <MapButton
            label= "Sunset"
            backgroundImage="https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/listviewicon.png"
            onClick={() => updateImage("https://media.valorant-api.com/maps/92584fbe-486a-b1b2-9faa-39b0f486b498/premierbackgroundimage.png")}
            />
            </List>
        </Box>
    );

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed"
            sx={{backgroundColor: "#8E8274" }}>
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
                PaperProps={{sx: { backgroundColor: '#2D5267'}}}
            >
                {drawerContent()}
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: '#2D5267', p: 3, mt: 8 }}
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
                        <Typography variant="h2" color="#ffffff" fontWeight="bold">
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
                            width="500px"
                            height="400px" 
                            spacing={2} 
                            alignItems="Center"
                        >
                            <AgentDropdown />
                            <AgentDropdown />
                            <AgentDropdown />
                            <AgentDropdown />
                            <AgentDropdown />
                            
                        </Stack>
                    </Box>
                    <Pagination 
                        count={24} 
                        color="primary"
                        page={page}
                        onChange={handlePageChange} 
                    />
                </Container>
            </Box>
        </Box>
    );
}
