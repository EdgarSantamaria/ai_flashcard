import { SignIn } from "@clerk/nextjs";
import { AppBar, Box, Button, Container, Toolbar, Typography } from "@mui/material";
import Link from "next/link";


export default function SignUpPage(){
    return(
        <Container disableGutters maxWidth={false} sx={{backgroundColor: '#F6F7FB', minHeight:'100vh'}}>
            <AppBar position='static' elevation={0} sx={{border:1, borderColor:'#ECEFF4',backgroundColor: '#FFFFFF'}}>
                <Toolbar>
                    <Button sx = {{color: '#2E3856'}} variant='h7' href='/'>AI Flashcards</Button>
                    <Typography style={{flexGrow:1}}></Typography>
                    <Button sx={{color:'#2E3856'}} href="/sign-up">Sign Up</Button>
                </Toolbar>
            </AppBar>

            <Box display='flex' flexDirection='column' alignItems='center' justifyContent='center'>
                <Typography sx = {{color: '#2E3856', mt:4}} variant='h4' gutterBottom>Log In</Typography>
                <SignIn/>
            </Box>
        </Container>
    )
}