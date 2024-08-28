'use client'
import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton, useUser} from "@clerk/nextjs";
import {Button, Container, Typography, AppBar, Toolbar, Box, Grid} from "@mui/material";
import { useRouter } from "next/navigation"
import Head from "next/head";

export default function Home() {
  const router = useRouter()
  const {isSignedIn} = useUser()

  const handleSubmit = async() => {
    const checkoutSession = await fetch('/api/checkout_session', {
      method: 'POST',
      headers: {
        origin: "http://localhost:3000",
      }
    })

    const checkoutSessionJSON = await checkoutSession.json()
    if(checkoutSession.statusCode === 500){
      console.log(checkoutSession.message)
      return
    }
    const stripe = await getStripe()
    const {error} = await stripe.redirectToCheckout({
      sessionId: checkoutSessionJSON.id
    })
    if(error){
      console.warn(error.message)
    }
  }

  const handleGetStarted = () => {
    if(isSignedIn){
      router.push('/generate')
    }else{
      router.push('/sign-in')
    }
  }
  
  return (
    <Container disableGutters maxWidth={false} sx={{backgroundColor: '#F6F7FB', minHeight:'100vh'}}>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name='description' content='Create Flashcards from your text.' />
      </Head>
      <AppBar position='static' elevation={0} sx={{border:1, borderColor:'#ECEFF4',backgroundColor: '#FFFFFF'}}>
        <Toolbar>
          <Typography sx = {{color: '#2E3856'}} variant='h7'>AI Flashcards</Typography>
          <Typography style={{flexGrow:1}}></Typography>
          <SignedOut>
            <Button sx={{color:'#2E3856'}} href="/sign-in">Login</Button>
            <Button sx={{color:'#2E3856'}} href="/sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign:'center', my:4}}>
        <Typography sx = {{color: '#2E3856'}} variant='h3' gutterBottom>Welcome to AI Flashcards</Typography>
        <Typography sx = {{color: '#2E3856'}} variant='h6' gutterBottom>Create flashcards from your text.</Typography>
        <Button variant='contained' sx={{mt:2, backgroundColor:'#413ED8', "&:hover":{
          backgroundColor: '#3d3ac9'
        }}} onClick={handleGetStarted}>Get Started</Button>
      </Box>
      <Box sx={{my:6, mx:6}}>
        <Grid container spacing={4}>
          <Grid item xs ={12} md={4}>
            <Typography sx = {{color: '#2E3856'}} variant="h5" gutterBottom>Text Input</Typography>
            <Typography sx = {{color: '#2E3856'}}>
              {''}
              Input your text and let the AI do the rest.
              </Typography>
          </Grid>
          <Grid item xs ={12} md={4}>
            <Typography sx = {{color: '#2E3856'}} variant="h5" gutterBottom>AI Flashcards</Typography>
            <Typography sx = {{color: '#2E3856'}}>
              {''}
              Let our AI generate flashcards for you.
              </Typography>
          </Grid>
          <Grid item xs ={12} md={4}>
            <Typography sx = {{color: '#2E3856'}} variant="h5" gutterBottom>Accessible Anywhere</Typography>
            <Typography sx = {{color: '#2E3856'}}>
              {''}
              Access your flashcards from any device. Study on the go with ease.
              </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{textAlign:'center'}}>
        <Typography sx = {{color: '#2E3856'}} variant='h5'>Pricing</Typography>
        <Typography sx = {{color: '#2E3856'}} variant='h6' gutterBottom>Choose a plan that works for you.</Typography>

        <Grid container spacing={4} sx={{mt:1}}>
          <Grid item xs ={12} md={6}>
            <Box sx={{mx:6, p:3, border:'1px solid', borderRadius:2, borderColor:'#ECEFF4',backgroundColor: '#FFFFFF'}}>
              <Typography sx = {{color: '#2E3856'}} variant="h5" >Basic</Typography>
              <Typography sx = {{color: '#2E3856'}} variant="h6" >Free</Typography>
              <Typography sx = {{color: '#2E3856'}}>
                {''}
                Limited flashcards and storage.
              </Typography>
              <Button variant='contained' color='primary' sx={{mt:2, backgroundColor:'#413ED8', "&:hover":{
          backgroundColor: '#3d3ac9'
        }}} href="/sign-up">Select Basic Plan</Button>
            </Box>
          </Grid>
          <Grid item xs ={12} md={6}>
            <Box sx={{mx:6, p:3, border:'1px solid', borderRadius:2, borderColor:'#ECEFF4',backgroundColor: '#FFFFFF'}}>
              <Typography sx = {{color: '#2E3856'}} variant="h5" >Pro</Typography>
              <Typography sx = {{color: '#2E3856'}} variant="h6" >$2.99/month</Typography>
              <Typography sx = {{color: '#2E3856'}}>
                {''}
                Unlimited flashcards and storage.
              </Typography>
              <Button variant='contained' color='primary' sx={{mt:2, backgroundColor:'#413ED8', "&:hover":{
          backgroundColor: '#3d3ac9'
        }}} onClick={handleSubmit}>Select Pro Plan</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
