import Image from "next/image";
import getStripe from "@/utils/get-stripe";
import {SignedIn, SignedOut, UserButton} from "@clerk/nextjs";
import {Button, Container, Typography, AppBar, Toolbar, Box, Grid} from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <Container maxWidth='lg'>
      <Head>
        <title>Flashcard SaaS</title>
        <meta name='description' content='Create Flashcards from your text.' />
      </Head>
      <AppBar position='static'>
        <Toolbar>
          <Typography variant='h6' style={{flexGrow:1}}>Flashcard</Typography>
          <SignedOut>
            <Button color='inherit'>Login</Button>
            <Button color='inherit'>Sign Up</Button>
          </SignedOut>
          <SignedIn>
            <UserButton/>
          </SignedIn>
        </Toolbar>
      </AppBar>
      <Box sx={{textAlign:'center', my:4}}>
        <Typography variant='h3'>Welcome to AI Flashcards</Typography>
        <Typography variant='h6'>Create flashcards from your text.</Typography>
        <Button variant='contained' color='primary' sx={{mt:2}}>Get Started</Button>
      </Box>
      <Box sx={{my:6}}>
        <Typography variant="h4" components="h2">Features</Typography>
        <Grid contained spacing={4}>
          <Grid item xs ={12} md={4}>
            <Typography variant="h5">Text Input</Typography>
            <Typography>Input your text and let the AI do the rest.</Typography>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
