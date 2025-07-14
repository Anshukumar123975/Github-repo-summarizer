import axios from 'axios';

export async function getSummary(context) {
  const folderDetails = Object.entries(context.folderContents || {})
  .map(([folder, items]) => `- **${folder}** → ${items.slice(0, 5).join(', ') || 'No files found'}`)
  .join('\n');
  const prompt = `You are a backend project code analysis assistant.

Analyze the following Node.js GitHub project and return:
1. A detailed project summary in **9–10 complete lines**.
2. A **2–3 line explanation** for each folder listed, describing what code usually goes in and what role it plays in a backend system.

### Project Folders & Sample Contents
${folderDetails}

### Dependencies
${context.dependencies.join(', ') || 'none'}

### README Snippet
${context.readmeSnippet || 'none'}

⚠️ Format your response in **Markdown** as follows:

### Project Summary
<summary here>

### Folder Explanations
- **<folder1>**: ...
- **<folder2>**: ...

Avoid .git folder and avoid repeating README content directly. Infer roles based on folder names and listed contents.`;


  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.3-70b-versatile',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1800,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const message = response.data?.choices?.[0]?.message?.content?.trim();
    if (!message) throw new Error('Groq returned no content');

    console.log('Groq response:', message);
    return message;
  } catch (err) {
    console.error('Groq API Error:', err.response?.data || err.message);
    return 'LLM summarization failed. Only metadata returned.';
  }
}
