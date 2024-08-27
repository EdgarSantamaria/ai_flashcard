'use client'
import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import getStripe from "@/utils/get-stripe"
import { useSearchParams } from "next/navigation"
import { Box, Button, CircularProgress, Container, Typography } from "@mui/material"

const ResultPage = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const session_id = searchParams.get('session_id')
    const [loading, setLoading] = useState(true)
    const [session, setSession] = useState(null)
    const [error, setError] = useState(null)

    const handleHomeClick = () => {
        router.push('/')
    }

    useEffect(() => {
        const fetchCheckoutSession = async () => {
            if(!session_id){
                return
            }
            try{
                const res = await fetch(`/api/checkout_session?session_id=${session_id}`)
                const sessionData = await res.json()
                if(res.ok){
                    setSession(sessionData)
                }else{
                    setError(sessionData.error)
                }
            }catch(err){
                setError("An error occurred.")
            }finally{
                setLoading(false)
            }
        }
        fetchCheckoutSession()
    }, [session_id])
    
    if(loading){
        return(
            <Container maxWidth='100vw' sx={{textAlign:'center', mt:4}}>
                <CircularProgress/>
                <Typography variant="h6">Loading...</Typography>
            </Container>
        )
    }

    if(error){
        return(
            <Container maxWidth='100vw' sx={{textAlign:'center', mt:4}}>
                <Typography variant="h6" color='error'>{error}</Typography>
            </Container>
        )
    }
    return(
        <Container maxWidth='100vw' sx={{textAlign:'center', mt:4}}>
            {session.payment_status === 'paid' ? (
                <>
                <Box sx={{mt:22}}>
                    <Typography sx ={{mt:5}} variant="h4">Payment successful! Your order is being processed.</Typography>
                    <Typography sx ={{mt:5}} variant="h6">Session ID: {session.id}</Typography>
                    <Typography sx ={{mt:7}} variant="body1">
                        We have recieved your payment. You will recieve an email with the order details.
                    </Typography>
                    <Button  sx ={{mt:5}} variant='outlined' color='primary' onClick={handleHomeClick}>Return to the home page</Button>
                </Box>
                </>
            ):(<>
                <Box sx={{mt:22}}>
                    <Typography sx ={{mt:5}} variant="h4">Payment Failed.</Typography>
                    <Typography sx ={{mt:7}} variant="body1">Your payment was unsucessful. Please try again.</Typography>
                    <Button sx ={{mt:5}} variant='outlined' color='primary' onClick={handleHomeClick}>Return to the home page</Button>
                </Box></>)}
        </Container>
    )
}

export default ResultPage