'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from 'react'
import { firestore } from '@/firebase'
import { Box, Modal, Typography, Stack, TextField, Button } from '@mui/material'
import { collection, deleteDoc, getDoc, getDocs, query, setDoc, doc } from "firebase/firestore"

export default function Home() {
  const [inventory, setInventory] = useState([])
  const [open, setOpen] = useState(false)
  const [itemName, setItemName] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  const updateInventory = async () => {
    const snapshot = query(collection(firestore, 'inventory'))
    const docs = await getDocs(snapshot)
    const inventoryList = []
    docs.forEach((doc) => {
      inventoryList.push({
        name: doc.id,
        ...doc.data(),
      })
    })
    setInventory(inventoryList)
    console.log(inventoryList)
  }

  const removeItem = async (item) => {
    const normalizedItem = item.toLowerCase()
    const docRef = doc(collection(firestore, 'inventory'), normalizedItem)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      if (quantity === 1) {
        await deleteDoc(docRef)
      } else {
        await setDoc(docRef, { quantity: quantity - 1 })
      }
    }

    await updateInventory()
  }

  const addItem = async (item) => {
    const normalizedItem = item.toLowerCase()
    const docRef = doc(collection(firestore, 'inventory'), normalizedItem)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      const { quantity } = docSnap.data()
      await setDoc(docRef, { quantity: quantity + 1 })
    } else {
      await setDoc(docRef, { quantity: 1 })
    }
    await updateInventory()
  }

  const clearItem = async (item) => {
    const normalizedItem = item.toLowerCase()
    const docRef = doc(collection(firestore, 'inventory'), normalizedItem)

    await deleteDoc(docRef)
    await updateInventory()
  }

  useEffect(() => {
    updateInventory()
  }, [])

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

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
      <Modal open={open} onClose={handleClose}>
        <Box 
          position="absolute" 
          top="50%"
          left="50%" 
          width={400}
          bgcolor="white"
          border="2px solid #000"
          boxShadow={24}
          p={4}
          display="flex" 
          flexDirection="column"
          gap={3}
          sx={{
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Typography variant="h6">Add Item</Typography>
          <Stack width="100%" direction="row" spacing={2}>
            <TextField
              variant='outlined'
              fullWidth
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
            />
            <Button
              variant="outlined"
              onClick={() => {
                if (itemName.trim() !== '') {
                  addItem(itemName) 
                  setItemName('')  // Clear the input field
                  handleClose()    // Close the modal
                }
              }}
            >
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
      <Box 
        width="1000px" 
        minHeight="30px" 
        display="flex"
        alignItems="center" 
        justifyContent="space-between"
        padding="0 16px"
      >
        <Typography variant="h2" color="#333">
          Inventory 
        </Typography>
        <TextField
          variant="outlined"
          placeholder="Search items"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: '300px' }}
        />
        <Button variant='contained' onClick={handleOpen}>
          Add New Item
        </Button>
      </Box>
      <Box 
        border='4px solid #333'
        width="1000px" 
        height="500px" 
        overflow="auto" // Enable scrolling
      >
        <Box 
          width="1000px" 
          height="100px"
          bgcolor="#ADD8E6"
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <Typography variant="h2" color="#333">
            Inventory Items
          </Typography>
        </Box>
        <Stack 
          width="1000px" 
          height="400px" // Adjusted to show more items
          spacing={2} 
          overflow="auto"
        >
          {filteredInventory.map(({ name, quantity }) => (
            <Box 
              key={name} 
              width="100%"
              minHeight="100px" 
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              bgColor="#f0f0f0"
              padding={2}
            >
              <Typography variant="h4" color="#333" textAlign="center">
                {name.charAt(0).toUpperCase() + name.slice(1)}
              </Typography>
              <Typography variant="h4" color="#333" textAlign="center">
                {quantity}
              </Typography>
              <Box display="flex" gap={1}>
                <Button variant="contained" onClick={() => addItem(name)}>
                  Add more
                </Button>
                <Button variant="contained" onClick={() => removeItem(name)}>
                  Remove
                </Button>
                <Button 
                  variant="contained" 
                  onClick={() => clearItem(name)}
                  sx={{ backgroundColor: 'red', color: 'white' }}
                >
                  Clear Item
                </Button>
              </Box>
            </Box>
          ))}
        </Stack>
      </Box>
    </Box>
  )
}