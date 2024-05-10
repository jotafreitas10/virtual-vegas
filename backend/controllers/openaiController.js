import { OpenAI } from 'openai';

async function getChatCompletion(message) {
    const openaiApi = new OpenAI({apiKey: process.env.chaveApi});
    try {
        const completion = await openaiApi.chat.completions.create({
            messages: [{ role: "system", content: message }],
            model: "gpt-3.5-turbo",
        });
        return completion.choices[0].message.content;
    } catch (error) {
        console.error('Erro ao obter completions do chat:', error);
        throw error;
    }
}

export { getChatCompletion };