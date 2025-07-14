# GitHub Repo Summarizer – Backend

This backend service analyzes a cloned GitHub repository and returns a summarized explanation using a powerful open-source LLM (Groq API + LLaMA/Gemma). It extracts superficial metadata like folder structure, `package.json` dependencies, and README snippets, then queries the LLM to generate a concise markdown summary.

## Features

- Uses Groq LLM (e.g., LLaMA 3.3-70B or Gemma) for high-quality summarization
- Analyzes folders and package-level structure
- Reads first few lines of `README.md` if present
- Fast summarization with minimal token cost (only superficial data sent)
- Ready to plug into any frontend or CLI

---

## Tech Stack

- **Node.js**
- **Express.js**
- **Axios**
- **Groq API**
- **Dotenv**
- **fs/promises** for filesystem analysis

---

