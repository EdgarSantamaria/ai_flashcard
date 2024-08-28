'use client'

import { useUser } from "@clerk/nextjs"
import {db} from '@/firebase'
import { AppBar, Box, Button, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Toolbar, Typography } from "@mui/material"
import { collection, doc, setDoc, getDoc, writeBatch } from "firebase/firestore"
import { useRouter } from "next/navigation"
import { useState } from "react"
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";

export default function Generate(){
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const [text, setText] = useState('')
    const [name, setName] = useState('')
    const [open, setOpen] = useState(false)
    const router = useRouter()


    const handleSubmit = async() => {
        fetch ('api/generate', {
            method: 'POST',
            body: text
        })
        .then((res) => res.json())
        .then((data) => setFlashcards(data))
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleOpen = () =>{
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const saveFlashcards = async()=>{
        if(!name){
            alert('Please enter a name for the flashcards')
            return
        }

        const batch = writeBatch(db)
        const userDocRef = doc(collection(db, 'users'), user.id)
        const docSnap = await getDoc(userDocRef)

        if(docSnap.exists()){
            const collections = docSnap.data().flashcards || []
            if(collections.find((f)=> f.name === name)){
                alert('Flashcards with that name already exists')
                return
            }else{
                collections.push({name})
                batch.set(userDocRef, {flashcards: collections}, {merge: true})
            }
        }
        else{
            batch.set(userDocRef, {flashcards: [{name}]})
        }

        const colRef = collection(userDocRef, name)
        flashcards.forEach((flashcard) => {
            const cardDocRef = doc(colRef)
            batch.set(cardDocRef,flashcard)
        })

        await batch.commit()
        handleClose()
        router.push('/flashcards')
    }

    const handleHomeClick = () => {
        router.push('/')
    }

    const handleFlashcardsClick = () => {
        router.push('/flashcards')
    }  

    return(
        <Container disableGutters maxWidth={false} sx={{backgroundColor: '#F6F7FB', minHeight:'100vh'}}>
            <AppBar position='static' elevation={0} sx={{border:1, borderColor:'#ECEFF4',backgroundColor: '#FFFFFF'}}>
                <Toolbar>
                    <Button variant='h7' sx = {{color: '#2E3856'}} onClick={handleHomeClick}>
                        AI Flashcards
                    </Button>
                    <Typography style={{flexGrow:1}}></Typography>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </Toolbar>
            </AppBar>
            
            <Box sx={{textAlign:'center', mt:5}}>
                <Button 
                    variant='contained' 
                    sx={{mt:1, 
                        backgroundColor:'#413ED8', 
                        "&:hover":{
                        backgroundColor: '#3d3ac9'
                        }}}  
                    onClick={handleFlashcardsClick}
                >
                    See your stored flashcards
                </Button>
            </Box>
            <Box sx={{mt:4, mb:6, display:'flex', flexDirection:'column', alignItems:'center'}}>
                <Typography sx = {{color: '#2E3856'}} variant='h4'>Generate Flashcards</Typography>
                <Paper sx={{mt:3,p:4, width:'60%'}}>
                    <TextField 
                    value={text} 
                    onChange={(e) => setText(e.target.value)} 
                    label='Enter Text' 
                    fullWidth 
                    multiline
                    rows={4}
                    variant="outlined"
                    sx={{mb:2}}
                    />
                    <Button 
                    variant='contained' 
                    sx={{mt:1, 
                        backgroundColor:'#413ED8', 
                        "&:hover":{
                        backgroundColor: '#3d3ac9'
                        }}} 
                    onClick={handleSubmit} 
                    fullWidth>
                        {''}
                        Submit
                    </Button>
                </Paper>
            </Box>
            {flashcards.length > 0 && (<Box sx={{mt:4}}>
                <Box sx={{mt:4, mb:1, display:'flex', flexDirection: 'column', alignItems:'center'}}>
                    <Typography sx = {{color: '#2E3856'}} variant='h5'>Flashcards Preview</Typography>
                    <Button 
                        variant='contained' 
                        sx={{mt:1, 
                            backgroundColor:'#413ED8', 
                            "&:hover":{
                            backgroundColor: '#3d3ac9'
                            }}}
                        onClick={handleOpen}
                    >
                        {''}
                        Save
                    </Button>
                </Box>
                <Grid container spacing={3}>
                    {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => handleCardClick(index)}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            perspective: '1000px',
                                            '& > div': {
                                                transition: 'transform 0.6s',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '200px',
                                                boxShadow: '0 4px 8px 0 rgba(0,0,0,0.2)',
                                                transform: flipped[index] ? 'rotateY(180deg)': 'rotateY(0deg)'
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility:'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems:'center',
                                                padding:2,
                                                boxSizing:'border-box'
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform:'rotateY(180deg)'
                                            }
                                        }}
                                    >
                                        <div>
                                            <div>
                                                <Typography sx = {{color: '#2E3856'}} variant="h5" component='div'>
                                                    {flashcard.front}
                                                </Typography>
                                            </div>
                                            <div>
                                                <Typography sx = {{color: '#2E3856'}} variant="h5" component='div'>
                                                    {flashcard.back}
                                                </Typography>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}</Grid>
            </Box>
            )}
            <Dialog open={open}>
                <DialogTitle sx = {{color: '#2E3856'}}>Save Flashcards</DialogTitle>
                <DialogContent>
                    <DialogContentText sx = {{color: '#2E3856'}}>Enter a name for your Flashcards</DialogContentText>
                    <TextField 
                    autoFocus 
                    margin='dense' 
                    label='Flashcard name' 
                    type='text' fullWidth 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    variant='outlined'
                    sx = {{color: '#2E3856'}}
                    />
                </DialogContent>
                <DialogActions>
                    <Button sx = {{color: '#2E3856'}} onClick={handleClose}>Cancel</Button>
                    <Button sx = {{color: '#2E3856'}} onClick={saveFlashcards}>Save</Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}