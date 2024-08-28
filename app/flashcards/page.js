'use client'
import {SignedIn, SignedOut, UserButton, useUser} from "@clerk/nextjs";
import { useEffect, useState } from "react"
import { collection, doc, getDoc, setDoc } from "firebase/firestore"
import { db } from "@/firebase"
import { useRouter } from "next/navigation"
import { Box, CardActionArea, Container, Grid, Card, CardContent, Typography, AppBar, Toolbar, Button } from "@mui/material"

export default function Flashcards() {
    const {isLoaded, isSignedIn, user} = useUser()
    const [flashcards, setFlashcards] = useState([])
    const router = useRouter()

    useEffect(() => {
        async function getFlashcards(){
            if(!user){
                return
            }
            const docRef = doc(collection(db, 'users'), user.id)
            const docSnap = await getDoc(docRef)
            
            if(docSnap.exists()){
                const collections = docSnap.data().flashcards || []
                console.log(collections)
                setFlashcards(collections)
            }else{
                await setDoc(docRef, {flashcards: []})
            }
        }
        getFlashcards()
    }, [user])
    if(!isLoaded || !isSignedIn){
        return <></>
    }
    const handleCardClick = (id) => {
        router.push(`/flashcard?id=${id}`)
    }

    const handleHomeClick = () => {
        router.push('/')
    }

    const handleGenerateClick = () => {
        router.push('/generate')
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

            <Box sx={{textAlign:'center'}}>
                <Button variant='contained' 
                    sx={{mt:2, 
                        backgroundColor:'#413ED8', 
                        "&:hover":{
                        backgroundColor: '#3d3ac9'
                        }}} onClick={handleGenerateClick}>Generate More Flashcards</Button>
            </Box>
            <Grid container spacing={3} sx={{mt:4, p:2}}>
                {flashcards.map((flashcard,index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card>
                            <CardActionArea onClick={() => {handleCardClick(flashcard.name)}}>
                                <CardContent>
                                    <Typography sx = {{color: '#2E3856'}} variant="h6">{flashcard.name}</Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    )
}