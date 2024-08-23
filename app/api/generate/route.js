import {NextResponse} from 'next/server'
import OpenAI from 'openai'

const systemPrompt = `
You are an intelligent assistant specialized in creating educational flashcards. 
Your task is to generate flashcards based on the provided content. 
Each flashcard should have a question on one side and the corresponding answer on the other side. 
Ensure the questions are clear and concise, and the answers are accurate and informative.

Return in the following JSON format
{
    "flashcard": [
        {
            "front" : str,
            "back" : str
        }
    ]

}
`

export async function POST(req){
    const openai = new OpenAI()
    const data = await req.text()

    const completion = await openai.completions.create({
        // objects
        messages : [
        // system input
        {role: 'system', content: systemPrompt}, 
        // user input
        { role: 'user', content: data}
        ],
        // model
        model: 'gpt-4o-mini',
        // return json object
        response_format: {'type': 'json_object'}
    })

    // parese the response
    const flashcards = JSON.parse(completion.data.choices[0].message.content)

    // return the response
    return NextResponse.json(flashcards.flashcard)
} 