import path from 'path';
import fs from 'fs-extra';
import { v4 as uuid } from 'uuid';
import { cloneRepo } from '../services/git.service.js';
import { analyzeRepoStructure } from '../services/analyze.service.js';
import { getSummary } from '../services/summarize.service.js';

export async function handleRepoSummarization(req, res) {
  const { repoUrl } = req.body;
  if (!repoUrl) return res.status(400).json({ error: 'repoUrl is required' });

  const id = uuid();
  const repoPath = path.join('temp', id);

  try {
    await cloneRepo(repoUrl, repoPath);
    const data = await analyzeRepoStructure(repoPath);
    const summary = await getSummary(data);
    await fs.remove(repoPath);
    console.log(summary);
    res.status(201).json({"data": summary});
  } catch (err) {
    console.error('Summarization Error:', err.message);
    await fs.remove(repoPath);
    res.status(500).json({ error: 'Internal server error. Check logs.' });
  }
}

