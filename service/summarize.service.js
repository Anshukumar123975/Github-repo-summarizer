import axios from "axios";

export const generateRepoSummary = async ( result ) => {
    let content='';
    for(let r of result){
        content+=r;
    }
    const prompt = `
You are a highly skilled software analyst. You have been given the following information about a GitHub repository with readme(if present) and the folder structure: ${content}
Write a detailed, user-friendly, and developer-focused summary of this repo. These sections should be explained:
1. The main purpose of the repo.
2. How it works overall.
3. Core features of the repository
4. Any potential improvements or missing parts.

**Be like a senior manager explaining this to your junior or newcomer or a beginner**
**You must explain the repo in a way that will save days to understand a repo for newcomers**
Avoid generic language. Be accurate, insightful, professional and motivating.
`;


  try {
    console.log("🟡 Prompt sent to Groq:\n", prompt);
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'gemma2-9b-it',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 3000,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log("Raw Groq response:\n", response.data);
    const message = response.data?.choices?.[0]?.message?.content?.trim();
    return message;

  } catch (error) {
    console.error('Groq API Error:', error);
    return 'other';
  }
};
