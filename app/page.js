import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button, Container, Typography, AppBar, Toolbar, Box, Grid} from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth='100vw'>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name='description' content='Create Flashcards from your text.' />
      </Head>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{flexGrow:1}}>Flashcard</Typography>
          <SignedOut>
            <Button color='inherit' href="/sign-in">Login</Button>
            <Button color='inherit' href="sign-up">Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>

      <Box sx={{textAlign:'center', my:4}}>
        <Typography variant='h3' gutterBottom>Welcome to AI Flashcards</Typography>
        <Typography variant='h6' gutterBottom>Create flashcards from your text.</Typography>
        <Button variant='contained' color='primary' sx={{mt:2}}>Get Started</Button>
      </Box>
      <Box sx={{my:6}}>
        <Typography variant="h4" gutterBottom>Features</Typography>
        <Grid container spacing={4}>
          <Grid item xs ={12} md={4}>
            <Typography variant="h5" gutterBottom>Text Input</Typography>
            <Typography>
              {''}
              Input your text and let the AI do the rest.
              </Typography>
          </Grid>
          <Grid item xs ={12} md={4}>
            <Typography variant="h5" gutterBottom>AI Flashcards</Typography>
            <Typography>
              {''}
              Let our AI generate flashcards for you.
              </Typography>
          </Grid>
          <Grid item xs ={12} md={4}>
            <Typography variant="h5" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              {''}
              Access your flashcards from any device. Study on the go with ease.
              </Typography>
          </Grid>
        </Grid>
      </Box>

      <Box sx={{my:6, textAlign:'center'}}>
        <Typography variant='h5' gutterBottom>Pricing</Typography>
        <Typography variant='h6' gutterBottom>Free for 30 days. No credit card required.</Typography>

        <Grid container spacing={4}>
          <Grid item xs ={12} md={6}>
            <Box sx={{p:3, border:'1px solid', borderColor: 'grey.300', borderRadius:2}}>
              <Typography variant="h5" gutterBottom>Basic</Typography>
              <Typography variant="h6" gutterBottom>$0.99/month</Typography>
              <Typography>
                {''}
                Access to Basic Flashcards and limited storage.
              </Typography>
              <Button variant='contained' color='primary' sx={{mt:2}}>Select Basic Plan</Button>
            </Box>
          </Grid>
          <Grid item xs ={12} md={6}>
            <Box sx={{p:3, border:'1px solid', borderColor: 'grey.300', borderRadius:2}}>
              <Typography variant="h5" gutterBottom>Pro</Typography>
              <Typography variant="h6" gutterBottom>$2.99/month</Typography>
              <Typography>
                {''}
                Unlimited Flashcards and storage.
              </Typography>
              <Button variant='contained' color='primary' sx={{mt:2}}>Select Pro Plan</Button>
            </Box>
          </Grid>
          <Grid item xs ={12} md={4}>
            <Typography variant="h5" gutterBottom>Accessible Anywhere</Typography>
            <Typography>
              {''}
              Access your flashcards from any device. Study on the go with ease.
              </Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
