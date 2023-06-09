import openai from "./openai";

export async function extractJsonFromResponse(response: string, fields: Array<string>): Promise<Record<string, string>> {
    const prompt = `
    Given the following text:
    
    ${response}
    
    Extract the following fields: 
    ${fields.join(", ")} 
    and put it into a JSON object
    
    This is the format of the JSON object
    
    { ${fields.join(",")} }
    `;

    console.log(prompt)

    const res = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.0,
        max_tokens: 1000,
        top_p: 0.0001,
        frequency_penalty: 0,
        presence_penalty: 0,
    });

    return JSON.parse(res.data.choices[0].text);
}