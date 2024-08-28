'use client'
import {SignedIn, SignedOut, UserButton, useUser} from "@clerk/nextjs";
import { useEffect, useState } from "react"
import { collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"
import { Box, Button, Card, CardActionArea, CardContent, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Paper, TextField, Typography, AppBar, Toolbar } from "@mui/material"

export default function Flashcard() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const [flipped, setFlipped] = useState([])
    const router = useRouter()

    const searchParams = useSearchParams()
    const search = searchParams.get('id')

    useEffect(() => {
        async function getFlashcard(){
            if(!search || !user){
                return
            }
            const colRef = collection(doc(collection(db, 'users'), user.id), search)
            const docs = await getDocs(colRef)
            const flashcards = []
            
            docs.forEach((doc) =>{
                flashcards.push({id: doc.id, ...doc.data()})
            })
            setFlashcards(flashcards)
        }
        getFlashcard()
    }, [user, search])

    if(!isLoaded || !isSignedIn){
        return <></>
    }

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    const handleHomeClick = () => {
        router.push('/')
    }

    const handleGoBack = () => {
        router.push('/flashcards')
    }

    return(
        <Container disableGutters maxWidth={false} sx={{backgroundColor: '#F6F7FB', minHeight:'100vh'}}>
            <AppBar position='static' elevation={0} sx={{border:1, borderColor:'#ECEFF4',backgroundColor: '#FFFFFF'}}>
                <Toolbar>
                <Button variant='h7' sx={{color: '#2E3856'}} onClick={handleHomeClick}>
                        AI Flashcards
                    </Button>
                    <Typography style={{flexGrow:1}}></Typography>
                    <SignedIn>
                        <UserButton/>
                    </SignedIn>
                </Toolbar>
            </AppBar>
            {flashcards.length > 0 && (
            <Box sx={{mt:4}}>
                <Box sx={{mt:4, mb:1, display:'flex', flexDirection: 'column', alignItems:'center'}}>
                <Typography sx = {{color: '#2E3856'}} variant='h5'>Flashcards Preview</Typography>
                <Button 
                        variant='contained' 
                        sx={{mt:1, 
                            backgroundColor:'#413ED8', 
                            "&:hover":{
                            backgroundColor: '#3d3ac9'
                            }}}
                        onClick={handleGoBack}
                    >
                        {''}
                        Go Back To Flashcards
                    </Button>
                </Box>
                <Grid container spacing={3} sx={{mt:2}}>
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
        </Container>
    )
}