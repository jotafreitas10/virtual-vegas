import { OpenAI } from 'openai';

const openaiApi = new OpenAI({apiKey:'sk-proj-9Tp3k95XUrimLnPT9PfzT3BlbkFJVPhxMc3LPt8MwuUuQWeG'}); // Use OpenAI diretamente

async function getChatCompletion(message) {
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